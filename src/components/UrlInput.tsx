import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link2, Search, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import api from "../lib/axios.ts";
import { isValidFacebookUrl, normalizeFacebookUrl } from "../lib/validation.ts";

interface UrlInputProps {
  onSuccess: (data: any) => void;
}

export default function UrlInput({ onSuccess }: UrlInputProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setError(null);

    // Normalize URL
    const targetUrl = normalizeFacebookUrl(url);
    
    // Frontend Validation
    if (!isValidFacebookUrl(targetUrl)) {
      setError(t("error_invalid_url"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/info", { url: targetUrl });
      onSuccess(response.data);
    } catch (err: any) {
      console.error("Download fetch error:", err);
      
      let message = t("error_invalid_url");
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          // If it's a string, it might be an HTML error page or a plain text error
          if (!err.response.data.includes("<!DOCTYPE html>")) {
             message = err.response.data;
          }
        } else if (err.response.data.error) {
          message = typeof err.response.data.error === 'string' 
            ? err.response.data.error 
            : JSON.stringify(err.response.data.error);
        }
      } else if (err.message) {
        message = err.message;
      }
      
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch (err) {
      console.warn("Failed to read clipboard:", err);
      // Optional: Show a subtle hint instead of alert
      setError("Cannot access clipboard. Please paste manually.");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-8">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-blue-400">
          <Link2 size={22} className="group-focus-within:text-blue-300 transition-colors" />
        </div>
        
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(null);
          }}
          placeholder={t("placeholder") as string}
          className="w-full h-14 sm:h-[4.5rem] pl-14 sm:pl-16 pr-24 sm:pr-40 rounded-[2.5rem] glass text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm sm:text-lg shadow-2xl hover:shadow-blue-500/10 focus:bg-white/5"
        />

        <div className="absolute inset-y-1.5 sm:inset-y-2 right-1.5 sm:right-2 flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="hidden md:flex px-5 h-full items-center justify-center rounded-[2rem] hover:bg-white/10 text-gray-300 hover:text-white transition-all text-sm font-semibold"
          >
            Paste
          </button>
          <button
            type="submit"
            disabled={isLoading || !url}
            className="h-full px-5 sm:px-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Search size={20} strokeWidth={2.5} />
                <span className="hidden sm:inline tracking-wide">{t("download")}</span>
              </>
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl text-sm"
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
