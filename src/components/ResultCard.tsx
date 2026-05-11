import { useTranslation } from "react-i18next";
import { Download, Clock, User, ExternalLink, HardDrive } from "lucide-react";
import { motion } from "motion/react";
import api from "../lib/axios.ts";
import { useState } from "react";

interface Format {
  format_id: string;
  ext: string;
  resolution: string;
  filesize?: number;
  url?: string;
  is_split?: boolean;
}

interface ResultCardProps {
  data: {
    id: string;
    title: string;
    thumbnail: string;
    duration: number;
    uploader: string;
    formats: Format[];
    webpage_url: string;
  };
}

export default function ResultCard({ data }: ResultCardProps) {
  const { t } = useTranslation();
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const formatSize = (bytes?: number) => {
    if (!bytes) return "N/A";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = async (format: Format) => {
    const formatId = format.format_id;
    setDownloadingFormat(formatId);
    try {
      let downloadUrl = format.url;

      if (!downloadUrl) {
        const response = await api.post("/download", { 
          url: data.webpage_url, 
          formatId 
        });
        downloadUrl = response.data.downloadUrl;
      }

      if (!downloadUrl) throw new Error("Could not get download URL");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${data.title || 'video'}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
      alert(t("error_download"));
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto mt-8 sm:mt-12 mb-12 sm:mb-20 px-2 sm:px-0"
    >
      <div className="glass-card rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-5 gap-0 min-w-0 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />
        
        {/* Left: Thumbnail & Info */}
        <div className="lg:col-span-2 relative aspect-video lg:aspect-auto min-w-0 overflow-hidden group">
          <img 
            src={data.thumbnail} 
            alt={data.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent flex flex-col justify-end p-6 sm:p-8 transition-all" />
          
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            <h3 className="text-white font-extrabold text-xl sm:text-2xl line-clamp-3 mb-3 leading-tight tracking-tight drop-shadow-lg">{data.title}</h3>
            <div className="flex items-center gap-4 text-gray-300 text-sm font-medium">
              <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl border border-white/10 shadow-lg backdrop-blur-md">
                <Clock size={16} className="text-blue-400" />
                <span>{formatDuration(data.duration)}</span>
              </div>
              <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl border border-white/10 shadow-lg backdrop-blur-md max-w-[150px]">
                <User size={16} className="text-purple-400 shrink-0" />
                <span className="truncate">{data.uploader}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Formats Content */}
        <div className="lg:col-span-3 p-6 sm:p-10 flex flex-col min-w-0 bg-[#0f172a]/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
             <h4 className="text-white font-bold text-lg sm:text-xl flex items-center gap-3 tracking-wide truncate">
               <span className="p-2 bg-blue-500/20 rounded-xl text-blue-400"><Download size={20} /></span>
               Select Quality
             </h4>
             <a 
               href={data.webpage_url} 
               target="_blank" 
               rel="noreferrer"
               className="text-gray-400 hover:text-white transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-xl glass hover:bg-white/10 shrink-0 border border-white/5"
             >
               View Original <ExternalLink size={14} />
             </a>
          </div>

          <div className="flex-1 space-y-4">
            {data.formats.map((f, i) => (
              <div 
                key={f.format_id + i} 
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 gap-4 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="w-12 h-12 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-white font-bold text-sm border border-white/10 group-hover:scale-110 transition-transform">
                    {f.ext.toUpperCase()}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
                      {f.resolution.includes('🔥') ? (
                        <span className="text-gradient font-extrabold">{f.resolution}</span>
                      ) : (
                        f.resolution
                      )}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1.5 font-medium mt-0.5">
                      <HardDrive size={14} className="text-gray-500" />
                      {formatSize(f.filesize)}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDownload(f)}
                  disabled={downloadingFormat === f.format_id}
                  className="w-full sm:w-auto flex-shrink-0 px-6 py-3.5 rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold tracking-wide transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2"
                >
                  {downloadingFormat === f.format_id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Download
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
