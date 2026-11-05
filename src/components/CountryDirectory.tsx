import React, { useState, useMemo } from "react";
import {
  COUNTRY_DIRECTORY,
  PRIORITY_12_COUNTRIES,
  CountryDirectoryEntry,
  CountryContinent,
  MEA_PROTOCOL_REFERENCE_URL,
} from "../data/countryDirectory";
import { getWhatsAppUrl, BUSINESS_CONFIG } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CountryFlag } from "./CountryFlag";
import {
  Search,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Compass,
  Filter,
  X,
  ShieldAlert,
  Stamp,
  Landmark,
} from "lucide-react";

interface CountryDirectoryProps {
  onNavigate: (path: string) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const CONTINENT_OPTIONS: Array<"All" | CountryContinent> = [
  "All",
  "Middle East & GCC",
  "Europe",
  "North America",
  "Asia-Pacific",
  "Africa",
  "South America",
];

export const CountryDirectory: React.FC<CountryDirectoryProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [selectedContinent, setSelectedContinent] = useState<
    "All" | CountryContinent
  >("All");
  const [selectedRouteType, setSelectedRouteType] = useState<
    "all" | "apostille" | "embassy"
  >("all");
  // Default to supported/verified countries so unsupported countries are never shown as available services by default
  const [showConfirmationCountries, setShowConfirmationCountries] =
    useState<boolean>(false);

  // Base pool of countries (supported by default unless user explicitly toggles reference lookup)
  const activeCountryPool = useMemo(() => {
    if (showConfirmationCountries) {
      return COUNTRY_DIRECTORY;
    }
    return COUNTRY_DIRECTORY.filter(
      (c) => c.verificationStatus !== "Route requires confirmation"
    );
  }, [showConfirmationCountries]);

