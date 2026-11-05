import React, { useState, useEffect } from "react";
import {
  BlogPost,
  BLOG_CATEGORIES,
  getAllBlogPosts,
  resolvePostThumbnail,
} from "../data/blog";
import { getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  PlusCircle,
  FileCheck2,
  Stamp,
  Laptop,
  Landmark,
  Briefcase,
  Languages,
  Globe2,
} from "lucide-react";

interface BlogListProps {
  onNavigate: (path: string) => void;
}

const CATEGORY_PLACEHOLDER_META: Record<
  string,
  { subtitle: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  "Apostille Guides": {
    subtitle: "Apostille Certificate & Document Authentication",
    Icon: FileCheck2,
  },
  "MEA & SDM Attestation": {
    subtitle: "Educational & Personal Documents",
    Icon: Stamp,
  },
  "e-Sanad": {
    subtitle: "Digital Document Verification",
    Icon: Laptop,
  },
  "e-Sanad & Education": {
    subtitle: "Digital Document Verification",
    Icon: Laptop,
  },
  "Embassy Legalization": {
    subtitle: "Embassy Legalization & Consular Documents",
    Icon: Landmark,
  },
  "Commercial Documents": {
    subtitle: "Invoices, Certificates of Origin & Export Paperwork",
    Icon: Briefcase,
  },
  "Translation": {
    subtitle: "Document Translation & Bilingual Paperwork",
    Icon: Languages,
  },
  "Document Translation": {
    subtitle: "Document Translation & Bilingual Paperwork",
    Icon: Languages,
  },
  "Country Guides": {
    subtitle: "International Documentation & Country Requirements",
    Icon: Globe2,
  },
};

export const ArticleCategoryThumbnail: React.FC<{
  post: BlogPost;
  className?: string;
}> = ({ post }) => {
  const meta = CATEGORY_PLACEHOLDER_META[post.category] || {
    subtitle: "Official Documentation & Procedural Guide",
    Icon: ShieldCheck,
  };
  const IconComponent = meta.Icon;
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0B2545] via-slate-900 to-teal-950 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-amber-400/40 flex items-center justify-center mb-3 shadow-xs">
        <IconComponent className="w-6 h-6 text-amber-300" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
        {post.category}
      </span>
      <span className="text-[11px] text-slate-300 mt-1 max-w-[220px] leading-snug">
        {meta.subtitle}
      </span>
    </div>
  );
};

export const BlogList: React.FC<BlogListProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setPosts(getAllBlogPosts());
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Articles" ||
      post.category === selectedCategory ||
      (selectedCategory === "e-Sanad" && (post.category as string).includes("e-Sanad")) ||
      (selectedCategory === "Translation" && (post.category as string).includes("Translation"));
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 min-w-0" aria-label="Breadcrumb">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate">Knowledge Centre & Blog</span>
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
              <span>Authoritative Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
              Documentation Knowledge Centre & Guides
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
              Step-by-step statutory guides, destination protocols, and procedural breakdowns for Indian personal, educational, and commercial document authentication.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
        
        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles (e.g. Apostille, UAE, SDM, e-Sanad, POA)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-white text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Featured Image */}
                <div
                  className="relative aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer border-b border-slate-100"
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                >
                  <ArticleCategoryThumbnail post={post} />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#0B2545]/90 text-teal-300 border border-amber-400/30 rounded-md backdrop-blur-xs shadow-2xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-3">
                    {/* Metadata line: date & read time */}
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display line-clamp-2">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                      >
                        {post.title}
                      </a>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author + Read Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center text-xs font-bold shrink-0">
                        F
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${post.slug}`);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-900 transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3 text-slate-500 text-sm">
              <p>No guides match your search query: "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Articles");
                }}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* WhatsApp Consultation Prompt */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold font-display text-white">
              Need a Custom Procedural Verification for Your Case?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Every embassy and university maintains nuanced criteria. Send clear scans on WhatsApp to verify the statutory sequence before dispatching documents.
            </p>
          </div>
          <a
            href={getWhatsAppUrl("Hello Fatima Global Attestation, I was reading your Knowledge Centre and need procedural guidance for my certificates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 text-slate-950" />
            <span>Ask a Specialist on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
