import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from "react";
import { motion } from "motion/react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">혁신적인 비포 & 애프터</h2>
          <p className="text-white/50 max-w-xl mx-auto">슬라이더를 조작하여 AI가 재창조한 고해상도 결과물을 직접 확인해보세요.</p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden glass cursor-ew-resize select-none"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* After Image (High Res) */}
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/seed/after/1920/1080" 
              alt="After AI Remastering"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full glass text-xs font-bold tracking-widest uppercase text-cyan-accent">
              After: AI Remastered
            </div>
          </div>

          {/* Before Image (Low Res) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src="https://picsum.photos/seed/before/1920/1080?blur=10" 
              alt="Original Photo"
              className="w-full h-full object-cover grayscale brightness-50"
              style={{ width: `${100 / (sliderPosition / 100)}%` }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full glass text-xs font-bold tracking-widest uppercase text-white/60">
              Before: Original
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/30 backdrop-blur-sm z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center neon-glow-gold border-2 border-white/20">
              <MoveHorizontal className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
