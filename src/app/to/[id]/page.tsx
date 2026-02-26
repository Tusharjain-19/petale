"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Check, Copy, Music, Sparkles } from "lucide-react";
import { type ArrangedFlower } from "@/store/useBouquetStore";
import { WRAPS } from "@/lib/flowers";
import Link from "next/link";

interface BouquetData {
  id: string;
  flowers: ArrangedFlower[];
  message: string;
  to: string;
  from: string;
  song: { url: string; start: number; end: number };
  background: string;
  wrap?: string;
  createdAt: string;
}

function extractSpotifyTrackId(url: string): string | null {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export default function RecipientPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [data, setData] = useState<BouquetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const isCreated = searchParams.get("created") === "true";

  useEffect(() => {
    setIsClient(true);
    if (!params?.id) return;
    
    fetch(`/api/create?id=${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((d) => setData(d))
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [params?.id]);

  const handleOpen = () => {
    setRevealed(true);
  };

  const copyLink = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href.split("?")[0];
    navigator.clipboard.writeText(url || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 border-2 border-[#C9848F] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#FAF7F2]">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl"
        >
          🍂
        </motion.span>
        <div className="space-y-2">
          <h1 className="font-display text-5xl text-[#2C2420] italic">This bouquet has wilted.</h1>
          <p className="text-[#2C2420]/50 font-sans max-w-xs mx-auto">The link you&apos;re looking for doesn&apos;t exist or has expired.</p>
        </div>
        <Link href="/" className="mt-4 px-8 py-3 bg-[#C9848F] text-white rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg">
          Return Home
        </Link>
      </div>
    );
  }

  const trackId = extractSpotifyTrackId(data.song?.url ?? "");
  const wrapData = WRAPS.find(w => w.id === data.wrap);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center bg-[#FAF7F2]">
      {/* Background Color/Image Layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 -z-10 transition-colors duration-1000" 
        style={{ backgroundColor: data.background.startsWith('#') ? data.background : 'transparent' }}
      >
        {!data.background.startsWith('#') && (
          <Image 
            src={data.background} 
            alt="Background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-[#2C2420]/5 pointer-events-none" />
      </motion.div>

      {/* ── Falling Petals (Client Only) ── */}
      {isClient && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -100, 
                x: `${Math.random() * 100}%`, 
                rotate: 0, 
                opacity: 0,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{ 
                y: "110vh", 
                rotate: 720, 
                opacity: [0, 0.7, 0.7, 0] 
              }}
              transition={{
                duration: 7 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
              className="absolute text-xl"
            >
              <span className="opacity-40">
                {["🌸", "🌺", "🍃", "✿"][Math.floor(Math.random() * 4)]}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!revealed ? (
          // ── SCREEN 1: THE GIFT BOX / ENVELOPE FEEL ──
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center w-full"
          >
            {isCreated && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-8 bg-white/80 backdrop-blur-xl px-4 py-3 md:px-6 md:py-4 rounded-[2rem] shadow-2xl border border-white/40 flex items-center gap-4 z-50"
              >
                <div className="text-left">
                  <p className="font-display text-[#2C2420] italic text-lg leading-none">Bouquet Ready! 🎀</p>
                  <p className="text-[9px] text-[#A8B5A2] uppercase tracking-[0.2em] font-sans mt-1">Copy and send the URL</p>
                </div>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 bg-[#C9848F] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-all hover:bg-[#2C2420] hover:scale-105 active:scale-95 shadow-lg shadow-[#C9848F]/20"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </motion.div>
            )}

            <div className="space-y-12 max-w-md w-full">
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1],
                  rotate: [-2, 2, -2]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="text-9xl drop-shadow-[0_20px_50px_rgba(201,132,143,0.3)]"
              >
                💌
              </motion.div>
              
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.5 }}
                  className="text-[11px] font-sans font-bold tracking-[0.4em] uppercase text-[#A8B5A2]"
                >
                  Digital Delivery
                </motion.span>
                <h2 className="font-display text-5xl md:text-6xl text-[#2C2420] italic">A surprise for you</h2>
                {data.from && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-3 text-[#2C2420]/40 font-sans"
                  >
                    <div className="w-8 h-px bg-current opacity-20" />
                    <span className="italic">From {data.from}</span>
                    <div className="w-8 h-px bg-current opacity-20" />
                  </motion.div>
                )}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                onClick={handleOpen}
                className="group relative flex items-center gap-4 mx-auto bg-[#2C2420] text-white px-12 py-6 rounded-full text-xl font-medium transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_25px_60px_-15px_rgba(44,36,32,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9848F] to-[#F2C4CE] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">Open Your Bouquet</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10"
                >
                  🌸
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // ── SCREEN 2: THE REVEAL ──
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full flex flex-col items-center pt-24 pb-32 px-4"
          >
             {/* Header */}
             <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="text-center mb-12 space-y-2"
             >
                {data.to && (
                  <>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#A8B5A2] font-sans font-bold">Especially For</span>
                    <h1 className="font-display text-6xl md:text-8xl text-[#2C2420] italic leading-tight">{data.to}</h1>
                  </>
                )}
             </motion.div>

            {/* The Main Artistic Composition */}
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mb-16 px-6">
              <motion.div
                initial={{ scale: 0.9, y: 150, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Bouquet Wrap */}
                <AnimatePresence>
                  {wrapData && wrapData.id !== 'none' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.15 }}
                      transition={{ delay: 1.2, duration: 1.5 }}
                      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
                    >
                      <Image 
                        src={wrapData.image} 
                        alt="Wrap" 
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stems Layer */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 15 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1] w-48 h-48 opacity-70"
                >
                  <Image src="/stems-watercolor.png" alt="Stems" fill className="object-contain" />
                </motion.div>

                {/* Flowers Layer */}
                <div className="absolute inset-0 flex items-center justify-center z-[2]">
                  {data.flowers.map((f, i) => (
                    <motion.div
                      key={`${f.flower.id}-${i}`}
                      initial={{ opacity: 0, scale: 0, y: 100, rotate: f.rotation - 10 }}
                      animate={{ opacity: 1, scale: f.scale, y: f.y, rotate: f.rotation }}
                      transition={{
                        delay: 1.5 + i * 0.1,
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        x: f.x,
                        y: f.y,
                        zIndex: (f.zIndex || 10) + 10,
                      }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -8, 0],
                          rotate: [f.rotation, f.rotation + 1.5, f.rotation - 1.5, f.rotation]
                        }}
                        transition={{
                          duration: 4 + i * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={f.flower.image}
                          alt={f.flower.name}
                          width={150}
                          height={180}
                          className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Message Display */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1.2 }}
              className="w-full max-w-lg shadow-[0_40px_100px_-30px_rgba(44,36,32,0.12)] rounded-[3rem]"
            >
              <div className="bg-[#FFFEF9] rounded-[3rem] p-12 md:p-16 text-center space-y-10 border border-white relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-[#F2C4CE] fill-[#F2C4CE]/20" />
                 </div>
                 
                 <div className="space-y-6">
                    <p className="font-display text-3xl md:text-4xl text-[#2C2420] italic leading-[1.2]">
                      &ldquo;{data.message}&rdquo;
                    </p>
                    {data.from && (
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-10 h-px bg-[#F2C4CE]/40" />
                         <p className="text-xs text-[#A8B5A2] font-sans font-bold tracking-[0.3em] uppercase">{data.from}</p>
                      </div>
                    )}
                 </div>
              </div>
            </motion.div>

            {/* Music Integration */}
            {trackId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4, duration: 1 }}
                className="mt-12 w-full max-w-sm"
              >
                <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-6 flex items-center gap-5 border border-white/60 shadow-xl shadow-[#C9848F]/5">
                   <div className="w-14 h-14 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#F2C4CE] shadow-inner relative overflow-hidden group">
                      <Music className="w-7 h-7 relative z-10 animate-pulse" />
                      <motion.div 
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white"
                      />
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-3 h-3 text-[#C9848F]" />
                        <span className="text-[9px] text-[#A8B5A2] font-sans font-bold uppercase tracking-[0.2em]">Musical Moment</span>
                      </div>
                      <p className="text-sm text-[#2C2420] font-sans font-semibold truncate leading-tight">Hand-picked soundtrack</p>
                   </div>
                   
                   {/* Spotify Hidden Autoplay */}
                   <div className="hidden">
                      <iframe
                        ref={audioRef}
                        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&t=${data.song.start}`}
                        width="0"
                        height="0"
                        allow="autoplay; encrypted-media"
                      />
                   </div>
                   
                   <a 
                      href={data.song.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C9848F] hover:bg-[#C9848F] hover:text-white transition-all shadow-sm"
                   >
                      <Share2 className="w-4 h-4" />
                   </a>
                </div>
              </motion.div>
            )}

            {/* Branding Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 6 }}
              className="mt-24 text-center group transition-opacity hover:opacity-100"
            >
              <Link href="/" className="flex flex-col items-center gap-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-[#2C2420]/60 font-sans font-medium hover:text-[#C9848F] transition-colors">Personalize Your Own</span>
                <span className="font-display italic text-3xl text-[#2C2420] opacity-80 group-hover:scale-110 transition-transform">petalé.</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .font-display { font-family: var(--font-cormorant); }
        .font-sans { font-family: var(--font-dm-sans); }
      `}</style>
    </div>
  );
}
