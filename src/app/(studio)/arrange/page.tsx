"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowRight, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Layers,
  RotateCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBouquetStore, type ArrangedFlower } from "../../../store/useBouquetStore";
import { BACKGROUNDS, FLOWERS, arrangeInitialBouquet } from "@/lib/flowers";

export default function ArrangePage() {
  const router = useRouter();
  const { 
    selectedFlowers, 
    arrangedFlowers, 
    background, 
    addArrangedFlower,
    setArrangedFlowers,
    updateFlowerTransform,
    removeArrangedFlower,
    setBackground 
  } = useBouquetStore();


  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Responsive scale for the canvas
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.6);
      else if (width < 1024) setScale(0.8);
      else setScale(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedFlowers.length >= 3 && arrangedFlowers.length === 0) {
      const initial = arrangeInitialBouquet(selectedFlowers);
      setArrangedFlowers(initial);
    } else if (selectedFlowers.length < 3 && arrangedFlowers.length === 0) {
      router.replace("/flowers");
    }
  }, [selectedFlowers, arrangedFlowers, setArrangedFlowers, router]);

  const handleDragEnd = (id: string, info: any) => {
    const flower = arrangedFlowers.find(f => f.instanceId === id);
    if (!flower) return;
    
    // account for the responsive scale
    const deltaX = info.offset.x / scale;
    const deltaY = info.offset.y / scale;

    updateFlowerTransform(id, {
      x: flower.x + deltaX,
      y: flower.y + deltaY
    });
  };

  const adjustScale = (factor: number) => {
    if (!selectedInstanceId) return;
    const flower = arrangedFlowers.find(f => f.instanceId === selectedInstanceId);
    if (!flower) return;
    updateFlowerTransform(selectedInstanceId, { scale: Math.max(0.2, flower.scale * (1+factor)) });
  };

  const adjustRotate = (deg: number) => {
    if (!selectedInstanceId) return;
    const flower = arrangedFlowers.find(f => f.instanceId === selectedInstanceId);
    if (!flower) return;
    updateFlowerTransform(selectedInstanceId, { rotation: flower.rotation + deg });
  };

  const handleBringToFront = () => {
    if (!selectedInstanceId) return;
    const maxZ = Math.max(...arrangedFlowers.map(f => f.zIndex), 0);
    updateFlowerTransform(selectedInstanceId, { zIndex: maxZ + 1 });
  };

  const selectedFlower = arrangedFlowers.find(f => f.instanceId === selectedInstanceId);

  return (
    <main className="min-h-screen pt-24 pb-32 flex flex-col items-center">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 transition-colors duration-700 overflow-hidden" style={{ backgroundColor: background.startsWith('#') ? background : 'transparent' }}>
        {!background.startsWith('#') && (
          <Image 
            src={background} 
            alt="Background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-[#2C2420]/5 pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl px-4 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Floating Sidebar (Desktop) */}
        <div className="hidden lg:flex flex-col gap-6 w-80 shrink-0 sticky top-24">
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/40 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A8B5A2]">Canvas Settings</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setArrangedFlowers(arrangeInitialBouquet(selectedFlowers))}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2C4CE]/20 transition-all text-[#2C2420]/70 text-xs font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button 
                  onClick={() => router.push("/flowers")}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#A8B5A2]/20 transition-all text-[#2C2420]/70 text-xs font-medium"
                >
                  <Plus className="w-4 h-4" /> More
                </button>
              </div>
            </div>

            {/* Foliage Filler Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A8B5A2]">Foliage Filler</h3>
                <span className="text-[9px] text-[#A8B5A2] italic">Background greenery</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {FLOWERS.filter(f => f.tier === "foliage").map((foliage) => (
                  <button
                    key={foliage.id}
                    onClick={() => addArrangedFlower(foliage)}
                    className="aspect-square rounded-xl bg-[#FAF7F2] hover:bg-[#A8B5A2]/20 transition-all p-1.5 group relative"
                    title={foliage.name}
                  >
                    <Image 
                      src={foliage.image} 
                      alt={foliage.name} 
                      width={40} 
                      height={40} 
                      className="object-contain transition-transform group-hover:scale-110"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#A8B5A2] text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-2 h-2" />
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-[#2C2420]/30 italic leading-tight">
                Add soft watercolor greenery to frame and balance your bouquet. 
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A8B5A2]">Background</h3>
              <div className="grid grid-cols-3 gap-2">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.value)}
                    className={`h-10 rounded-xl transition-all border-2 overflow-hidden relative ${
                      background === bg.value ? "border-[#C9848F] scale-95" : "border-transparent opacity-80"
                    }`}
                  >
                    <div className="absolute inset-0" style={{ backgroundColor: bg.value }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Interactive Canvas */}
        <div className="flex-1 w-full bg-white/30 backdrop-blur-sm rounded-[3rem] border border-white/50 relative overflow-hidden h-[500px] md:h-[600px] shadow-inner">
           {/* Mobile Toolbar */}
           <div className="lg:hidden absolute top-4 left-4 right-4 z-30 flex justify-between items-center bg-white/60 backdrop-blur-md p-3 rounded-2xl border border-white/40">
              <button 
                 onClick={() => router.push("/flowers")}
                 className="flex items-center gap-2 text-xs font-medium text-[#2C2420]/70"
              >
                 <Plus className="w-4 h-4" /> Flowers
              </button>
              <div className="flex gap-2">
                <button 
                   onClick={() => setArrangedFlowers(arrangeInitialBouquet(selectedFlowers))}
                   className="p-2 rounded-xl bg-[#FAF7F2]"
                >
                   <RotateCcw className="w-4 h-4 text-[#2C2420]/70" />
                </button>
              </div>
           </div>

           <div 
             ref={containerRef}
             className="absolute inset-0 flex items-center justify-center touch-none"
             onClick={() => setSelectedInstanceId(null)}
           >
             <div 
                className="relative w-[500px] h-[500px]"
                style={{ transform: `scale(${scale})` }}
             >
                {/* Guide Text */}
                <p className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#2C2420]/30 font-sans whitespace-nowrap">
                   Drag to move • Tap to edit
                </p>

                {arrangedFlowers.map((f) => {
                  const isSelected = selectedInstanceId === f.instanceId;
                  return (
                    <motion.div
                      key={f.instanceId}
                      drag
                      dragMomentum={false}
                      onDragEnd={(e, info) => handleDragEnd(f.instanceId, info)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInstanceId(f.instanceId);
                      }}
                      whileDrag={{ scale: f.scale * 1.1, zIndex: 1000 }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        x: f.x,
                        y: f.y,
                        rotate: f.rotation,
                        scale: f.scale,
                        zIndex: isSelected ? 999 : f.zIndex,
                        cursor: "grab",
                        transformOrigin: "center center"
                      }}
                    >
                      {/* On-Canvas Controls (Only visible when selected) */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#2C2420] p-1.5 rounded-full z-50 shadow-2xl scale-[calc(1/var(--scale))]"
                            style={{ "--scale": scale } as any}
                          >
                             <button onClick={(e) => { e.stopPropagation(); adjustScale(0.1); }} className="p-1.5 hover:bg-white/20 rounded-full text-white"><Maximize2 className="w-3.5 h-3.5" /></button>
                             <button onClick={(e) => { e.stopPropagation(); adjustScale(-0.1); }} className="p-1.5 hover:bg-white/20 rounded-full text-white"><Minimize2 className="w-3.5 h-3.5" /></button>
                             <button onClick={(e) => { e.stopPropagation(); adjustRotate(-15); }} className="p-1.5 hover:bg-white/20 rounded-full text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
                             <button onClick={(e) => { e.stopPropagation(); adjustRotate(15); }} className="p-1.5 hover:bg-white/20 rounded-full text-white"><RotateCw className="w-4 h-4 text-white" /></button>
                             <button onClick={(e) => { e.stopPropagation(); handleBringToFront(); }} className="p-1.5 hover:bg-white/20 rounded-full text-white"><Layers className="w-3.5 h-3.5" /></button>
                             <div className="w-px h-4 bg-white/10 mx-1" />
                             <button onClick={(e) => { e.stopPropagation(); removeArrangedFlower(f.instanceId); setSelectedInstanceId(null); }} className="p-1.5 hover:bg-red-500 rounded-full text-white"><Trash2 className="w-3.5 h-3.5" /></button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className={`relative ${isSelected ? 'after:content-[""] after:absolute after:-inset-4 after:border-2 after:border-dashed after:border-[#C9848F]/50 after:rounded-[2rem]' : ''}`}>
                        <Image
                          src={f.flower.image}
                          alt={f.flower.name}
                          width={180}
                          height={220}
                          className="object-contain pointer-events-none drop-shadow-md"
                          priority
                        />
                      </div>
                    </motion.div>
                  );
                })}

                {/* Stems (Always back) */}
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 pointer-events-none opacity-30 z-0">
                  <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                    <path d="M40 0 Q60 50 60 100" stroke="#7a9e7e" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M60 0 Q60 50 60 100" stroke="#6b8f6b" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M80 0 Q60 50 60 100" stroke="#7a9e7e" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </div>
             </div>
           </div>
        </div>

        {/* Mobile Background Selection (Bottom) */}
        <div className="lg:hidden w-full space-y-4 pt-4">
           <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A8B5A2] text-center">Background</p>
           <div className="flex justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setBackground(bg.value)}
                  className={`min-w-[4rem] h-12 rounded-xl border-2 overflow-hidden relative ${
                    background === bg.value ? "border-[#C9848F]" : "border-transparent"
                  }`}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: bg.value }} />
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Sticky Bottom Finalization */}
      <div className="fixed bottom-8 left-4 right-4 z-50 md:left-auto md:right-auto">
        <div className="max-w-md mx-auto bg-[#2C2420] text-white rounded-full p-2 pr-2 pl-8 shadow-2xl backdrop-blur-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-sans">Bouquet</span>
            <span className="text-sm font-display italic leading-none">{arrangedFlowers.length} Blooms</span>
          </div>
          <button 
            onClick={() => router.push("/message")}
            className="flex items-center gap-4 bg-[#C9848F] px-8 py-3.5 rounded-full font-medium hover:bg-white hover:text-[#C9848F] transition-all duration-300 group shadow-lg"
          >
            Add a Note
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
