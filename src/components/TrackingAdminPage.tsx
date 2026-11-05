import React, { useState, useEffect } from "react";
import {
  Lock,
  Search,
  Plus,
  QrCode,
  Printer,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock,
  FileText,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  History,
  Terminal,
  Copy,
  Eye,
  Phone,
  Download,
} from "lucide-react";
import {
  BUSINESS_ORDER_STATUSES,
  TRACKING_DOCUMENT_CATEGORIES,
  TRACKING_SERVICE_TYPES,
  ADMIN_STAFF_ROLES,
  type BusinessOrderStatus,
  type AdminStaffRole,
  type ServerTrackingOrderRecord,
  type TrackingAuditLogEntry,
} from "../data/trackingTypes";
import { BUSINESS_CONFIG } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface TrackingAdminPageProps {
  onNavigate: (path: string) => void;
}

interface QrReceiptBundle {
  trackingId: string;
  serviceType: string;
  documentCategory: string;
  currentStatus: BusinessOrderStatus;
  createdAt: string;
  tokenExpiresAt: string | null;
  canonicalQrUrl: string;
  liveScanUrl: string;
  encodedUrl: string;
  isProductionDomainConfigured: boolean;
  qrSvg: string;
  qrDataUrl: string;
  whatsappMessageText?: string;
  manualWhatsAppUrl?: string;
}

interface WhatsAppAdapterStatus {
  apiEnabled: boolean;
  credentialsConfigured: boolean;
  readyForAutomaticDelivery: boolean;
  providerLabel: string;
  honestStatusMessage: string;
}

interface WhatsAppNotificationPayload {
  autoSent: boolean;
  deliveryStatus: string;
  messageText: string;
  manualWhatsAppUrl: string;
  recipientPhoneFormatted: string | null;
  statusExplanation: string;
  apiMessageId?: string | null;
  dispatchedAt: string;
}

interface SelfTestResultItem {
  id: string;
  name: string;
  passed: boolean;
  detail: string;
}

