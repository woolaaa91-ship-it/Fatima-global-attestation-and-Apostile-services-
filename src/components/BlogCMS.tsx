import React, { useState, useEffect } from "react";
import { BlogPost, BLOG_CATEGORIES, BLOG_CATEGORY_IMAGES, getAllBlogPosts, saveBlogPost, deleteBlogPost } from "../data/blog";
import { SERVICES } from "../data/services";
import {
  PlusCircle,
  Edit3,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Eye,
  Save,
  FileText,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface BlogCMSProps {
  onNavigate: (path: string) => void;
}

export const BlogCMS: React.FC<BlogCMSProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activePost, setActivePost] = useState<Partial<BlogPost>>({
    id: "",
    slug: "",
    title: "",
    seoTitle: "",
    metaDescription: "",
    category: "Apostille Guides",
    excerpt: "",
    featuredImage: BLOG_CATEGORY_IMAGES["Apostille Guides"],
    author: {
      name: "Fatima Global Documentation Team",
      role: "Consular & Legalization Compliance",
    },
    publishedDate: new Date().toISOString().split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    tags: ["Apostille", "Attestation", "MEA Guide"],
    tableOfContents: [],
    content: "",
    faqs: [],
    relatedServiceSlug: "/sdm-apostille-services",
    officialSources: [
      { name: "Ministry of External Affairs (CPV Division)", url: "https://mea.gov.in" },
    ],
  });

  const [notification, setNotification] = useState<string>("");
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

  useEffect(() => {
    loadPosts();
    if (adminToken) {
      verifyAdminAccess(adminToken);
    }
  }, []);

  const verifyAdminAccess = async (tokenToTest: string) => {
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
      } else {
        setIsAuthorized(false);
        setAuthError("Unauthorized admin token. Access to Blog & Knowledge Management requires valid server admin credentials.");
      }
    } catch {
      setIsAuthorized(false);
      setAuthError("Unable to reach authentication server.");
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setAuthError("Please enter the administrator token.");
      return;
    }
    await verifyAdminAccess(tokenInput.trim());
  };

  const loadPosts = () => {
    setPosts(getAllBlogPosts());
  };

  const handleStartCreate = () => {
    setActivePost({
      id: `post-${Date.now()}`,
      slug: "",
      title: "",
      seoTitle: "",
      metaDescription: "",
      category: "Apostille Guides",
      excerpt: "",
      featuredImage: BLOG_CATEGORY_IMAGES["Apostille Guides"],
      author: {
        name: "Fatima Global Documentation Team",
        role: "Consular & Legalization Compliance",
      },
      publishedDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      tags: ["Apostille", "Attestation"],
      tableOfContents: [
        { id: "overview", title: "1. Overview & Statutory Scope" },
        { id: "process", title: "2. Step-by-Step Procedure" },
        { id: "checklist", title: "3. Document Checklist & Fees" },
      ],
      content: `## 1. Overview & Statutory Scope\nExplain the specific document authentication rule and destination criteria here.\n\n## 2. Step-by-Step Procedure\n1. Notary Verification\n2. SDM / State HRD Stamping\n3. MEA Authentication\n\n## 3. Document Checklist & Fees\nEnsure documents are not laminated on the reverse side.`,
      faqs: [
        {
          question: "How long does this authentication typically take?",
          answer: "Turnaround depends on third-party government departments and embassy processing schedules.",
        },
      ],
      relatedServiceSlug: "/sdm-apostille-services",
      officialSources: [
        { name: "Ministry of External Affairs", url: "https://mea.gov.in" },
      ],
    });
    setIsEditing(true);
  };

  const handleStartEdit = (post: BlogPost) => {
    setActivePost({ ...post });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    loadPosts();
    setNotification("Article deleted successfully.");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setActivePost((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : slug,
      seoTitle: prev.seoTitle ? prev.seoTitle : `${val} | FATIMA GLOBAL ATTESTATION`,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost.title || !activePost.slug || !activePost.content) {
      setNotification("Please provide at least a Title, URL Slug, and Content.");
      return;
    }

    const postToSave: BlogPost = {
      id: activePost.id || `post-${Date.now()}`,
      slug: activePost.slug,
      title: activePost.title,
      seoTitle: activePost.seoTitle || activePost.title,
      metaDescription: activePost.metaDescription || activePost.excerpt || "",
      category: (activePost.category as any) || "Apostille Guides",
      excerpt: activePost.excerpt || "",
      featuredImage: activePost.featuredImage || BLOG_CATEGORY_IMAGES[activePost.category || "Apostille Guides"] || BLOG_CATEGORY_IMAGES["Apostille Guides"],
      author: activePost.author || {
        name: "Fatima Global Documentation Team",
        role: "Consular Compliance",
      },
      publishedDate: activePost.publishedDate || new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
      readTime: activePost.readTime || "5 min read",
      tags: activePost.tags || ["Attestation"],
      tableOfContents: activePost.tableOfContents || [],
      content: activePost.content,
      faqs: activePost.faqs || [],
      relatedServiceSlug: activePost.relatedServiceSlug || "/sdm-apostille-services",
      officialSources: activePost.officialSources || [],
      isCustom: true,
    };

    saveBlogPost(postToSave);
    loadPosts();
    setIsEditing(false);
    setNotification("Article published & saved successfully to live website!");
    setTimeout(() => setNotification(""), 4000);
  };

  if (!isAuthorized) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Restricted Internal Route (noindex)
            </span>
            <h1 className="text-xl font-extrabold text-slate-950 font-display">
              Authorized Blog & Knowledge Management
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your administrator token (configured via KNOWLEDGE_ADMIN_TOKEN) to manage articles.
            </p>
          </div>
          {authError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {authError}
            </div>
          )}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label htmlFor="cmsAdminToken" className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Access Token
              </label>
              <input
                id="cmsAdminToken"
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter KNOWLEDGE_ADMIN_TOKEN"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Verify & Unlock
              </button>
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/blog");
                }}
                className="py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Back to Guides
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Self-Service Business CMS
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                No-Code Editor
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-950 font-display mt-1">
              Blog & Knowledge Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish new guides, update destination regulations, and edit SEO metadata directly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("/blog")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Knowledge Centre</span>
            </button>

            {!isEditing && (
              <button
                onClick={handleStartCreate}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-teal-400" />
                <span>Create New Article</span>
              </button>
            )}
          </div>
        </div>

        {notification && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Editing / Creation Form View */}
        {isEditing ? (
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                {activePost.id?.startsWith("post-") && activePost.title ? "Edit Article" : "Create New Article"}
              </h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel & Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={activePost.title || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Italy Degree Attestation and Declaration of Value (DOV) Guide"
                  required
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                />
              </div>

              {/* URL Slug */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden px-3">
                  <span className="shrink-0 text-slate-400">/blog/</span>
                  <input
                    type="text"
                    value={activePost.slug || ""}
                    onChange={(e) => setActivePost({ ...activePost, slug: e.target.value })}
                    placeholder="italy-degree-attestation-dov-guide"
                    required
                    className="w-full py-2 text-sm text-slate-900 bg-transparent border-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={activePost.category || "Apostille Guides"}
                  onChange={(e) => {
                    const nextCat = e.target.value as BlogPost["category"];
                    const nextImg = BLOG_CATEGORY_IMAGES[nextCat] || activePost.featuredImage;
                    setActivePost({ ...activePost, category: nextCat, featuredImage: nextImg });
                  }}
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                >
                  {BLOG_CATEGORIES.filter((c) => c !== "All Articles").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEO Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unique SEO Title Tag
                </label>
                <input
                  type="text"
                  value={activePost.seoTitle || ""}
                  onChange={(e) => setActivePost({ ...activePost, seoTitle: e.target.value })}
                  placeholder="e.g. Italy Degree Attestation in India: Complete DOV Process"
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SEO Meta Description
                </label>
                <input
                  type="text"
                  value={activePost.metaDescription || ""}
                  onChange={(e) => setActivePost({ ...activePost, metaDescription: e.target.value })}
                  placeholder="Short, compelling summary between 120-160 characters..."
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                />
              </div>

              {/* Excerpt */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Article Excerpt
                </label>
                <textarea
                  rows={2}
                  value={activePost.excerpt || ""}
                  onChange={(e) => setActivePost({ ...activePost, excerpt: e.target.value })}
                  placeholder="Summary shown on blog listing cards..."
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white resize-none"
                />
              </div>

              {/* Featured Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Featured Image Path
                </label>
                <select
                  value={activePost.featuredImage || BLOG_CATEGORY_IMAGES["Apostille Guides"]}
                  onChange={(e) => setActivePost({ ...activePost, featuredImage: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                >
                  <option value={BLOG_CATEGORY_IMAGES["Apostille Guides"]}>
                    Apostille Guides — Apostille Certificate & Document Authentication
                  </option>
                  <option value={BLOG_CATEGORY_IMAGES["MEA & SDM Attestation"]}>
                    MEA & SDM Attestation — Educational & Personal Documents
                  </option>
                  <option value={BLOG_CATEGORY_IMAGES["e-Sanad"]}>
                    e-Sanad — Digital Document Verification
                  </option>
                  <option value={BLOG_CATEGORY_IMAGES["Embassy Legalization"]}>
                    Embassy Legalization — Embassy Legalization & Consular Documents
                  </option>
                  <option value={BLOG_CATEGORY_IMAGES["Commercial Documents"]}>
                    Commercial Documents — Invoices, COI & Export Paperwork
                  </option>
                  <option value={BLOG_CATEGORY_IMAGES["Translation"]}>
                    Translation — Certified Document Translation & Bilingual Paperwork
                  </option>
                  <option value={BLOG_CATEGORY_IMAGES["Country Guides"]}>
                    Country Guides — International Documentation & Country Requirements
                  </option>
                </select>
              </div>

              {/* Related Service CTA Target */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Service CTA Button
                </label>
                <select
                  value={activePost.relatedServiceSlug || "/sdm-apostille-services"}
                  onChange={(e) => setActivePost({ ...activePost, relatedServiceSlug: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Content */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Article Body Content (Markdown Supported: ## Heading, - List, **Bold**)
                </label>
                <textarea
                  rows={10}
                  value={activePost.content || ""}
                  onChange={(e) => setActivePost({ ...activePost, content: e.target.value })}
                  placeholder="Write your article content here..."
                  required
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
              >
                <Save className="w-4 h-4 text-teal-400" />
                <span>Save & Publish Live</span>
              </button>
            </div>
          </form>
        ) : (
          /* Articles List Table */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Published Knowledge Articles ({posts.length})
              </span>
              <span className="text-xs text-slate-400">
                All articles are indexed in the sitemap & Schema.org Article data
              </span>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              {posts.map((post) => (
                <div key={post.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold text-[10px]">
                        {post.category}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 text-[11px] font-mono">/blog/{post.slug}</span>
                      {post.isCustom && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold text-[9px]">
                          User Custom
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigate(`/blog/${post.slug}`)}
                      className="p-2 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                      title="View Article Live"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleStartEdit(post)}
                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {post.isCustom && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
