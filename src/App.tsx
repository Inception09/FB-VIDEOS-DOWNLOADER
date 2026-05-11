import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./i18n/config.ts";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import UrlInput from "./components/UrlInput.tsx";
import ResultCard from "./components/ResultCard.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  const [videoData, setVideoData] = useState<any>(null);

  return (
    <>
      <div className="bg-animated-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className="min-h-screen text-gray-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200 overflow-x-hidden relative z-10">
        <Navbar />
        
        <main className="flex-1 relative">
          <Hero />
          
          <div className="container mx-auto px-4 -mt-12 sm:-mt-20 relative z-20 box-border">
            <div className="max-w-4xl mx-auto">
              <UrlInput onSuccess={(data) => setVideoData(data)} />
              
              <AnimatePresence mode="wait">
                {videoData && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="mt-8"
                  >
                    <ResultCard data={videoData} />
                  </motion.div>
                )}

                {!videoData && (
                  <motion.div 
                    key="features"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-12 sm:pb-20"
                  >
                    <div className="p-8 rounded-[2rem] glass hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] group">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Lightning Fast</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">We use the latest extraction engines to fetch your videos in seconds without any delays.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] glass hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] group">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all duration-300">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-1.382-3.016z" /></svg>
                      </div>
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Secure & Private</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Your data and downloads are never stored. Privacy is our absolute top priority.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] glass hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.3)] group">
                      <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 group-hover:bg-pink-500/30 transition-all duration-300">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </div>
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Any Quality</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Whether it's 1080p, HD, or basic SD, we support all major video resolutions.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

