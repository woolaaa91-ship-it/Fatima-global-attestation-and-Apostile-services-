import React, { useState, useEffect } from "react";
import {
  KnowledgeRecord,
  ResearchBudgetLedger,
  PriorityResearchQueueItem,
  DocumentCategory,
  INITIAL_KNOWLEDGE_RECORDS,
  INITIAL_BUDGET_LEDGER,
} from "../data/knowledgeBase";
import {
  Search,
  Database,
  CheckCircle2,
  AlertCircle,
  Play,
  RefreshCw,
  Download,
  Upload,
  ExternalLink,
  ArrowLeft,
  Sliders,
  Sparkles,
  Trash2,
  Lock,
} from "lucide-react";

interface KnowledgeAdminProps {
  onNavigate: (path: string) => void;
}

interface QueueItemWithStatus extends PriorityResearchQueueItem {
  recordId: string;
  isResearched: boolean;
  verificationStatus: string | null;
}

export const KnowledgeAdmin: React.FC<KnowledgeAdminProps> = ({ onNavigate }) => {
  const [adminToken, setAdminToken] = useState<string>(() => {
    try {
      return sessionStorage.getItem("fga_knowledge_admin_token") || "";
    } catch {
      return "";
    }
  });
  const [tokenInput, setTokenInput] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [records, setRecords] = useState<KnowledgeRecord[]>(
    INITIAL_KNOWLEDGE_RECORDS
  );
  const [ledger, setLedger] = useState<ResearchBudgetLedger>(
    INITIAL_BUDGET_LEDGER
  );
  const [priorityQueue, setPriorityQueue] = useState<QueueItemWithStatus[]>([]);
  const [systemHealth, setSystemHealth] = useState<{
    geminiApiConfigured: boolean;
    selectedModel: string;
    googleSearchGroundingSupported: boolean;
    adminAuthProtected: boolean;
    databaseType: string;
    updatedAt: string;
  }>({
    geminiApiConfigured: true,
    selectedModel: "gemini-3.8-flash",
    googleSearchGroundingSupported: true,
    adminAuthProtected: true,
    databaseType: "Persistent Server JSON Store (data/knowledge_store.json)",
    updatedAt: new Date().toISOString(),
  });

  const [activeTab, setActiveTab] = useState<
    "records" | "queue" | "custom" | "import"
  >("records");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [batchSize, setBatchSize] = useState<number>(3);
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [isRunningBatch, setIsRunningBatch] = useState<boolean>(false);
  const [researchingId, setResearchingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const [limitInput, setLimitInput] = useState<number>(200);

  // Custom single research form
  const [customCountry, setCustomCountry] = useState<string>("Netherlands");
  const [customCategory, setCustomCategory] =
    useState<DocumentCategory>("educational");
  const [customDocType, setCustomDocType] = useState<string>(
    "Bachelor's / Master's Degree Certificate"
  );
  const [customPurpose, setCustomPurpose] = useState<string>(
    "Highly Skilled Migrant Visa / University Enrollment"
  );

  const [importJsonText, setImportJsonText] = useState<string>("");

  useEffect(() => {
    document.title =
      "Authorized Knowledge Administration | FATIMA GLOBAL ATTESTATION";
    if (adminToken) {
      verifyTokenWithServer(adminToken);
    }
  }, []);

  const verifyTokenWithServer = async (tokenToTest: string) => {
    try {
      const res = await fetch("/api/knowledge/auth-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": tokenToTest,
        },
      });
      if (res.ok) {
        setIsAuthorized(true);
        setAuthError(null);
        setAdminToken(tokenToTest);
        try {
          sessionStorage.setItem("fga_knowledge_admin_token", tokenToTest);
        } catch {}
        await fetchDashboardData();
      } else {
        setIsAuthorized(false);
        setAuthError(
          "Invalid or unauthorized admin token. Configure KNOWLEDGE_ADMIN_TOKEN in Settings > Secrets."
        );
      }
    } catch {
      setIsAuthorized(false);
      setAuthError("Unable to reach authentication server.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    await verifyTokenWithServer(tokenInput.trim());
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setAdminToken("");
    setTokenInput("");
    try {
      sessionStorage.removeItem("fga_knowledge_admin_token");
    } catch {}
  };

  const fetchDashboardData = async () => {
    try {
      const [statusRes, recordsRes] = await Promise.all([
        fetch("/api/knowledge/status"),
        fetch("/api/knowledge/records"),
      ]);
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (statusData.systemHealth) setSystemHealth(statusData.systemHealth);
        if (statusData.budget) {
          setLedger(statusData.budget);
          setLimitInput(statusData.budget.configuredConservativeLimit);
        }
      }
      if (recordsRes.ok) {
        const recData = await recordsRes.json();
        if (Array.isArray(recData.records)) setRecords(recData.records);
        if (Array.isArray(recData.priorityQueue))
          setPriorityQueue(recData.priorityQueue);
        if (recData.ledger) setLedger(recData.ledger);
      }
    } catch {
      // Keep current state
    }
  };

  const authHeaders = {
    "Content-Type": "application/json",
    "x-admin-token": adminToken,
  };

  const handleRunSingleQueueItem = async (item: PriorityResearchQueueItem) => {
    setResearchingId(item.id);
    setStatusMessage({
      type: "info",
      text: `Researching official rules for ${item.documentType} → ${item.destinationCountry} via Google Search grounding...`,
    });
    try {
      const res = await fetch("/api/knowledge/research", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          destinationCountry: item.destinationCountry,
          documentCategory: item.documentCategory,
          documentType: item.documentType,
          purpose: item.rationale,
          forceRefresh: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Research request failed.");
      }
      setStatusMessage({
        type: "success",
        text: data.reusedCachedRecord
          ? `Reused existing verified record for ${item.destinationCountry} (${item.documentType}) — 0 API requests spent.`
          : `Successfully researched & stored ${item.destinationCountry} — ${item.documentType}.`,
      });
      await fetchDashboardData();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to complete grounded research.",
      });
      await fetchDashboardData();
    } finally {
      setResearchingId(null);
    }
  };

  const handleRunPriorityBatch = async () => {
    setIsRunningBatch(true);
    setStatusMessage({
      type: "info",
      text: `Executing prioritized batch research (up to ${batchSize} unresearched records)...`,
    });
    try {
      const res = await fetch("/api/knowledge/research-batch", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          batchSize,
          tierFilter: selectedTier,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Batch research failed.");
      }
      setStatusMessage({
        type: "success",
        text:
          data.message ||
          `Batch completed: processed ${data.processedCount} item(s).`,
      });
      await fetchDashboardData();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Batch research encountered an error.",
      });
      await fetchDashboardData();
    } finally {
      setIsRunningBatch(false);
    }
  };

  const handleCustomResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCountry.trim() || !customDocType.trim()) return;
    setResearchingId("custom-form");
    setStatusMessage({
      type: "info",
      text: `Researching ${customDocType} for ${customCountry} with Google Search grounding...`,
    });
    try {
      const res = await fetch("/api/knowledge/research", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          destinationCountry: customCountry.trim(),
          documentCategory: customCategory,
          documentType: customDocType.trim(),
          purpose: customPurpose.trim(),
          forceRefresh: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Custom research failed.");
      }
      setStatusMessage({
        type: "success",
        text: `Official route researched and saved for ${customCountry} (${customDocType}).`,
      });
      await fetchDashboardData();
      setActiveTab("records");
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to execute custom research.",
      });
      await fetchDashboardData();
    } finally {
      setResearchingId(null);
    }
  };

  const handleUpdateLimit = async () => {
    try {
      const res = await fetch("/api/knowledge/update-budget", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ configuredConservativeLimit: limitInput }),
      });
      const data = await res.json();
      if (res.ok && data.ledger) {
        setLedger(data.ledger);
        setStatusMessage({
          type: "success",
          text: `Conservative request limit updated to ${data.ledger.configuredConservativeLimit} (strict upper cap: 2,000).`,
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Could not update budget limit.",
      });
    }
  };

  const handleToggleVerification = async (record: KnowledgeRecord) => {
    const nextStatus =
      record.verificationStatus === "verified"
        ? "partially_verified"
        : record.verificationStatus === "partially_verified"
        ? "requires_further_verification"
        : "verified";
    try {
      const res = await fetch("/api/knowledge/verify-record", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          id: record.id,
          verificationStatus: nextStatus,
        }),
      });
      if (res.ok) {
        await fetchDashboardData();
        setStatusMessage({
          type: "success",
          text: `Updated status for ${record.destinationCountry} (${record.documentType}) to ${nextStatus.replace(/_/g, " ")}.`,
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to update record verification status.",
      });
    }
  };

  const handleDeleteRecord = async (record: KnowledgeRecord) => {
    try {
      const res = await fetch("/api/knowledge/verify-record", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          id: record.id,
          action: "delete",
        }),
      });
      if (res.ok) {
        await fetchDashboardData();
        setStatusMessage({
          type: "info",
          text: `Removed record ${record.destinationCountry} — ${record.documentType}.`,
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to delete record.",
      });
    }
  };

  const handleExportJson = async () => {
    try {
      const res = await fetch("/api/knowledge/export", {
        headers: { "x-admin-token": adminToken },
      });
      if (!res.ok) throw new Error("Export unauthorized or failed.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fatima-global-knowledge-base-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to export knowledge store.",
      });
    }
  };

  const handleImportJson = async () => {
    try {
      const parsed = JSON.parse(importJsonText);
      const recordsArray = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.records)
        ? parsed.records
        : null;
      if (!recordsArray) {
        setStatusMessage({
          type: "error",
          text: "Invalid JSON format. Provide an array of KnowledgeRecord objects or an export file containing a 'records' array.",
        });
        return;
      }

      const res = await fetch("/api/knowledge/import", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ records: recordsArray }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setStatusMessage({
        type: "success",
        text: `Imported ${data.importedCount} new record(s) and updated ${data.updatedCount} existing record(s).`,
      });
      setImportJsonText("");
      await fetchDashboardData();
      setActiveTab("records");
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Invalid JSON input.",
      });
    }
  };

  // Protected Admin Gate
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-5 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900">
                Authorized Knowledge Administration
              </h1>
              <p className="text-xs text-slate-500">
                Protected research, verification & import console
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Public users cannot trigger Gemini Search Grounding requests or modify the official knowledge base. Enter the configured{" "}
            <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800">
              KNOWLEDGE_ADMIN_TOKEN
            </code>{" "}
            to proceed.
          </p>

          {authError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-token-input"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Admin Access Token
              </label>
              <input
                id="admin-token-input"
                type="password"
                required
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter KNOWLEDGE_ADMIN_TOKEN..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigate("/")}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Back to Website
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
              >
                Unlock Console
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const effectiveLimit = Math.min(
    ledger.maxBudgetLimit,
    ledger.configuredConservativeLimit
  );
  const budgetRemaining = Math.max(
    0,
    effectiveLimit - ledger.requestsAttempted
  );
  const verifiedCount = records.filter(
    (r) => r.verificationStatus === "verified"
  ).length;
  const partiallyVerifiedCount = records.filter(
    (r) => r.verificationStatus === "partially_verified"
  ).length;
  const needsReviewCount = records.filter(
    (r) =>
      r.verificationStatus === "requires_further_verification" ||
      r.verificationStatus === "draft_researched"
  ).length;

  const filteredRecords = records.filter((rec) => {
    if (filterCategory !== "all" && rec.documentCategory !== filterCategory)
      return false;
    if (filterStatus !== "all" && rec.verificationStatus !== filterStatus)
      return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rec.destinationCountry.toLowerCase().includes(q) ||
        rec.documentType.toLowerCase().includes(q) ||
        rec.authenticationRouteTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <button
              onClick={() => onNavigate("/")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website & Route Finder</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Official Knowledge Research, Verification & Import Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Evidence-based document authentication knowledge base (`{systemHealth.selectedModel}`).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Knowledge JSON</span>
            </button>
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Ledger</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Status Notification Banner */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start justify-between gap-3 ${
              statusMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : statusMessage.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-blue-50 border-blue-200 text-blue-900"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs font-bold underline shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Budget & Telemetry Grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
                Strict Research Budget & Verification Metrics
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Google Search Grounding Request Tracker (Hard Max: 2,000 | Default Cap: 200)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">
                Requests Attempted
              </span>
              <span className="text-lg font-extrabold text-slate-900">
                {ledger.requestsAttempted}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
              <span className="text-[11px] text-emerald-800 block">
                Requests Succeeded
              </span>
              <span className="text-lg font-extrabold text-emerald-900">
                {ledger.requestsCompleted}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200/80">
              <span className="text-[11px] text-rose-800 block">
                Requests Failed
              </span>
              <span className="text-lg font-extrabold text-rose-900">
                {ledger.requestsFailed}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-200/80">
              <span className="text-[11px] text-teal-800 block">
                Budget Remaining
              </span>
              <span className="text-lg font-extrabold text-teal-900">
                {budgetRemaining}{" "}
                <span className="text-xs font-normal text-teal-700">
                  / {effectiveLimit}
                </span>
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">
                Records Saved
              </span>
              <span className="text-lg font-extrabold text-slate-900">
                {records.length}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
              <span className="text-[11px] text-emerald-800 block">
                Verified Records
              </span>
              <span className="text-lg font-extrabold text-emerald-900">
                {verifiedCount}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/80">
              <span className="text-[11px] text-amber-800 block">
                Partially Verified
              </span>
              <span className="text-lg font-extrabold text-amber-900">
                {partiallyVerifiedCount}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200/80">
              <span className="text-[11px] text-rose-800 block">
                Needs Verification
              </span>
              <span className="text-lg font-extrabold text-rose-900">
                {needsReviewCount}
              </span>
            </div>
          </div>

          {/* Configurable Conservative Request Limit & Quota Disclosure */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <p className="leading-relaxed max-w-3xl">
              <strong className="text-slate-800">Quota & Billing Disclosure:</strong>{" "}
              {ledger.quotaDisclosure} Deduplication cache hits:{" "}
              <strong className="text-slate-900">{ledger.deduplicationHits}</strong>.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <label
                htmlFor="conservative-limit"
                className="font-semibold text-slate-700"
              >
                Conservative Limit (Max 2,000):
              </label>
              <input
                id="conservative-limit"
                type="number"
                min={1}
                max={2000}
                value={limitInput}
                onChange={(e) => setLimitInput(Number(e.target.value))}
                className="w-20 px-2.5 py-1 border border-slate-300 rounded-md text-slate-900 font-semibold"
              />
              <button
                onClick={handleUpdateLimit}
                className="px-3 py-1 bg-slate-900 text-white font-semibold rounded-md hover:bg-slate-800 cursor-pointer"
              >
                Save Cap
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("records")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "records"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Saved Knowledge Base ({records.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("queue")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "queue"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>
              Priority Research Batches (
              {priorityQueue.filter((q) => !q.isResearched).length} Pending)
            </span>
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "custom"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Research Specific Country / Document</span>
          </button>
          <button
            onClick={() => setActiveTab("import")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "import"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Import Knowledge Pack</span>
          </button>
        </div>

        {/* TAB 1: SAVED KNOWLEDGE BASE RECORDS */}
        {activeTab === "records" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by country, document type, or authentication route..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white text-slate-800"
              >
                <option value="all">All Categories</option>
                <option value="educational">Educational</option>
                <option value="personal">Personal</option>
                <option value="commercial">Commercial</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white text-slate-800"
              >
                <option value="all">All Verification Statuses</option>
                <option value="verified">Verified Only</option>
                <option value="partially_verified">Partially Verified</option>
                <option value="requires_further_verification">
                  Requires Further Verification
                </option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-slate-100 text-slate-800">
                          {rec.documentCategory}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                            rec.isHagueConventionApplicable
                              ? "bg-teal-50 text-teal-800 border border-teal-200"
                              : "bg-blue-50 text-blue-900 border border-blue-200"
                          }`}
                        >
                          {rec.isHagueConventionApplicable
                            ? "1961 Hague Apostille Applicable"
                            : "Non-Hague / Bilateral Embassy Legalization"}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                            rec.verificationStatus === "verified"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : rec.verificationStatus === "partially_verified"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {rec.verificationStatus === "verified"
                            ? "✓ Verified Record"
                            : rec.verificationStatus === "partially_verified"
                            ? "◐ Partially Verified"
                            : "⚠ Needs Verification"}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">
                        {rec.destinationCountry} — {rec.documentType}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {rec.authenticationRouteTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleVerification(rec)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                      >
                        Cycle Verification Status
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(rec)}
                        title="Delete record"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                    <strong>Treaty Status:</strong> {rec.treatyStatusNote}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                        Authentication Sequence ({rec.stepByStepSequence.length} Steps)
                      </h4>
                      <ol className="space-y-1.5">
                        {rec.stepByStepSequence.map((s) => (
                          <li
                            key={s.stepNumber}
                            className="p-2 rounded-lg bg-slate-50 border border-slate-200/60"
                          >
                            <span className="font-bold text-slate-900">
                              {s.stepNumber}. {s.authority}:
                            </span>{" "}
                            <span className="text-slate-700">{s.description}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/70 space-y-1">
                        <div className="font-bold text-emerald-900">
                          Verified Statutory Rules
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-emerald-950">
                          {rec.verifiedStatutoryRules.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 space-y-1">
                        <div className="font-bold text-amber-900">
                          Items Requiring Confirmation
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-amber-950">
                          {rec.itemsRequiringConfirmation.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-700">
                        Official Sources:
                      </span>
                      {rec.officialSources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-teal-50 text-teal-800 font-medium"
                        >
                          <span>{src.title.slice(0, 48)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                    <span>
                      Origin: {rec.researchMetadata?.modelUsed || "seed"} • Last Verified:{" "}
                      {rec.lastVerifiedDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTELLIGENT PRIORITY RESEARCH QUEUE */}
        {activeTab === "queue" && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Intelligent Batch Research Runner
                </h3>
                <p className="text-xs text-slate-600">
                  Prioritizes common destination countries and frequently used Indian documents. Automatically skips already-verified records and halts immediately on quota or rate limits.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(Number(e.target.value))}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-semibold"
                >
                  <option value={0}>All Priority Tiers</option>
                  <option value={1}>Tier 1: High-Volume Gulf & China</option>
                  <option value={2}>Tier 2: Major Hague Destinations</option>
                  <option value={3}>Tier 3: Commercial & Secondary</option>
                </select>
                <select
                  value={batchSize}
                  onChange={(e) => setBatchSize(Number(e.target.value))}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-semibold"
                >
                  <option value={1}>Batch Size: 1 Request</option>
                  <option value={3}>Batch Size: 3 Requests</option>
                  <option value={5}>Batch Size: 5 Requests</option>
                </select>
                <button
                  onClick={handleRunPriorityBatch}
                  disabled={isRunningBatch}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>
                    {isRunningBatch
                      ? "Running Grounded Batch..."
                      : `Run Next ${batchSize} Pending`}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priorityQueue.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        Tier {item.priorityTier} • {item.destinationGroup}
                      </span>
                      {item.isResearched ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ Researched ({item.verificationStatus})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                          Pending Research
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.destinationCountry} — {item.documentType}
                    </h4>
                    <p className="text-xs text-slate-600">{item.rationale}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 capitalize">
                      Category: {item.documentCategory}
                    </span>
                    <button
                      onClick={() => handleRunSingleQueueItem(item)}
                      disabled={researchingId === item.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>
                        {researchingId === item.id
                          ? "Researching..."
                          : item.isResearched
                          ? "Verify / Reuse"
                          : "Research Now"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM ON-DEMAND RESEARCH */}
        {activeTab === "custom" && (
          <form
            onSubmit={handleCustomResearch}
            className="bg-white p-6 rounded-xl border border-slate-200 max-w-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">
              Research & Verify Specific Country / Document Combination
            </h3>
            <p className="text-xs text-slate-600">
              Uses Google Search grounding (`gemini-3.8-flash`) to check HCCH 1961 Apostille status, MEA India rules, and bilateral embassy requirements, then stores the structured record in the knowledge base.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination Country
                </label>
                <input
                  type="text"
                  required
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value)}
                  placeholder="e.g., Netherlands, Poland, Malaysia, Vietnam"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) =>
                    setCustomCategory(e.target.value as DocumentCategory)
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="educational">Educational</option>
                  <option value="personal">Personal</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Indian Document Type
              </label>
              <input
                type="text"
                required
                value={customDocType}
                onChange={(e) => setCustomDocType(e.target.value)}
                placeholder="e.g., Bachelor's Degree, Police Clearance Certificate, Commercial Invoice"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Submission Purpose
              </label>
              <input
                type="text"
                value={customPurpose}
                onChange={(e) => setCustomPurpose(e.target.value)}
                placeholder="e.g., Employment Visa, Higher Studies, Family Reunification"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={researchingId === "custom-form"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {researchingId === "custom-form"
                  ? "Running Grounded Official Research..."
                  : "Research & Save to Knowledge Base"}
              </span>
            </button>
          </form>
        )}

        {/* TAB 4: IMPORT KNOWLEDGE PACK */}
        {activeTab === "import" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 max-w-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Import Verified Knowledge Records (JSON)
            </h3>
            <p className="text-xs text-slate-600">
              Paste a JSON array of `KnowledgeRecord` objects or a previously exported knowledge store file to merge verified routes into the Document Route Finder database without spending search requests.
            </p>
            <textarea
              rows={10}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='[{"destinationCountry": "Netherlands", "documentCategory": "educational", "documentType": "Bachelor&#39;s / Master&#39;s Degree Certificate", ...}]'
              className="w-full p-3 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <button
              onClick={handleImportJson}
              disabled={!importJsonText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Validate & Import Records</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
