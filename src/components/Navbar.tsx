import { useTranslation } from "react-i18next";
import { Download, Globe, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[1rem] flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300 group-hover:scale-105">
            <Download size={20} className="sm:hidden" />
            <Download size={24} className="hidden sm:block" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-gradient">
            FB Videos Downloader
          </span>
        </motion.div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-semibold text-gray-400">
             <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
               <Shield size={16} className="text-purple-400" />
               <span>100% Secure</span>
             </div>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold shadow-sm"
          >
            <Globe size={16} className="text-blue-400" />
            <span className="uppercase">{i18n.language}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