  // Compute which letters exist in the active pool
  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const country of activeCountryPool) {
      set.add(country.firstLetter.toUpperCase());
    }
    return set;
  }, [activeCountryPool]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = activeCountryPool.filter((country) => {
      if (
        selectedLetter !== "ALL" &&
        country.firstLetter.toUpperCase() !== selectedLetter
      ) {
        return false;
      }
      if (
        selectedContinent !== "All" &&
        country.continent !== selectedContinent
      ) {
        return false;
      }
      if (selectedRouteType === "apostille" && !country.isApostilleMember) {
        return false;
      }
      if (selectedRouteType === "embassy" && country.isApostilleMember) {
        return false;
      }
      if (q) {
        const matchesName = country.name.toLowerCase().includes(q);
        const matchesShort = country.shortName.toLowerCase().includes(q);
        const matchesIso = country.isoCode.toLowerCase() === q;
        const matchesContinent = country.continent.toLowerCase().includes(q);
        const matchesAlias = country.aliases.some((a) =>
          a.toLowerCase().includes(q)
        );
        const matchesRoute = country.routeBadge.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesShort &&
          !matchesIso &&
          !matchesContinent &&
          !matchesAlias &&
          !matchesRoute
        ) {
          return false;
        }
      }
      return true;
    });

    if (selectedLetter === "ALL" && !q) {
      return [...list].sort((a, b) => {
        if (a.isPriority12 && b.isPriority12) {
          return (a.priorityOrder || 99) - (b.priorityOrder || 99);
        }
        if (a.isPriority12) return -1;
        if (b.isPriority12) return 1;
        return a.name.localeCompare(b.name);
      });
    }
    return list;
  }, [
    activeCountryPool,
    searchQuery,
    selectedLetter,
    selectedContinent,
    selectedRouteType,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLetter("ALL");
    setSelectedContinent("All");
    setSelectedRouteType("all");
  };

  const getStatusBadgeClasses = (
    status: CountryDirectoryEntry["verificationStatus"]
  ) => {
    if (status === "Verified") {
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
    if (status === "Partially Verified") {
      return "bg-teal-50 text-teal-800 border-teal-200";
    }
    return "bg-amber-50 text-amber-900 border-amber-200";
  };

  return (
    <section
      id="country-directory"
      aria-labelledby="country-directory-heading"
      className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6 scroll-mt-24"
    >
      {/* Directory Header & Priority 12 Quick Access */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80">
          <Globe2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
          <span>Country-Wise Apostille &amp; Embassy Legalization Directory</span>
        </div>

        <h2
          id="country-directory-heading"
          className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-serif tracking-tight"
        >
          Explore Attestation &amp; Apostille Services by Destination Country
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Search by country name, filter by continent or authentication route (Hague Apostille Convention vs. Embassy Legalization &amp; MOFA Attestation), or browse alphabetically (A–Z). Select any supported country to open its dedicated step-by-step requirements page.
        </p>

        {/* Priority 12 Destination Countries Quick Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A192F]">
              12 Priority Destination Countries
            </span>
            <span className="text-[11px] text-[#0F766E] font-semibold">
              Direct Country Landing Pages
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {PRIORITY_12_COUNTRIES.map((country) => {
              const targetUrl = `/countries/${country.canonicalSlug}`;
              return (
                <a
                  key={country.slug}
                  href={targetUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(targetUrl);
                  }}
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-teal-50/80 active:bg-teal-100/80 active:scale-[0.97] border border-slate-200 hover:border-[#0F766E] transition-all duration-150 flex items-center justify-between gap-1.5 group shadow-2xs cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CountryFlag
                      isoCode={country.isoCode}
                      countryName={country.shortName}
                      size="sm"
                    />
                    <span className="text-xs font-bold text-[#0A192F] group-hover:text-[#0F766E] truncate">
                      {country.shortName}
                    </span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#0F766E] shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search, Continent Filter, Route Type Filter & A-Z Bar */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <label htmlFor="country-directory-search" className="sr-only">
              Search by country name
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="country-directory-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country (e.g., UAE, Saudi Arabia, Qatar, Kuwait, Germany, Italy, USA, UK...)"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Continent Filter Dropdown */}
          <div className="md:col-span-3">
            <label htmlFor="country-continent-filter" className="sr-only">
              Filter by continent
            </label>
            <div className="relative">
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="country-continent-filter"
                value={selectedContinent}
                onChange={(e) =>
                  setSelectedContinent(
                    e.target.value as "All" | CountryContinent
                  )
                }
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                {CONTINENT_OPTIONS.map((cont) => (
                  <option key={cont} value={cont}>
                    {cont === "All" ? "All Continents" : cont}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Type Filter (Apostille vs Embassy Legalization) */}
          <div className="md:col-span-3">
            <label htmlFor="country-route-filter" className="sr-only">
              Filter by authentication route
            </label>
            <select
              id="country-route-filter"
              value={selectedRouteType}
              onChange={(e) =>
                setSelectedRouteType(
                  e.target.value as "all" | "apostille" | "embassy"
                )
              }
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="all">All Authentication Routes</option>
              <option value="apostille">
                Hague Apostille Convention Countries
              </option>
              <option value="embassy">
                Embassy Legalization &amp; MOFA Countries
              </option>
            </select>
          </div>
        </div>

        {/* Continent Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
            Continent:
          </span>
          {CONTINENT_OPTIONS.map((cont) => {
            const active = selectedContinent === cont;
            return (
              <button
                key={cont}
                type="button"
                onClick={() => setSelectedContinent(cont)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                  active
                    ? "bg-[#0A192F] text-white border-[#0A192F]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50 hover:text-[#0F766E] hover:border-teal-200"
                }`}
              >
                {cont === "All" ? "All Regions" : cont}
              </button>
            );
          })}
        </div>

        {/* Route Type Visual Comparison Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedRouteType("all")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                selectedRouteType === "all"
                  ? "bg-[#0F766E] text-white border-[#0F766E]"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>All Routes</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRouteType("apostille")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                selectedRouteType === "apostille"
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-teal-50/70 text-[#0F766E] border-teal-200 hover:bg-teal-100/70"
              }`}
            >
              <Stamp className="w-3.5 h-3.5" />
              <span>Hague Apostille Countries</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRouteType("embassy")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                selectedRouteType === "embassy"
                  ? "bg-[#92600A] text-white border-[#92600A]"
                  : "bg-amber-50/80 text-[#92600A] border-amber-200 hover:bg-amber-100/80"
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Embassy Legalization / MOFA Routes</span>
            </button>
          </div>

          <span className="text-[11px] font-semibold text-slate-500">
            Showing <strong>{filteredCountries.length}</strong> supported
            destinations
          </span>
        </div>

        {/* Alphabetical A–Z Filter Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Browse Alphabetically (A–Z)
            </span>
            {(searchQuery ||
              selectedLetter !== "ALL" ||
              selectedContinent !== "All" ||
              selectedRouteType !== "all") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-[#0F766E] hover:text-[#0A192F] underline underline-offset-2 cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Alphabetical country filter"
            className="flex flex-wrap items-center gap-1"
          >
            <button
              type="button"
              onClick={() => setSelectedLetter("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedLetter === "ALL"
                  ? "bg-[#0A192F] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All ({activeCountryPool.length})
            </button>
            {ALPHABET.map((letter) => {
              const hasCountries = availableLetters.has(letter);
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!hasCountries}
                  onClick={() => setSelectedLetter(isSelected ? "ALL" : letter)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#0F766E] text-white shadow-2xs cursor-pointer"
                      : hasCountries
                      ? "bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-900 cursor-pointer"
                      : "bg-slate-50 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country Cards Grid */}
      {filteredCountries.length === 0 ? (
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <p className="text-sm font-bold text-slate-800">
            No matching country found in the current filter
          </p>
          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Reset the filters or message our documentation desk on WhatsApp to confirm the applicable MEA and diplomatic route for your destination country.
          </p>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-lg bg-[#0A192F] text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <a
              href={getWhatsAppUrl(
                `Hello ${BUSINESS_CONFIG.shortName}, I am searching for document legalization guidance for "${
                  searchQuery || "my destination country"
                }". Please confirm the applicable route.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Ask About This Country on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((country) => {
            const detailPath = `/countries/${country.canonicalSlug}`;
            const isApostille = country.isApostilleMember;
            const waText = `Hello ${BUSINESS_CONFIG.shortName}, I need document attestation / apostille guidance for ${country.name}. Please confirm the required procedure and documents.`;

            return (
              <article
                key={country.slug}
                onClick={() => onNavigate(detailPath)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate(detailPath);
                  }
                }}
                className="rounded-2xl border border-slate-200/90 hover:border-[#0F766E] active:border-[#0F766E] bg-white hover:bg-teal-50/15 active:bg-teal-50/40 shadow-xs hover:shadow-md active:scale-[0.985] transition-all duration-150 flex flex-col justify-between overflow-hidden group cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <a
                  href={detailPath}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate(detailPath);
                  }}
                  className="p-4 sm:p-5 space-y-3 flex-1 block text-left focus:outline-none"
                >
                  {/* Top Row: Flag + Route Distinction Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CountryFlag
                        isoCode={country.isoCode}
                        countryName={country.name}
                        size="md"
                        className="!w-11 !h-7.5 sm:!w-12 sm:!h-8 rounded-md shadow-2xs border border-slate-200/90"
                      />
                      <span className="text-[11px] font-semibold text-slate-500 truncate">
                        {country.continent}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                        isApostille
                          ? "bg-teal-50 text-[#0F766E] border-teal-200"
                          : "bg-amber-50/90 text-[#92600A] border-amber-200"
                      }`}
                    >
                      {isApostille ? "Hague Apostille" : "Embassy Legalization"}
                    </span>
                  </div>

                  {/* Country Name & Route Subtitle */}
                  <div>
                    <h3 className="text-base sm:text-[17px] font-extrabold text-[#0B2545] group-hover:text-[#0F766E] transition-colors font-display leading-snug flex items-center justify-between gap-2 break-normal hyphens-none">
                      <span>{country.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#0F766E] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </h3>
                    <span className="text-[11px] sm:text-xs font-bold text-[#0F766E] block mt-0.5 break-normal hyphens-none">
                      {country.routeBadge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {country.summary}
                  </p>

                  {/* Document Categories + Status */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {["Educational", "Personal", "Commercial", "Legal"].map(
                        (cat) => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]"
                          >
                            {cat}
                          </span>
                        )
                      )}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border shrink-0 ${getStatusBadgeClasses(
                        country.verificationStatus
                      )}`}
                    >
                      {country.verificationStatus ===
                      "Route requires confirmation" ? (
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                      )}
                      <span>{country.verificationStatus}</span>
                    </span>
                  </div>
                </a>

                {/* Card Footer: Prominent Button CTA + Pre-filled WhatsApp */}
                <div className="px-4 sm:px-5 py-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={detailPath}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNavigate(detailPath);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A192F] group-hover:bg-[#0F766E] group-active:bg-[#0F766E] text-white text-[11px] sm:text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>Open Country Guide</span>
                    <ArrowRight className="w-3 h-3 text-[#F3C969] group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </a>

                  <a
                    href={getWhatsAppUrl(waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-900 border border-emerald-200 text-xs font-bold transition-colors"
                    title={`Enquire on WhatsApp for ${country.name}`}
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Optional Reference Toggle for Additional Foreign Missions Requiring Case-by-Case Confirmation */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
        <div className="space-y-1">
          <span className="font-bold text-[#0A192F] flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span>
              Looking for a destination country not shown in the verified list?
            </span>
          </span>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            By default, only countries with verified Hague Apostille or established Embassy Legalization procedures are displayed above. Referencing the{" "}
            <a
              href={MEA_PROTOCOL_REFERENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0F766E] underline underline-offset-2"
            >
              MEA Protocol Division Directory
            </a>
            , you can also check countries requiring prior consular confirmation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowConfirmationCountries((prev) => !prev)}
          className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-[#0A192F] text-xs font-bold shrink-0 cursor-pointer transition-colors"
        >
          {showConfirmationCountries
            ? "Show Only Verified Supported Countries"
            : "Include Countries Requiring Confirmation"}
        </button>
      </div>

      {/* Bottom Internal Link Bar to Document Route Finder */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0A192F] text-white p-4 sm:p-5 rounded-xl">
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-bold text-white">
            Want to check step-by-step requirements by document type?
          </p>
          <p className="text-[11px] sm:text-xs text-slate-300">
            Use our interactive Document Route Finder or browse dedicated service pages for Apostille, Educational, Personal, and Commercial documents.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="/#route-finder"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/#route-finder");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0F766E] hover:bg-teal-600 text-white text-xs font-bold transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#D49B27]" />
            <span>Open Document Route Finder</span>
          </a>
        </div>
      </div>
    </section>
  );
};
