import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { PlayCircle } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="pt-20 sm:pt-32 pb-8 sm:pb-12 text-center px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/20 blur-[120px] -z-10 rounded-full" />
      <div className="absolute -top-24 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <span>Created by ❤️ Professor Imamul Islam & Inception</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tighter sm:whitespace-nowrap">
          {t("hero_title")}
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-lg md:text-xl leading-relaxed px-4">
          {t("hero_subtitle")}
        </p>
      </motion.div>
    </div>
  );
}
