import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  isInline?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary caught an unhandled error]:", error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.isInline) {
        return (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center my-3">
            <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-xs sm:text-sm mb-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{this.props.fallbackTitle || "Unable to display this section temporarily"}</span>
            </div>
            <p className="text-[11px] text-amber-700/90 mb-3">
              This module experienced a temporary rendering issue under high traffic.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        );
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-8 bg-slate-50">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-800">
              <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Fatima Global Attestation • Service Guard
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0B2545] font-display">
                Temporary Rendering Glitch
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                We are experiencing high visitor volume. All document attestation and MEA apostille services remain fully active and running.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Section</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={getWhatsAppUrl("Hello Fatima Global Attestation, I encountered a temporary loading glitch on the website and would like assistance with my document.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>Need urgent assistance? Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
