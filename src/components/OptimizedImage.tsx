import React, { useState } from "react";

export interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading" | "decoding"> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  /** When true, loads eagerly with high fetchPriority (for above-the-fold LCP images) */
  priority?: boolean;
  /** Responsive image sizes hint for browser resource selection */
  sizes?: string;
  /** Optional low-quality image placeholder or skeleton shimmer */
  showSkeleton?: boolean;
  decoding?: "async" | "sync" | "auto";
  loading?: "lazy" | "eager";
}

/**
 * Production-grade responsive image component adhering to modern Web Vitals standards:
 * - Off-main-thread decoding (decoding="async")
 * - Native lazy-loading for below-the-fold media
 * - High-priority eager fetch for LCP (Largest Contentful Paint) targets
 * - Smooth skeleton shimmer to eliminate Cumulative Layout Shift (CLS)
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  showSkeleton = true,
  decoding = "async",
  loading,
  style,
  onLoad,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const effectiveLoading: "lazy" | "eager" =
    loading ?? (priority ? "eager" : "lazy");

  const effectiveFetchPriority: "high" | "low" | "auto" = priority
    ? "high"
    : "auto";

  return (
    <div
      className={`relative inline-block overflow-hidden ${
        width || height ? "" : "w-full"
      }`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {/* Lightweight skeleton shimmer before image settles */}
      {showSkeleton && !isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-slate-200/70 animate-pulse rounded-[inherit]"
        />
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={effectiveLoading}
        decoding={decoding}
        fetchPriority={effectiveFetchPriority}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        className={`${className} ${
          showSkeleton
            ? `transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`
            : ""
        }`}
        style={style}
        {...rest}
      />
    </div>
  );
};