export const TrackingAdminPage: React.FC<TrackingAdminPageProps> = ({
  onNavigate,
}) => {
  // Authentication & Staff Role State
  const [adminToken, setAdminToken] = useState<string>(() => {
    try {
      return (
        sessionStorage.getItem("fga_tracking_admin_token") ||
        sessionStorage.getItem("fga_knowledge_admin_token") ||
        ""
      );
    } catch {
      return "";
    }
  });
  const [tokenInput, setTokenInput] = useState<string>("");
  const [actorName, setActorName] = useState<string>(() => {
    try {
      return (
        sessionStorage.getItem("fga_tracking_actor_name") || "Operations Desk"
      );
    } catch {
      return "Operations Desk";
    }
  });
  const [actorRole, setActorRole] = useState<AdminStaffRole>(() => {
    try {
      const saved = sessionStorage.getItem(
        "fga_tracking_actor_role"
      ) as AdminStaffRole;
      return ADMIN_STAFF_ROLES.includes(saved) ? saved : "Super Administrator";
    } catch {
      return "Super Administrator";
    }
  });

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminConfigError, setAdminConfigError] = useState<string | null>(null);
  const [previewBootstrapToken, setPreviewBootstrapToken] = useState<
    string | null
  >(null);

  // Dashboard Data State
  const [orders, setOrders] = useState<ServerTrackingOrderRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<TrackingAuditLogEntry[]>([]);
  const [backendConfig, setBackendConfig] = useState<{
    activeAdapter: string;
    supabaseConfigured: boolean;
    rlsMigrationFile: string;
    storeFile: string;
    backupFile?: string;
    atomicWritesEnabled?: boolean;
    durabilityLimitationNotice?: string;
    recoveryStatus?: {
      status: string;
      lastRecoveryAt: string | null;
      lastRecoveryReason: string | null;
    };
    whatsappApi?: WhatsAppAdapterStatus;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<
    "orders" | "create" | "audit" | "setup"
  >("orders");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Create Order Form State
  const [newCustomerRef, setNewCustomerRef] = useState<string>("");
  const [newCustomerPhone, setNewCustomerPhone] = useState<string>("");
  const [newCustomerConsent, setNewCustomerConsent] = useState<boolean>(true);
  const [newServiceType, setNewServiceType] = useState<string>(
    TRACKING_SERVICE_TYPES[0]
  );
  const [newDocCategory, setNewDocCategory] = useState<string>(
    TRACKING_DOCUMENT_CATEGORIES[0]
  );
  const [newDestCountry, setNewDestCountry] = useState<string>("");
  const [newInitialStatus, setNewInitialStatus] =
    useState<BusinessOrderStatus>("Order Received");
  const [newPublicSummary, setNewPublicSummary] = useState<string>("");
  const [newInternalNotes, setNewInternalNotes] = useState<string>("");
  const [newVerificationPin, setNewVerificationPin] = useState<string>("");
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);

  // Selected Order Update State
  const [statusToUpdate, setStatusToUpdate] =
    useState<BusinessOrderStatus>("Order Received");
  const [statusPublicRemark, setStatusPublicRemark] = useState<string>("");
  const [notesToUpdate, setNotesToUpdate] = useState<string>("");
  const [customerPhoneToUpdate, setCustomerPhoneToUpdate] =
    useState<string>("");
  const [customerConsentToUpdate, setCustomerConsentToUpdate] =
    useState<boolean>(true);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState<boolean>(false);

  // QR Code Receipt & Customer WhatsApp Share State
  const [activeQrBundle, setActiveQrBundle] = useState<QrReceiptBundle | null>(
    null
  );
  const [qrUseLiveUrl, setQrUseLiveUrl] = useState<boolean>(true);
  const [isLoadingQr, setIsLoadingQr] = useState<boolean>(false);
  const [latestWhatsAppDispatch, setLatestWhatsAppDispatch] =
    useState<WhatsAppNotificationPayload | null>(null);
  const [isPreparingWhatsApp, setIsPreparingWhatsApp] =
    useState<boolean>(false);

  // Self-Test State
  const [selfTestResults, setSelfTestResults] = useState<{
    allPassed: boolean;
    testedAt: string;
    results: SelfTestResultItem[];
  } | null>(null);
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);

  // Notification Banner
  const [banner, setBanner] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchBootstrapInfo();
    if (adminToken) {
      verifyAndLoadOrders(adminToken, actorName, actorRole);
    }
  }, []);

  const fetchBootstrapInfo = async () => {
    try {
      const res = await fetch("/api/tracking/admin/bootstrap");
      if (res.ok) {
        const data = await res.json();
        if (
          data.environmentMode !== "production" &&
          data.previewTokenAvailable &&
          data.previewToken
        ) {
          setPreviewBootstrapToken(data.previewToken);
        } else {
          setPreviewBootstrapToken(null);
        }
        if (data.adminConfigured === false && data.adminConfigurationError) {
          setAdminConfigError(data.adminConfigurationError);
        } else {
          setAdminConfigError(null);
        }
        if (data.backendConfig) {
          setBackendConfig(data.backendConfig);
        }
      }
    } catch {
      // Ignore bootstrap error
    }
  };

  const buildAuthHeaders = (
    tokenOverride?: string,
    nameOverride?: string,
    roleOverride?: AdminStaffRole
  ) => ({
    "Content-Type": "application/json",
    "x-admin-token": tokenOverride ?? adminToken,
    "x-admin-actor": nameOverride ?? actorName,
    "x-admin-role": roleOverride ?? actorRole,
  });

  const handleFetchOrderQr = async (
    internalOrderId: string,
    useLiveMode = qrUseLiveUrl,
    tokenOverride?: string
  ) => {
    setIsLoadingQr(true);
    try {
      const res = await fetch(
        `/api/tracking/admin/orders/${internalOrderId}/qr?mode=${
          useLiveMode ? "live" : "canonical"
        }`,
        {
          headers: buildAuthHeaders(tokenOverride),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setActiveQrBundle(data as QrReceiptBundle);
      } else {
        setBanner({
          type: "error",
          text: data?.error || "Could not generate QR code.",
        });
      }
    } catch {
      setBanner({
        type: "error",
        text: "Error generating QR code.",
      });
    } finally {
      setIsLoadingQr(false);
    }
  };

  const selectOrderForEditing = (
    order: ServerTrackingOrderRecord,
    tokenOverride?: string
  ) => {
    setSelectedOrderId(order.internalOrderId);
    setStatusToUpdate(order.currentStatus);
    setNotesToUpdate(order.internalNotes || "");
    setCustomerPhoneToUpdate(order.customerPhone || "");
    setCustomerConsentToUpdate(
      order.customerWhatsAppConsent !== undefined
        ? Boolean(order.customerWhatsAppConsent)
        : true
    );
    setStatusPublicRemark("");
    handleFetchOrderQr(order.internalOrderId, qrUseLiveUrl, tokenOverride);
  };

  const verifyAndLoadOrders = async (
    tokenToUse: string,
    nameToUse: string,
    roleToUse: AdminStaffRole
  ) => {
    setAuthError(null);
    try {
      const res = await fetch("/api/tracking/admin/orders", {
        headers: buildAuthHeaders(tokenToUse, nameToUse, roleToUse),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setIsAuthorized(false);
        if (res.status === 429) {
          setAuthError(
            data?.error ||
              "Too many failed authentication attempts (HTTP 429). Please wait before trying again."
          );
        } else if (res.status === 503) {
          setAuthError(
            data?.error ||
              "Administrator authentication is not configured on the server (HTTP 503)."
          );
        } else {
          setAuthError(
            data?.error ||
              "Invalid administrator token. Access denied (HTTP 401 Unauthorized)."
          );
        }
        return;
      }
      setIsAuthorized(true);
      setAdminToken(tokenToUse);
      try {
        sessionStorage.setItem("fga_tracking_admin_token", tokenToUse);
        sessionStorage.setItem("fga_tracking_actor_name", nameToUse);
        sessionStorage.setItem("fga_tracking_actor_role", roleToUse);
      } catch {}

      const fetchedOrders: ServerTrackingOrderRecord[] = data.orders || [];
      setOrders(fetchedOrders);
      setAuditLogs(data.auditLogs || []);
      if (data.backendConfig) {
        setBackendConfig(data.backendConfig);
      }
      if (fetchedOrders.length > 0) {
        const currentStillExists = fetchedOrders.find(
          (o) => o.internalOrderId === selectedOrderId
        );
        if (!currentStillExists) {
          selectOrderForEditing(fetchedOrders[0], tokenToUse);
        } else {
          setCustomerPhoneToUpdate(currentStillExists.customerPhone || "");
          setCustomerConsentToUpdate(
            currentStillExists.customerWhatsAppConsent !== undefined
              ? Boolean(currentStillExists.customerWhatsAppConsent)
              : true
          );
          handleFetchOrderQr(
            currentStillExists.internalOrderId,
            qrUseLiveUrl,
            tokenToUse
          );
        }
      }
    } catch {
      setAuthError("Unable to reach server for authentication.");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setAuthError("Please enter the administrator secret token.");
      return;
    }
    if (!actorName.trim()) {
      setAuthError("Please enter your staff name for the audit log.");
      return;
    }
    verifyAndLoadOrders(tokenInput.trim(), actorName.trim(), actorRole);
  };

  const [isDownloadingBackup, setIsDownloadingBackup] = useState(false);

  const handleDownloadBackup = async () => {
    setIsDownloadingBackup(true);
    try {
      const res = await fetch("/api/tracking/admin/backup/export", {
        headers: buildAuthHeaders(),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to download backup snapshot.");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fatima_tracking_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setBanner({
        type: "success",
        text: "Verified JSON backup snapshot downloaded successfully.",
      });
    } catch (err: any) {
      setBanner({
        type: "error",
        text: err?.message || "Failed to download backup export.",
      });
    } finally {
      setIsDownloadingBackup(false);
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerRef.trim()) {
      setBanner({
        type: "error",
        text: "Customer reference is required (stored privately for internal staff reference).",
      });
      return;
    }

    setIsCreatingOrder(true);
    setBanner(null);

    try {
      const res = await fetch("/api/tracking/admin/orders", {
        method: "POST",
        headers: buildAuthHeaders(),
        body: JSON.stringify({
          customerReference: newCustomerRef.trim(),
          customerPhone: newCustomerPhone.trim() || undefined,
          customerWhatsAppConsent: newCustomerConsent,
          serviceType: newServiceType,
          documentCategory: newDocCategory,
          destinationCountry: newDestCountry.trim() || undefined,
          initialStatus: newInitialStatus,
          initialPublicSummary: newPublicSummary.trim() || undefined,
          internalNotes: newInternalNotes.trim(),
          verificationPin: newVerificationPin.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBanner({
          type: "error",
          text: data?.error || "Failed to create order.",
        });
        return;
      }

      const createdOrder = data.order as ServerTrackingOrderRecord;
      if (data.qrBundle) {
        setActiveQrBundle(data.qrBundle as QrReceiptBundle);
      }
      if (data.whatsappNotification) {
        setLatestWhatsAppDispatch(
          data.whatsappNotification as WhatsAppNotificationPayload
        );
      }

      await verifyAndLoadOrders(adminToken, actorName, actorRole);
      selectOrderForEditing(createdOrder);
      setActiveTab("orders");
      setNewCustomerRef("");
      setNewCustomerPhone("");
      setNewCustomerConsent(true);
      setNewDestCountry("");
      setNewPublicSummary("");
      setNewInternalNotes("");
      setNewVerificationPin("");

      const waAutoNote = data.whatsappNotification?.autoSent
        ? "Customer WhatsApp notification sent automatically via configured Business API."
        : "Click 'Share Tracking Link on WhatsApp' below to review and send the pre-filled tracking message to the customer.";

      setBanner({
        type: "success",
        text: `Created Order ${createdOrder.trackingId} with unique QR code. ${waAutoNote}`,
      });
    } catch {
      setBanner({
        type: "error",
        text: "Network error while creating order.",
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId || !selectedOrder) return;

    if (
      statusToUpdate === selectedOrder.currentStatus &&
      !statusPublicRemark.trim()
    ) {
      setBanner({
        type: "info",
        text: `Order ${selectedOrder.trackingId} is already set to "${selectedOrder.currentStatus}". Select a new status or enter a public timeline note to update.`,
      });
      return;
    }

    setIsUpdatingOrder(true);
    setBanner(null);

    try {
      const res = await fetch(
        `/api/tracking/admin/orders/${selectedOrderId}/status`,
        {
          method: "PATCH",
          headers: buildAuthHeaders(),
          body: JSON.stringify({
            newStatus: statusToUpdate,
            publicSummary: statusPublicRemark.trim() || undefined,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setBanner({
          type: "error",
          text: data?.error || "Failed to update order status.",
        });
        return;
      }

      if (data.whatsappNotification) {
        setLatestWhatsAppDispatch(
          data.whatsappNotification as WhatsAppNotificationPayload
        );
      }

      await verifyAndLoadOrders(adminToken, actorName, actorRole);
      setStatusPublicRemark("");
      setBanner({
        type: "success",
        text: `Updated order ${data.order.trackingId} status to "${data.order.currentStatus}".`,
      });
    } catch {
      setBanner({
        type: "error",
        text: "Network error while updating status.",
      });
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handleSaveCustomerPhone = async () => {
    if (!selectedOrderId) return;
    setIsUpdatingOrder(true);
    setBanner(null);

    try {
      const res = await fetch(
        `/api/tracking/admin/orders/${selectedOrderId}/customer-phone`,
        {
          method: "PATCH",
          headers: buildAuthHeaders(),
          body: JSON.stringify({
            customerPhone: customerPhoneToUpdate.trim(),
            customerWhatsAppConsent: customerConsentToUpdate,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setBanner({
          type: "error",
          text: data?.error || "Failed to update customer phone number.",
        });
        return;
      }

      if (data.whatsappNotification) {
        setLatestWhatsAppDispatch(
          data.whatsappNotification as WhatsAppNotificationPayload
        );
      }

      await verifyAndLoadOrders(adminToken, actorName, actorRole);
      setBanner({
        type: "success",
        text: `Saved private customer WhatsApp phone number for ${data.order.trackingId} (never exposed publicly).`,
      });
    } catch {
      setBanner({
        type: "error",
        text: "Network error while saving customer phone number.",
      });
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handleRecordManualWhatsAppShare = async (
    internalOrderId: string,
    isStatusUpdate = false
  ) => {
    setIsPreparingWhatsApp(true);
    try {
      const res = await fetch(
        `/api/tracking/admin/orders/${internalOrderId}/whatsapp-share`,
        {
          method: "POST",
          headers: buildAuthHeaders(),
          body: JSON.stringify({ isStatusUpdate }),
        }
      );
      const data = await res.json();
      if (res.ok && data.whatsappNotification) {
        setLatestWhatsAppDispatch(
          data.whatsappNotification as WhatsAppNotificationPayload
        );
        verifyAndLoadOrders(adminToken, actorName, actorRole);
      }
    } catch {
      // Non-blocking audit log call
    } finally {
      setIsPreparingWhatsApp(false);
    }
  };

  const handleSaveInternalNotes = async () => {
    if (!selectedOrderId) return;
    setIsUpdatingOrder(true);
    setBanner(null);

    try {
      const res = await fetch(
        `/api/tracking/admin/orders/${selectedOrderId}/notes`,
        {
          method: "PATCH",
          headers: buildAuthHeaders(),
          body: JSON.stringify({
            internalNotes: notesToUpdate,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setBanner({
          type: "error",
          text: data?.error || "Failed to save internal notes.",
        });
        return;
      }

      await verifyAndLoadOrders(adminToken, actorName, actorRole);
      setBanner({
        type: "success",
        text: `Saved private internal notes for ${data.order.trackingId} (hidden from public tracking).`,
      });
    } catch {
      setBanner({
        type: "error",
        text: "Network error while saving internal notes.",
      });
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handleTokenAction = async (
    internalOrderId: string,
    mode: "rotate" | "expire_now" | "clear_expiry"
  ) => {
    try {
      const res = await fetch(
        `/api/tracking/admin/orders/${internalOrderId}/token`,
        {
          method: "POST",
          headers: buildAuthHeaders(),
          body: JSON.stringify({ mode }),
        }
      );
      if (res.ok) {
        await verifyAndLoadOrders(adminToken, actorName, actorRole);
        handleFetchOrderQr(internalOrderId, qrUseLiveUrl);
        setBanner({
          type: "info",
          text:
            mode === "rotate"
              ? "Generated a fresh cryptographic QR token. Previous QR link is now invalid."
              : mode === "expire_now"
              ? "Marked QR token as expired (useful for testing expired QR token handling)."
              : "Cleared QR token expiration.",
        });
      }
    } catch {
      setBanner({
        type: "error",
        text: "Failed to update token state.",
      });
    }
  };

  const handleRunSelfTests = async () => {
    setIsRunningTests(true);
    try {
      const res = await fetch("/api/tracking/admin/self-test", {
        method: "POST",
        headers: buildAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setSelfTestResults(data);
      }
    } catch {
      setBanner({
        type: "error",
        text: "Failed to run self-test suite.",
      });
    } finally {
      setIsRunningTests(false);
    }
  };

  const selectedOrder =
    orders.find((o) => o.internalOrderId === selectedOrderId) || null;

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.currentStatus !== statusFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.trackingId.toLowerCase().includes(q) ||
      o.customerReference.toLowerCase().includes(q) ||
      (o.customerPhone || "").toLowerCase().includes(q) ||
      o.serviceType.toLowerCase().includes(q) ||
      o.documentCategory.toLowerCase().includes(q) ||
      (o.destinationCountry || "").toLowerCase().includes(q)
    );
  });

  const formatDateTime = (iso: string) => {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  // Build customer WhatsApp message & manual wa.me share link for the currently selected order
  const currentSecureTrackingUrl =
    activeQrBundle &&
    selectedOrder &&
    activeQrBundle.trackingId === selectedOrder.trackingId
      ? activeQrBundle.liveScanUrl
      : selectedOrder
      ? `${window.location.origin}/apostille-tracking?id=${encodeURIComponent(
          selectedOrder.trackingId
        )}`
      : "";

  const currentWhatsAppMessage = selectedOrder
    ? [
        `Hello! Your Fatima Global Attestation order has been registered successfully.`,
        ``,
        `Tracking Reference: ${selectedOrder.trackingId}`,
        ``,
        `Track your order status here: ${currentSecureTrackingUrl}`,
        ``,
        `You can use this link to check the latest available status. For assistance, contact us on WhatsApp at ${BUSINESS_CONFIG.displayPhone}.`,
        ``,
        `Thank you for choosing Fatima Global Attestation.`,
      ].join("\n")
    : "";

  const getManualWaMeUrl = (phoneRaw: string, text: string) => {
    const digits = (phoneRaw || "").replace(/[^0-9]/g, "");
    const normalizedDigits =
      digits.length === 10 && /^[6-9]/.test(digits)
        ? `91${digits}`
        : digits.length >= 8 && digits.length <= 15
        ? digits
        : "";
    const encoded = encodeURIComponent(text);
    return normalizedDigits
      ? `https://wa.me/${normalizedDigits}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
  };

  const currentManualWhatsAppUrl = selectedOrder
    ? getManualWaMeUrl(
        customerPhoneToUpdate || selectedOrder.customerPhone || "",
        currentWhatsAppMessage
      )
    : "https://wa.me/";

  // ============================================================================
  // UNAUTHENTICATED VIEW: Staff Role & Token Login Gate
  // ============================================================================
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="bg-[#0B2545] px-6 py-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Role-Based Staff Authorization</span>
            </div>
            <h1 className="text-xl font-bold font-display mt-1">
              Document Order Tracking Admin
            </h1>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Sign in with your server administrator token and staff identity to
              create unique tracking references (FGA-YYYY-NNNNNN), generate QR
              receipts, share customer WhatsApp links, and update statuses.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="staff-name"
                className="block text-xs font-semibold text-slate-800 mb-1"
              >
                Staff Full Name (Recorded in Audit Log)
              </label>
              <input
                id="staff-name"
                type="text"
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label
                htmlFor="staff-role"
                className="block text-xs font-semibold text-slate-800 mb-1"
              >
                Authorized Role
              </label>
              <select
                id="staff-role"
                value={actorRole}
                onChange={(e) => setActorRole(e.target.value as AdminStaffRole)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                {ADMIN_STAFF_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="admin-secret-input"
                className="block text-xs font-semibold text-slate-800 mb-1"
              >
                Administrator Secret Token
              </label>
              <input
                id="admin-secret-input"
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter TRACKING_ADMIN_TOKEN or KNOWLEDGE_ADMIN_TOKEN"
                required
                className="w-full px-3.5 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {adminConfigError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950"
              >
                {adminConfigError}
              </div>
            )}

            {previewBootstrapToken && !adminConfigError && (
              <div className="rounded-lg bg-teal-50 border border-teal-200 p-3 text-xs text-teal-950 space-y-2">
                <p className="font-semibold">
                  Isolated Local Development Mode Detected
                </p>
                <p className="text-[11px] text-teal-800 leading-relaxed">
                  Running in local development preview (disabled in production).
                  In production, <span className="font-mono">TRACKING_ADMIN_TOKEN</span>{" "}
                  is strictly required and never returned by the server.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    verifyAndLoadOrders(
                      previewBootstrapToken,
                      actorName || "Operations Desk",
                      actorRole
                    );
                  }}
                  className="w-full py-2 px-3 rounded-md bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Sign In with Local Development Preview Key
                </button>
              </div>
            )}

            {authError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800"
              >
                {authError}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigate("/apostille-tracking")}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Public Tracking</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B2545] hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                Authorize &amp; Open Console
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // AUTHENTICATED ADMIN CONSOLE VIEW
  // ============================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Admin Bar (Hidden when printing a receipt) */}
      <div className="print:hidden bg-[#0B2545] text-white border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>FATIMA GLOBAL ATTESTATION · AUTHORIZED STAFF CONSOLE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
              Order Tracking, Unique QR Codes &amp; Customer WhatsApp Sharing
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Signed in as{" "}
              <strong className="text-white">{actorName}</strong> ({actorRole}) ·{" "}
              <span>
                {orders.length} Saved Orders · {auditLogs.length} Audit Events
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate("/apostille-tracking")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-teal-300" />
              <span>Public Tracking Page</span>
            </button>

            <button
              type="button"
              onClick={() =>
                verifyAndLoadOrders(adminToken, actorName, actorRole)
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAuthorized(false);
                setAdminToken("");
                try {
                  sessionStorage.removeItem("fga_tracking_admin_token");
                } catch {}
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace (Hidden when printing a receipt) */}
      <div className="print:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Segmented Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#0B2545] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Manage Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === "create"
                  ? "bg-[#0B2545] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Order &amp; Tracking ID</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("audit")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === "audit"
                  ? "bg-[#0B2545] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit Log ({auditLogs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("setup");
                if (!selfTestResults) handleRunSelfTests();
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === "setup"
                  ? "bg-[#0B2545] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Acceptance Self-Tests &amp; Setup</span>
            </button>
          </div>
        </div>

        {/* Status Notification Banner */}
        {banner && (
          <div
            role="status"
            className={`rounded-xl p-4 border text-xs flex items-center justify-between gap-4 ${
              banner.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : banner.type === "error"
                ? "bg-red-50 border-red-200 text-red-900"
                : "bg-teal-50 border-teal-200 text-teal-950"
            }`}
          >
            <span>{banner.text}</span>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="font-bold underline shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 1: SEARCH & MANAGE ORDERS + QR RECEIPT + WHATSAPP SHARING      */}
        {/* ================================================================== */}
        {activeTab === "orders" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Search & Orders List */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-900 font-display">
                  Order Directory
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab("create")}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Order</span>
                </button>
              </div>

              {/* Search & Status Filter */}
              <div className="space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search FGA-2026-..., client ref, phone..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter orders by status"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700"
                >
                  <option value="all">All Statuses ({orders.length})</option>
                  {BUSINESS_ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="py-10 text-center space-y-3 border border-dashed border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    {orders.length === 0
                      ? "No tracking orders have been created yet."
                      : "No orders match your current search filter."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("create")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Tracking ID</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {filteredOrders.map((order) => {
                    const isSelected =
                      order.internalOrderId === selectedOrderId;
                    return (
                      <button
                        key={order.internalOrderId}
                        type="button"
                        onClick={() => selectOrderForEditing(order)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-teal-50/70 border-teal-600 shadow-2xs"
                            : "bg-slate-50/60 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-[#0B2545]">
                            {order.trackingId}
                          </span>
                          <span className="text-[11px] font-semibold text-teal-800">
                            {order.currentStatus}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-800 mt-1 truncate">
                          {order.serviceType}
                        </p>
                        <div className="flex items-center justify-between gap-2 mt-1 text-[11px] text-slate-500">
                          <span className="truncate">
                            Ref: {order.customerReference}
                            {order.customerPhone
                              ? ` · ${order.customerPhone}`
                              : ""}
                          </span>
                          <span>{formatDateTime(order.updatedAt)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Selected Order Details, QR Receipt, WhatsApp Sharing & Status Update */}
            <div className="lg:col-span-7 space-y-6">
              {!selectedOrder ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                  <p className="text-sm font-semibold text-slate-700">
                    Select an order from the directory or create a new Tracking
                    ID.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("create")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Order &amp; Tracking ID</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Unique Tracking Reference</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Internal Ref:{" "}
                          <strong className="text-slate-800">
                            {selectedOrder.customerReference}
                          </strong>{" "}
                          (Private)
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold font-mono text-[#0B2545] mt-0.5">
                        {selectedOrder.trackingId}
                      </h2>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {selectedOrder.serviceType} ·{" "}
                        {selectedOrder.documentCategory}
                        {selectedOrder.destinationCountry
                          ? ` · ${selectedOrder.destinationCountry}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-400" />
                        <span>Print Receipt with QR</span>
                      </button>

                      <a
                        href={`/apostille-tracking?id=${encodeURIComponent(
                          selectedOrder.trackingId
                        )}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.history.pushState(
                            {},
                            "",
                            `/apostille-tracking?id=${encodeURIComponent(
                              selectedOrder.trackingId
                            )}`
                          );
                          onNavigate("/apostille-tracking");
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
                      >
                        <span>Open Customer Tracking View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* CUSTOMER WHATSAPP SHARING & AUTOMATIC NOTIFICATION PANEL */}
                  {/* ======================================================== */}
                  <div className="rounded-xl bg-emerald-50/60 border border-emerald-200 p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-950">
                          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                          <span>Customer WhatsApp Tracking Link Sharing</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {backendConfig?.whatsappApi?.readyForAutomaticDelivery
                            ? "Approved WhatsApp Business Cloud API is active. Messages send automatically when customer consent is enabled."
                            : "Manual Staff Review Mode (No paid WhatsApp Business API configured). Click 'Share Tracking Link on WhatsApp' below to review and send the pre-filled message."}
                        </p>
                      </div>

                      <a
                        href={currentManualWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          handleRecordManualWhatsAppShare(
                            selectedOrder.internalOrderId,
                            false
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1ebe5d] rounded-xl shadow-xs transition-colors shrink-0"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>Share Tracking Link on WhatsApp</span>
                      </a>
                    </div>

                    {/* Customer Phone Number & Consent Editor (Staff Only - Never Public) */}
                    <div className="bg-white rounded-xl border border-emerald-200/80 p-3.5 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                        <div className="sm:col-span-7">
                          <label
                            htmlFor="order-customer-phone"
                            className="block text-xs font-semibold text-slate-800 mb-1"
                          >
                            Customer WhatsApp Phone Number (Private Staff Record)
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                            <input
                              id="order-customer-phone"
                              type="tel"
                              value={customerPhoneToUpdate}
                              onChange={(e) =>
                                setCustomerPhoneToUpdate(e.target.value)
                              }
                              placeholder="e.g. +91 98765 43210"
                              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-5 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={handleSaveCustomerPhone}
                            disabled={isUpdatingOrder}
                            className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors cursor-pointer"
                          >
                            Save Phone Number
                          </button>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customerConsentToUpdate}
                          onChange={(e) =>
                            setCustomerConsentToUpdate(e.target.checked)
                          }
                          className="rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                        />
                        <span>
                          Customer consented to receive order tracking updates on
                          WhatsApp
                        </span>
                      </label>
                    </div>

                    {/* Pre-filled Customer Message Preview */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-700">
                          Prepared Customer Message Preview:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(
                              currentWhatsAppMessage
                            );
                            setBanner({
                              type: "info",
                              text: "Copied pre-filled customer WhatsApp message to clipboard.",
                            });
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:text-teal-950 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Message Text</span>
                        </button>
                      </div>
                      <pre className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] font-sans text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {currentWhatsAppMessage}
                      </pre>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* UNIQUE QR CODE & PRINT-FRIENDLY RECEIPT PANEL            */}
                  {/* ======================================================== */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-teal-700" />
                          <span>
                            Unique Order Tracking QR Code &amp; Receipt
                          </span>
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Contains only the secure tracking URL (no personal
                          names or phone numbers inside the QR code).
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Customer Receipt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextMode = !qrUseLiveUrl;
                            setQrUseLiveUrl(nextMode);
                            handleFetchOrderQr(
                              selectedOrder.internalOrderId,
                              nextMode
                            );
                          }}
                          className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
                        >
                          {qrUseLiveUrl
                            ? "Show Canonical Template URL"
                            : "Use Live Scan URL"}
                        </button>
                      </div>
                    </div>

                    {isLoadingQr ||
                    !activeQrBundle ||
                    activeQrBundle.trackingId !== selectedOrder.trackingId ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        Generating unique QR code for {selectedOrder.trackingId}
                        ...
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white p-4 rounded-xl border border-slate-200">
                        <div className="sm:col-span-4 flex flex-col items-center">
                          <img
                            src={activeQrBundle.qrDataUrl}
                            alt={`Receipt QR Code for ${activeQrBundle.trackingId}`}
                            className="w-36 h-36 border border-slate-200 rounded-lg p-1 bg-white"
                          />
                          <span className="font-mono text-[11px] font-bold text-[#0B2545] mt-1.5">
                            {activeQrBundle.trackingId}
                          </span>
                        </div>
                        <div className="sm:col-span-8 space-y-2.5 text-xs">
                          <div>
                            <span className="text-slate-500 font-medium block">
                              Secure Tracking Link (Encoded in QR):
                            </span>
                            <code className="block font-mono text-[11px] text-slate-900 bg-slate-100 p-2 rounded mt-1 break-all">
                              {activeQrBundle.encodedUrl}
                            </code>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard?.writeText(
                                  activeQrBundle.liveScanUrl
                                );
                                setBanner({
                                  type: "info",
                                  text: "Copied secure tracking URL to clipboard.",
                                });
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-800 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy Secure Tracking Link</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleTokenAction(
                                  selectedOrder.internalOrderId,
                                  "rotate"
                                )
                              }
                              className="px-2.5 py-1.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-800 cursor-pointer"
                            >
                              Rotate QR Token
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleTokenAction(
                                  selectedOrder.internalOrderId,
                                  selectedOrder.tokenExpiresAt
                                    ? "clear_expiry"
                                    : "expire_now"
                                )
                              }
                              className="px-2.5 py-1.5 text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded text-amber-900 cursor-pointer"
                            >
                              {selectedOrder.tokenExpiresAt
                                ? "Reactivate Expired Token"
                                : "Test Expire Token"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Update Order Status Form */}
                  <form
                    onSubmit={handleUpdateStatus}
                    className="space-y-4 pt-2"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Update Business Order Status
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="update-status-select"
                          className="block text-xs font-semibold text-slate-800 mb-1"
                        >
                          Select Official Status
                        </label>
                        <select
                          id="update-status-select"
                          value={statusToUpdate}
                          onChange={(e) =>
                            setStatusToUpdate(
                              e.target.value as BusinessOrderStatus
                            )
                          }
                          className="w-full px-3.5 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                        >
                          {BUSINESS_ORDER_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="update-public-remark"
                          className="block text-xs font-semibold text-slate-800 mb-1"
                        >
                          Public Timeline Note (Visible to Customer)
                        </label>
                        <input
                          id="update-public-remark"
                          type="text"
                          value={statusPublicRemark}
                          onChange={(e) =>
                            setStatusPublicRemark(e.target.value)
                          }
                          placeholder="e.g. Documents verified and queued for SDM authentication."
                          maxLength={280}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isUpdatingOrder}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                    >
                      {isUpdatingOrder
                        ? "Saving Status..."
                        : "Save Status & Append to Public Timeline"}
                    </button>
                  </form>

                  {/* Private Internal Staff Notes */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="internal-staff-notes"
                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                      >
                        Private Internal Staff Notes (Never Shown on Public
                        Page)
                      </label>
                      <span className="text-[11px] text-amber-800 font-semibold">
                        Staff-Only Confidential
                      </span>
                    </div>

                    <textarea
                      id="internal-staff-notes"
                      rows={3}
                      value={notesToUpdate}
                      onChange={(e) => setNotesToUpdate(e.target.value)}
                      placeholder="Add internal courier airwaybill, batch notes, or staff instructions..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />

                    <button
                      type="button"
                      onClick={handleSaveInternalNotes}
                      disabled={isUpdatingOrder}
                      className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Save Internal Notes
                    </button>
                  </div>

                  {/* Public Timeline Preview */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Saved Public Timeline ({selectedOrder.publicTimeline.length}{" "}
                      Events)
                    </h3>
                    <ol className="space-y-2.5">
                      {selectedOrder.publicTimeline.map((ev) => (
                        <li
                          key={ev.id}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-[#0B2545]">
                              {ev.status}
                            </span>
                            <p className="text-slate-600 mt-0.5">
                              {ev.summary}
                            </p>
                          </div>
                          <span className="font-mono text-[11px] text-slate-500 shrink-0">
                            {formatDateTime(ev.timestamp)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: CREATE A NEW ORDER & UNIQUE TRACKING REFERENCE              */}
        {/* ================================================================== */}
        {activeTab === "create" && (
          <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B2545] font-display">
                Create New Order &amp; Generate Unique Tracking Reference
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Automatically generates a unique, non-repeating tracking
                reference (e.g.{" "}
                <span className="font-mono font-semibold text-[#0B2545]">
                  FGA-2026-000184
                </span>
                ), a secure QR code receipt, and a pre-filled customer WhatsApp
                notification link.
              </p>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="create-customer-ref"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Internal Customer Reference{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="create-customer-ref"
                    type="text"
                    value={newCustomerRef}
                    onChange={(e) => setNewCustomerRef(e.target.value)}
                    placeholder="e.g. Receipt #1042 - Client Initials (Private)"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Kept strictly confidential on server; never shown on public
                    pages.
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="create-customer-phone"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Customer WhatsApp Phone Number (Private)
                  </label>
                  <input
                    id="create-customer-phone"
                    type="tel"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Used to prepare customer WhatsApp tracking updates; never
                    exposed publicly.
                  </span>
                </div>

                <div className="sm:col-span-2 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newCustomerConsent}
                      onChange={(e) => setNewCustomerConsent(e.target.checked)}
                      className="rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                    />
                    <span>
                      Customer consented to receive order tracking link and
                      status updates on WhatsApp
                    </span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="create-service-type"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Service Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="create-service-type"
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    {TRACKING_SERVICE_TYPES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="create-doc-category"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Document Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="create-doc-category"
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    {TRACKING_DOCUMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="create-dest-country"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Destination Country (Optional)
                  </label>
                  <input
                    id="create-dest-country"
                    type="text"
                    value={newDestCountry}
                    onChange={(e) => setNewDestCountry(e.target.value)}
                    placeholder="e.g. Germany, UAE, Saudi Arabia, Italy"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="create-initial-status"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Initial Business Status
                  </label>
                  <select
                    id="create-initial-status"
                    value={newInitialStatus}
                    onChange={(e) =>
                      setNewInitialStatus(e.target.value as BusinessOrderStatus)
                    }
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    {BUSINESS_ORDER_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="create-pin"
                    className="block text-xs font-semibold text-slate-800 mb-1"
                  >
                    Optional Customer Verification PIN (4–8 digits)
                  </label>
                  <input
                    id="create-pin"
                    type="text"
                    value={newVerificationPin}
                    onChange={(e) => setNewVerificationPin(e.target.value)}
                    placeholder="Leave blank for standard Tracking ID lookup"
                    maxLength={12}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="create-public-summary"
                  className="block text-xs font-semibold text-slate-800 mb-1"
                >
                  Initial Public Timeline Message (Customer-Safe)
                </label>
                <input
                  id="create-public-summary"
                  type="text"
                  value={newPublicSummary}
                  onChange={(e) => setNewPublicSummary(e.target.value)}
                  placeholder="e.g. Order received at Fatima Global Attestation New Delhi desk."
                  maxLength={280}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="create-internal-notes"
                  className="block text-xs font-semibold text-slate-800 mb-1"
                >
                  Internal Staff Notes (Never Exposed Publicly)
                </label>
                <textarea
                  id="create-internal-notes"
                  rows={3}
                  value={newInternalNotes}
                  onChange={(e) => setNewInternalNotes(e.target.value)}
                  placeholder="Private staff notes (never visible on public tracking page)..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isCreatingOrder}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B2545] hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                >
                  {isCreatingOrder
                    ? "Generating Order..."
                    : "Save Order, Generate QR & Prepare WhatsApp Link"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: IMMUTABLE ADMINISTRATOR AUDIT LOG                           */}
        {/* ================================================================== */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B2545] font-display">
                  Administrator Audit Log
                </h2>
                <p className="text-xs text-slate-500">
                  Every order creation, status update, WhatsApp notification,
                  internal note edit, and QR token rotation is recorded with
                  staff identity and timestamp.
                </p>
              </div>
            </div>

            {auditLogs.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No administrator audit entries recorded yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Tracking ID</th>
                      <th className="py-2.5 px-3">Staff Actor &amp; Role</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70">
                    {auditLogs.map((log) => (
                      <tr key={log.auditId} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545] whitespace-nowrap">
                          {log.trackingId}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="font-semibold text-slate-900">
                            {log.actorName}
                          </span>{" "}
                          <span className="text-slate-500">
                            ({log.actorRole})
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] font-semibold text-teal-800 whitespace-nowrap">
                          {log.action}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: AUTOMATED SECURITY SELF-TESTS & ENVIRONMENT SETUP GUIDE     */}
        {/* ================================================================== */}
        {activeTab === "setup" && (
          <div className="space-y-6">
            {/* Automated Security & Acceptance Verification Suite */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#0B2545] font-display">
                    Automated Security &amp; Acceptance Verification Suite
                  </h2>
                  <p className="text-xs text-slate-500">
                    Verifies unique non-repeating tracking references
                    (FGA-YYYY-NNNNNN), QR code privacy, customer WhatsApp
                    message generation, PII redaction, and rate limiting.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRunSelfTests}
                  disabled={isRunningTests}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-slate-900 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {isRunningTests ? "Running Tests..." : "Re-Run Self-Tests"}
                </button>
              </div>

              {selfTestResults && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selfTestResults.results.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                        item.passed
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                          : "bg-red-50 border-red-200 text-red-900"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 font-bold">
                        <span>{item.name}</span>
                        <span>{item.passed ? "PASSED" : "FAILED"}</span>
                      </div>
                      <p className="text-[11px] opacity-90 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Required Environment Variables & Backend Setup Instructions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="text-base font-bold text-[#0B2545] font-display">
                Database, WhatsApp Business API &amp; Production Setup
              </h2>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="font-semibold text-slate-900">
                  Honest Deployment &amp; Integration Status:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>
                    <strong>Active Storage Engine:</strong>{" "}
                    Express Server Atomic JSON Store (
                    <code className="font-mono text-slate-900">
                      data/tracking_orders_store.json
                    </code>{" "}
                    + recoverable backup{" "}
                    <code className="font-mono text-slate-900">
                      data/tracking_orders_store.backup.json
                    </code>
                    )
                  </li>
                  <li>
                    <strong>Important Durability Limitation:</strong>{" "}
                    {backendConfig?.durabilityLimitationNotice ||
                      "Atomic writes and local backups do not protect against an ephemeral hosting filesystem being wiped on container redeploy/restart or permanent disk loss."}
                  </li>
                  <li>
                    <strong>Customer WhatsApp Integration:</strong>{" "}
                    {backendConfig?.whatsappApi?.honestStatusMessage ||
                      "Manual Staff WhatsApp Sharing active (opens WhatsApp with pre-filled message; no paid API required)."}
                  </li>
                  <li>
                    <strong>Supabase PostgreSQL + RLS Migration:</strong> Saved
                    at{" "}
                    <code className="font-mono text-slate-900">
                      supabase/migrations/001_apostille_tracking_orders.sql
                    </code>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Backup &amp; Recovery: Export Snapshot
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Download a verified complete local JSON backup of all orders, timeline events, and audit logs.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    disabled={isDownloadingBackup}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-3.5 h-3.5 text-teal-400" />
                    <span>{isDownloadingBackup ? "Exporting..." : "Download JSON Backup"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* PRINT-ONLY CUSTOMER RECEIPT WITH QR CODE (Visible during window.print) */}
      {/* ==================================================================== */}
      {selectedOrder && activeQrBundle && (
        <div className="hidden print:block p-8 bg-white text-slate-900 max-w-2xl mx-auto">
          <div className="border-2 border-slate-900 rounded-xl p-6 space-y-6">
            <div className="border-b border-slate-300 pb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  OFFICIAL SERVICE ACKNOWLEDGEMENT &amp; TRACKING RECEIPT
                </p>
                <h1 className="text-xl font-extrabold text-slate-950 mt-0.5">
                  {BUSINESS_CONFIG.name}
                </h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  {BUSINESS_CONFIG.address} · Tel:{" "}
                  {BUSINESS_CONFIG.displayPhone}
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-500 block">Order Date</span>
                <strong className="font-mono">
                  {formatDateTime(selectedOrder.createdAt)}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-7 space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                    Tracking Reference
                  </span>
                  <span className="text-lg font-extrabold font-mono text-slate-950">
                    {selectedOrder.trackingId}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                    Service Type
                  </span>
                  <span className="font-semibold text-slate-900">
                    {selectedOrder.serviceType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                    Document Category
                  </span>
                  <span className="font-semibold text-slate-900">
                    {selectedOrder.documentCategory}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                    Current Status
                  </span>
                  <span className="font-bold text-slate-950">
                    {selectedOrder.currentStatus}
                  </span>
                </div>
              </div>

              <div className="col-span-5 flex flex-col items-center text-center border-l border-slate-200 pl-4">
                <img
                  src={activeQrBundle.qrDataUrl}
                  alt={`QR Code for ${selectedOrder.trackingId}`}
                  className="w-36 h-36"
                />
                <span className="text-[10px] font-semibold text-slate-700 mt-1">
                  Scan to Track Order Status
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-600 space-y-1 leading-normal">
              <p>
                <strong>Tracking URL:</strong>{" "}
                <span className="font-mono">{activeQrBundle.encodedUrl}</span>
              </p>
              <p>
                <strong>Important Disclaimer:</strong> Fatima Global Attestation
                is an independent private documentation consultancy and is not a
                government portal, MEA office, or embassy. This receipt QR code
                contains only a secure order tracking link and does NOT certify
                or claim government Apostille authenticity.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
