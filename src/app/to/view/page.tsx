"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Check, Copy, Music } from "lucide-react";
import { type ArrangedFlower } from "@/store/useBouquetStore";
import { WRAPS, FLOWERS } from "@/lib/flowers";
import Link from "next/link";

interface BouquetData {
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

function RecipientPageContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<BouquetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const isCreated = searchParams.get("created") === "true";

  interface Petal {
    x: string;
    scale: number;
    duration: number;
    delay: number;
    emoji: string;
  }
  const [petals, setPetals] = useState<Petal[]>([]);
  const [scale, setScale] = useState(1);

  // Responsive scale for the bouquet to match studio arrangement
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.65);
      else if (width < 1024) setScale(0.85);
      else setScale(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const newPetals = Array.from({ length: 12 }).map(() => ({
      x: `${Math.random() * 100}%`,
      scale: 0.5 + Math.random() * 0.5,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 10,
      emoji: ["🌸", "🌺", "🍃", "✿"][Math.floor(Math.random() * 4)]
    }));
    setPetals(newPetals);

    const encodedData = searchParams.get("d");
    if (!encodedData) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    try {
      // Decode the data
      const base64 = encodedData.replace(/ /g, "+");
      const decodedData = decodeURIComponent(atob(base64));
      const raw = JSON.parse(decodedData);

      // Reconstruct optimized format back to full interface
      const reconstructed: BouquetData = {
        flowers: (raw.f || []).map((item: { i: string; x: number; y: number; s: number; r: number; z: number }) => {
          const flowerBase = FLOWERS.find(fl => fl.id === item.i);
          if (!flowerBase) return null;
          return {
            instanceId: Math.random().toString(36),
            flower: flowerBase,
            x: item.x,
            y: item.y,
            scale: item.s,
            rotation: item.r,
            zIndex: item.z
          };
        }).filter(Boolean),
        message: raw.m || "",
        to: raw.t || "",
        from: raw.fr || "",
        song: { 
          url: raw.s?.u || "", 
          start: raw.s?.st || 0, 
          end: raw.s?.en || 0 
        },
        background: raw.b || "#FAF7F2",
        wrap: raw.w || "none",
        createdAt: new Date().toISOString()
      };

      setData(reconstructed);
      setNotFound(false);
    } catch (err) {
      console.error("Decoding error:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const handleOpen = () => {
    setRevealed(true);
  };

  const copyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
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

      {isClient && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {petals.map((petal, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -100, 
                x: petal.x, 
                rotate: 0, 
                opacity: 0,
                scale: petal.scale
              }}
              animate={{ 
                y: "110vh", 
                rotate: 720, 
                opacity: [0, 0.7, 0.7, 0] 
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                delay: petal.delay,
                ease: "linear"
              }}
              className="absolute text-xl"
            >
              <span className="opacity-40">{petal.emoji}</span>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!revealed ? (
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
                className="absolute top-8 bg-white/80 backdrop-blur-xl px-4 py-3 md:px-6 md:py-4 rounded-4xl shadow-2xl border border-white/40 flex items-center gap-4 z-50"
              >
                <div className="text-left">
                  <p className="font-display text-[#2C2420] italic text-lg leading-none">Bouquet Ready! 🎀</p>
                  <p className="text-[9px] text-[#A8B5A2] uppercase tracking-[0.2em] font-sans mt-1">Copy and send the URL</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 bg-[#C9848F] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-all hover:bg-[#2C2420] hover:scale-105 active:scale-95 shadow-lg shadow-[#C9848F]/20"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <Link
                    href="/support"
                    className="flex items-center gap-2 bg-[#8B2323] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#8B2323]/20"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    Support
                  </Link>
                </div>
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
                <motion.span className="text-[11px] font-sans font-bold tracking-[0.4em] uppercase text-[#A8B5A2]">Digital Delivery</motion.span>
                <h2 className="font-display text-5xl md:text-6xl text-[#2C2420] italic">A surprise for you</h2>
                {data.from && (
                  <motion.div className="flex items-center justify-center gap-3 text-[#2C2420]/40 font-sans italic">
                    <div className="w-8 h-px bg-current opacity-20" />
                    <span>From {data.from}</span>
                    <div className="w-8 h-px bg-current opacity-20" />
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={handleOpen}
                className="group relative flex items-center gap-4 mx-auto bg-[#2C2420] text-white px-12 py-6 rounded-full text-xl font-medium transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_25px_60px_-15px_rgba(44,36,32,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#C9848F] to-[#F2C4CE] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">Open Your Bouquet</span>
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="relative z-10">🌸</motion.div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full flex flex-col items-center pt-24 pb-32 px-4"
          >
             <div className="text-center mb-12 space-y-2">
                {data.to && (
                  <>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#A8B5A2] font-sans font-bold">Especially For</span>
                    <h1 className="font-display text-6xl md:text-8xl text-[#2C2420] italic leading-tight">{data.to}</h1>
                  </>
                )}
             </div>

            <div className="relative w-full flex items-center justify-center mb-16 h-[500px]">
              <motion.div
                initial={{ scale: scale * 0.9, y: 150, opacity: 0 }}
                animate={{ scale: scale, y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[500px] h-[500px] flex items-center justify-center"
              >
                {wrapData && wrapData.id !== 'none' && (
                  <>
                    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                      <Image src={wrapData.image} alt="Wrap Back" fill className="object-contain" priority />
                    </div>
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40" 
                      style={{ 
                        maskImage: 'linear-gradient(to top, black 40%, transparent 65%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 65%)'
                      }}>
                      <Image src={wrapData.image} alt="Wrap Front" fill className="object-contain" priority />
                    </div>
                  </>
                )}

                <div className="absolute inset-0 flex items-center justify-center z-2">
                  {data.flowers.sort((a,b) => (a.zIndex || 0) - (b.zIndex || 0)).map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, y: f.y + 100, x: f.x }}
                      animate={{ opacity: 1, scale: f.scale, y: f.y, x: f.x, rotate: f.rotation }}
                      transition={{ 
                        duration: 1.2, 
                        delay: 0.5 + (i * 0.1),
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      style={{ 
                        position: "absolute", 
                        left: "50%",
                        top: "50%",
                        zIndex: (f.zIndex || 10) + 10,
                        transformOrigin: "center center"
                      }}
                    >
                        <Image 
                          src={f.flower.image} 
                          alt={f.flower.name} 
                          width={180} 
                          height={220} 
                          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]" 
                        />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 1.2 }}
              className="w-full max-w-lg shadow-[0_40px_100px_-30px_rgba(44,36,32,0.12)] bg-[#FFFEF9] rounded-4xl p-12 md:p-16 text-center border border-white relative"
            >
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-[#F2C4CE] fill-[#F2C4CE]/20" />
                 </div>
                 <div className="space-y-6">
                    <p className="font-display text-3xl md:text-4xl text-[#2C2420] italic leading-[1.2]">&ldquo;{data.message}&rdquo;</p>
                    {data.from && <p className="text-xs text-[#A8B5A2] font-sans font-bold tracking-[0.3em] uppercase">From {data.from}</p>}
                 </div>
            </motion.div>

            {trackId && (
              <div className="mt-12 w-full max-w-sm bg-white/50 backdrop-blur-xl rounded-4xl p-6 flex items-center gap-5 border border-white/60 shadow-xl shadow-[#C9848F]/5 relative overflow-hidden group">
                   <div className="w-14 h-14 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#F2C4CE]">
                      <Music className="w-7 h-7 relative z-10 animate-pulse" />
                   </div>
                   <div className="flex-1 overflow-hidden font-sans">
                      <span className="text-[9px] text-[#A8B5A2] font-bold uppercase tracking-[0.2em] block mb-1">Musical Moment</span>
                      <p className="text-sm text-[#2C2420] font-semibold truncate">Hand-picked soundtrack</p>
                   </div>
                   <iframe ref={audioRef} src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&t=${data.song.start}&autoplay=1`} className="hidden" allow="autoplay" />
                   <a href={data.song.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C9848F] hover:bg-[#C9848F] hover:text-white transition-all">
                      <Share2 className="w-4 h-4" />
                   </a>
              </div>
            )}

            <div className="mt-24 text-center">
              <Link href="/" className="flex flex-col items-center gap-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-[#2C2420]/60 font-sans font-medium">Personalize Your Own</span>
                <span className="font-display italic text-3xl text-[#2C2420] opacity-80">petalé.</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`.font-display { font-family: var(--font-cormorant); } .font-sans { font-family: var(--font-dm-sans); }`}</style>
    </div>
  );
}

export default function RecipientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipientPageContent />
    </Suspense>
  );
}
