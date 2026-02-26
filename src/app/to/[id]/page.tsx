"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Check, Copy, ArrowLeft, Music } from "lucide-react";
import { type ArrangedFlower } from "@/store/useBouquetStore";
import Link from "next/link";

interface BouquetData {
  id: string;
  flowers: ArrangedFlower[];
  message: string;
  to: string;
  from: string;
  song: { url: string; start: number; end: number };
  background: string;
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
  const [petalsActive, setPetalsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const isCreated = searchParams.get("created") === "true";

  useEffect(() => {
    if (!params?.id) return;
    setPetalsActive(true);
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
    const url = window.location.href.split("?")[0];
    navigator.clipboard.writeText(url || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#C9848F] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-[#FAF7F2]">
        <span className="text-5xl">🍂</span>
        <h1 className="font-display text-4xl text-[#2C2420] italic">This bouquet has wilted.</h1>
        <p className="text-[#2C2420]/50 font-sans">The link you're looking for doesn't exist or has expired.</p>
        <Link href="/" className="mt-4 text-[#C9848F] hover:underline">Return Home</Link>
      </div>
    );
  }

  const trackId = extractSpotifyTrackId(data.song?.url ?? "");

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center"
    >
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 transition-colors duration-700" style={{ backgroundColor: data.background.startsWith('#') ? data.background : 'transparent' }}>
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
      </div>

      {/* ── Background Petals (Persistent) ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {petalsActive && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -100, 
              x: Math.random() * 100 + "%", 
              rotate: 0, 
              opacity: 0 
            }}
            animate={{ 
              y: "110vh", 
              rotate: 720, 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-2xl"
          >
            {["🌸", "🌺", "🍃", "✿"][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          // ── STEP 1: LANDING SCREEN ──
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
          >
            {/* Creator Sharing Banner */}
            {isCreated && (
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="absolute top-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-[#F2C4CE]/30 flex items-center gap-4"
              >
                <div className="text-left">
                  <p className="font-display text-[#2C2420] italic">Bouquet Ready! 🎀</p>
                  <p className="text-[10px] text-[#A8B5A2] uppercase tracking-widest font-sans">Share this link with them</p>
                </div>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 bg-[#C9848F] text-white px-4 py-2 rounded-full text-xs transition-all hover:bg-[#2C2420]"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </motion.div>
            )}

            <div className="space-y-10 max-w-sm">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl"
              >
                🎀
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="font-display text-4xl text-[#2C2420] italic">You have a gift</h2>
                {data.from && (
                  <p className="text-[#2C2420]/50 font-sans tracking-wide">From {data.from}</p>
                )}
              </div>

              <button
                onClick={handleOpen}
                className="group relative flex items-center gap-3 mx-auto bg-[#C9848F] text-white px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 hover:bg-[#2C2420] shadow-[0_15px_45px_-12px_rgba(201,132,143,0.6)]"
              >
                Open Your Bouquet
                <motion.span
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                >
                  🌸
                </motion.span>
              </button>
            </div>
          </motion.div>
        ) : (
          // ── STEP 2 & 3: REVEAL & MAIN VIEW ──
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full flex flex-col items-center pt-12 pb-24 px-4"
          >
             {/* Header */}
             <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
             >
                {data.to && (
                  <>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8B5A2] font-sans mb-1">Especially For</p>
                    <h1 className="font-display text-5xl text-[#2C2420] italic">{data.to}</h1>
                  </>
                )}
             </motion.div>

            {/* The Bouquet */}
            <motion.div
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              className="relative w-[340px] h-[400px] md:w-[500px] md:h-[500px] mb-12"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {data.flowers.map((f, i) => {
                  return (
                    <motion.div
                      key={`${f.flower.id}-${i}`}
                      initial={{ opacity: 0, scale: 0, y: 40 }}
                      animate={{ opacity: 1, scale: f.scale, y: f.y }}
                      transition={{
                        delay: 0.8 + i * 0.12,
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        x: f.x,
                        y: f.y,
                        rotate: f.rotation,
                        zIndex: f.zIndex,
                      }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [f.rotation, f.rotation + 2, f.rotation - 2, f.rotation]
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={f.flower.image}
                          alt={f.flower.name}
                          width={140}
                          height={165}
                          className="object-contain drop-shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stems & Ribbon */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-60"
              >
                <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
                  <path d="M48 20 Q70 60 70 100" stroke="#7a9e7e" strokeWidth="4" />
                  <path d="M70 15 Q70 55 70 100" stroke="#6b8f6b" strokeWidth="5" />
                  <path d="M92 20 Q70 60 70 100" stroke="#7a9e7e" strokeWidth="4" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Message Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="w-full max-w-md bg-[#FFFEF9] rounded-[2.5rem] shadow-[0_40px_100px_-30px_rgba(44,36,32,0.15)] p-10 text-center space-y-6"
            >
               <div className="w-12 h-1 bg-[#F2C4CE]/30 mx-auto rounded-full" />
              <blockquote className="font-display text-2xl md:text-3xl text-[#2C2420] italic leading-tight">
                &ldquo;{data.message}&rdquo;
              </blockquote>
              {data.from && (
                <p className="text-sm text-[#A8B5A2] font-sans tracking-[0.15em] uppercase">— {data.from}</p>
              )}
            </motion.div>

            {/* Music Player Bar */}
            {trackId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="mt-8 w-full max-w-md bg-white/40 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/50"
              >
                <div className="w-12 h-12 bg-[#2C2420] rounded-lg flex items-center justify-center text-white">
                  <Music className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-[#A8B5A2] font-sans uppercase tracking-widest mb-0.5">Playing your moment</p>
                  <p className="text-sm text-[#2C2420] font-medium truncate">Spotify Song Moment</p>
                </div>
                {/* Hidden embed for autoplay logic */}
                <div className="hidden">
                   <iframe
                      ref={audioRef}
                      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&t=${data.song.start}`}
                      width="0"
                      height="0"
                      allow="autoplay; encrypted-media"
                    />
                </div>
                {/* Visual player link if they want to see full player */}
                <a 
                   href={data.song.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-[10px] text-[#C9848F] hover:underline"
                >
                  Full Song ↗
                </a>
              </motion.div>
            )}

            {/* Branding Watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-16 text-center opacity-30 hover:opacity-100 transition-opacity"
            >
              <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[#2C2420] font-sans">
                Made with love on <span className="italic font-display lowercase tracking-normal text-xs">petalé</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
