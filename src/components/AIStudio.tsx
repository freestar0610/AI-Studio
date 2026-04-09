import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Sparkles, CheckCircle2, RefreshCw, Download, Image as ImageIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

type StudioState = "idle" | "uploading" | "processing" | "completed";

export default function AIStudio() {
  const [state, setState] = useState<StudioState>("idle");
  const [progress, setProgress] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("Professional");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const themes = [
    { name: "Professional", icon: "💼" },
    { name: "Daily", icon: "✨" },
    { name: "Family", icon: "🏠" },
    { name: "Editorial", icon: "📸" },
  ];

  const handleUpload = () => {
    setState("uploading");
    setTimeout(() => {
      setState("processing");
      simulateProcessing();
    }, 1500);
  };

  const simulateProcessing = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setState("completed"), 500);
      }
      setProgress(p);
    }, 400);
  };

  const reset = () => {
    setState("idle");
    setProgress(0);
  };

  return (
    <section id="studio" className="py-24 bg-[#0B1120] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2 tracking-tight">AI Studio Workspace</h2>
              <p className="text-white/50">사진 한 장으로 시작되는 프리미엄 리마스터링</p>
            </div>
            
            <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setSelectedTheme(theme.name)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    selectedTheme === theme.name 
                      ? "bg-gold text-midnight neon-glow-gold" 
                      : "text-white/40 hover:text-white/70"
                  )}
                >
                  <span className="mr-2">{theme.icon}</span>
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden glass border-2 border-white/5">
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">사진 업로드</h3>
                  <p className="text-white/40 mb-8 max-w-sm">
                    드래그 앤 드롭하거나 클릭하여 사진을 선택하세요.<br />
                    (JPG, PNG / 최대 10MB)
                  </p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 rounded-full bg-white text-midnight font-bold hover:bg-gold hover:text-midnight transition-all active:scale-95"
                  >
                    파일 선택하기
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleUpload}
                    accept="image/*"
                  />
                </motion.div>
              )}

              {state === "uploading" && (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <RefreshCw className="w-12 h-12 text-gold animate-spin mb-4" />
                  <p className="text-lg font-medium animate-pulse">사진 업로드 중...</p>
                </motion.div>
              )}

              {state === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12"
                >
                  {/* 3D Scan Animation Simulation */}
                  <div className="relative w-64 h-80 rounded-2xl overflow-hidden mb-8 border border-white/10">
                    <img 
                      src="https://picsum.photos/seed/scan/400/600" 
                      alt="Scanning" 
                      className="w-full h-full object-cover opacity-50 grayscale"
                      referrerPolicy="no-referrer"
                    />
                    <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-cyan-accent neon-glow-cyan z-10 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-accent/10 via-transparent to-cyan-accent/10" />
                  </div>
                  
                  <div className="w-full max-md:px-4 max-w-md">
                    <div className="flex justify-between mb-2 text-sm font-medium">
                      <span className="text-gold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI 엔진 분석 중...
                      </span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-gold to-gold-light"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {state === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 p-8 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">생성 완료!</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={reset}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        title="다시 하기"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gold text-midnight hover:bg-gold-light transition-all font-bold">
                        <Download className="w-5 h-5" />
                        전체 다운로드
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10"
                      >
                        <img 
                          src={`https://picsum.photos/seed/result-${i}/400/600`} 
                          alt={`Result ${i}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <button className="w-full py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold hover:bg-white/30 transition-all">
                            고해상도 리마스터링
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
