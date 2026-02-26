"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check, Heart, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBouquetStore } from "@/store/useBouquetStore";
import { FLOWERS } from "@/lib/flowers";

export default function FlowersPage() {
  const router = useRouter();
  const { selectedFlowers, addFlower, removeFlower } = useBouquetStore();
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFlowers = useMemo(() => {
    return FLOWERS.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getCount = (id: string) => selectedFlowers.filter((f) => f.id === id).length;

  return (
    <main className="min-h-screen px-4 md:px-8 pt-28 pb-32 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-[#F2C4CE]/20 px-4 py-1.5 rounded-full text-[#C9848F] text-xs font-semibold tracking-widest uppercase mb-2 font-display">
          Step 01
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-[#2C2420] italic leading-tight">Pick Your Blooms</h1>
        <p className="text-[#2C2420]/50 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
          Select your favorites. You can add the same flower multiple times <br className="hidden md:block"/> to create a lush, full bouquet.
        </p>
      </motion.div>

      {/* Search (Optional but nice) */}
      <div className="max-w-md mx-auto mb-12">
        <input 
          type="text"
          placeholder="Search by name or meaning..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/50 backdrop-blur-md border border-[#2C2420]/10 rounded-2xl px-6 py-4 text-[#2C2420] placeholder-[#2C2420]/30 focus:outline-none focus:border-[#C9848F] transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filteredFlowers.map((flower, idx) => {
          const count = getCount(flower.id);
          const active = count > 0;
          return (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`group relative rounded-[2.5rem] transition-all duration-500 overflow-hidden ${
                active 
                   ? "bg-white ring-2 ring-[#C9848F] shadow-xl" 
                   : "bg-white/40 hover:bg-white hover:shadow-lg border border-white/60"
              }`}
            >
              {/* Count Badge */}
              <AnimatePresence shadow-sm>
                {active && (
                  <motion.div
                    initial={{ scale: 0, x: 10 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 10 }}
                    className="absolute top-4 right-4 z-20 bg-[#C9848F] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg"
                  >
                    x{count}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Container */}
              <div 
                className="aspect-[4/5] relative p-6 md:p-8 flex items-center justify-center cursor-pointer"
                onClick={() => addFlower(flower)}
              >
                <div 
                   className="absolute inset-0 opacity-10 blur-3xl rounded-full"
                   style={{ backgroundColor: flower.swatchColor }}
                />
                <motion.div
                  animate={active ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10"
                >
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    width={180}
                    height={180}
                    className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                    priority={idx < 4}
                  />
                </motion.div>
              </div>

              {/* Quick Actions (Add/Remove) */}
              <div className="px-6 pb-6 pt-2 space-y-4">
                <div className="text-center" onClick={() => addFlower(flower)}>
                  <h3 className="font-display text-xl md:text-2xl text-[#2C2420] italic leading-none mb-1 cursor-pointer">{flower.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8B5A2] font-semibold mb-2">{flower.color}</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFlower(flower.id); }}
                    disabled={count === 0}
                    className={`p-2 rounded-full transition-all ${count > 0 ? 'bg-[#FAF7F2] text-[#2C2420] hover:bg-red-50 hover:text-red-500' : 'text-transparent cursor-default'}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addFlower(flower); }}
                    className="p-2 rounded-full bg-[#FAF7F2] text-[#2C2420] hover:bg-[#F2C4CE]/20 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF7F2]/50 rounded-full w-fit mx-auto">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: flower.swatchColor }} />
                   <p className="text-[9px] text-[#2C2420]/40 font-medium italic">{flower.meaning}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {selectedFlowers.length >= 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-8 left-0 right-0 z-50 px-4"
          >
            <div className="max-w-md mx-auto bg-[#2C2420] text-white rounded-full p-2 pr-2 pl-6 shadow-2xl backdrop-blur-md flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="relative">
                    <Heart className={`w-6 h-6 ${selectedFlowers.length >= 3 ? 'text-[#C9848F] fill-[#C9848F]' : 'text-white/20'}`} />
                    {selectedFlowers.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#C9848F] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {selectedFlowers.length}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-white/40">Bouquet</p>
                    <p className="text-sm font-display italic">
                      {selectedFlowers.length < 3 
                        ? `Add ${3 - selectedFlowers.length} more` 
                        : "Ready to arrange"
                      }
                    </p>
                  </div>
               </div>
               
               <button
                 onClick={() => router.push("/arrange")}
                 disabled={selectedFlowers.length < 3}
                 className={`flex items-center gap-3 px-6 sm:px-10 py-3 rounded-full font-medium transition-all duration-300 group ${
                   selectedFlowers.length >= 3 
                     ? "bg-[#C9848F] hover:bg-white hover:text-[#C9848F]" 
                     : "bg-white/10 text-white/20 cursor-not-allowed opacity-50"
                 }`}
               >
                 Arrange
                 <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedFlowers.length >= 3 ? '' : 'hidden'}`} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
