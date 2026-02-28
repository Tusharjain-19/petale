"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Music, Eye, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBouquetStore } from "@/store/useBouquetStore";

const MAX_CHARS = 300;

function extractSpotifyTrackId(url: string): string | null {
  const match = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function mmssToSeconds(mmss: string): number {
  const parts = mmss.split(":").map(Number);
  if (parts.length === 2) return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  return 0;
}

function secondsToMmss(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function MessagePage() {
  const router = useRouter();
  const { selectedFlowers, message, songConfig, setMessage, setSong } =
    useBouquetStore();

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [internalMsg, setInternalMsg] = useState(message);
  const [spotifyUrl, setSpotifyUrl] = useState(songConfig.url);
  const [startMmss, setStartMmss] = useState(secondsToMmss(songConfig.start));
  const [endMmss, setEndMmss] = useState(
    songConfig.end ? secondsToMmss(songConfig.end) : ""
  );
  const [showEmbed, setShowEmbed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const trackId = extractSpotifyTrackId(spotifyUrl);
  const startSec = mmssToSeconds(startMmss);
  const endSec = endMmss ? mmssToSeconds(endMmss) : 0;
  const charsLeft = MAX_CHARS - internalMsg.length;

  useEffect(() => {
    if (selectedFlowers.length < 3) {
      router.replace("/flowers");
    }
  }, [selectedFlowers, router]);

  const handleFinish = async () => {
    if (!internalMsg.trim()) {
      setError("Please write a message.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    setMessage(internalMsg);
    setSong({ url: spotifyUrl, start: startSec, end: endSec });

    const { arrangedFlowers, background, wrap } = useBouquetStore.getState();

    try {
      // Create an optimized data object to keep URL length short
      const bouquetData = {
        f: arrangedFlowers.map(f => ({
          i: f.flower.id,
          x: Math.round(f.x),
          y: Math.round(f.y),
          s: Number(f.scale.toFixed(2)),
          r: Math.round(f.rotation),
          z: f.zIndex
        })),
        m: internalMsg,
        t: to,
        fr: from,
        s: { u: spotifyUrl, st: startSec, en: endSec },
        b: background,
        w: wrap,
      };

      const jsonStr = JSON.stringify(bouquetData);
      // Robust way to encode UTF-8 to base64
      const bytes = new TextEncoder().encode(jsonStr);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const encodedData = btoa(binary);

      // Redirect to the view page with the encoded data
      router.push(`/to/view?d=${encodeURIComponent(encodedData)}&created=true`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 md:px-8 py-12 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  step === 3
                    ? "bg-[#C9848F] text-white"
                    : "bg-[#A8B5A2] text-white"
                }`}
              >
                {step < 3 ? "✓" : step}
              </div>
              {step < 3 && <div className="w-8 h-px bg-[#2C2420]/15 rounded" />}
            </div>
          ))}
        </div>

        <h1
          className="font-display text-5xl md:text-6xl text-[#2C2420] italic mb-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Add Your Note
        </h1>
        <p
          className="text-[#2C2420]/55 text-base"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Write from the heart. Every word matters.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#FFFEF9] rounded-3xl shadow-[0_30px_80px_-20px_rgba(44,36,32,0.1)] p-8 space-y-6"
      >
        {/* To field */}
        <div className="space-y-1.5">
          <label
            htmlFor="recipient-name"
            className="block text-xs tracking-widest uppercase text-[#A8B5A2]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            To
          </label>
          <input
            id="recipient-name"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Someone special"
            maxLength={60}
            className="w-full bg-transparent border-b border-[#2C2420]/15 pb-2 text-2xl text-[#2C2420] placeholder-[#2C2420]/30 focus:outline-none focus:border-[#C9848F] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="message-textarea"
            className="block text-xs tracking-widest uppercase text-[#A8B5A2]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Message
          </label>
          <textarea
            id="message-textarea"
            value={internalMsg}
            onChange={(e) =>
              setInternalMsg(e.target.value.slice(0, MAX_CHARS))
            }
            placeholder="I don't know how to say this perfectly, but…"
            rows={5}
            className="w-full bg-transparent border border-[#2C2420]/10 rounded-2xl px-4 py-3 text-lg text-[#2C2420] placeholder-[#2C2420]/30 focus:outline-none focus:border-[#C9848F]/50 focus:ring-1 focus:ring-[#C9848F]/20 transition-all resize-none leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
          <p
            className="text-right text-xs"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span
              className={charsLeft < 30 ? "text-[#C9848F]" : "text-[#2C2420]/30"}
            >
              {charsLeft} characters left
            </span>
          </p>
        </div>

        {/* From field */}
        <div className="space-y-1.5">
          <label
            htmlFor="sender-name"
            className="block text-xs tracking-widest uppercase text-[#A8B5A2]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            From
          </label>
          <input
            id="sender-name"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            className="w-full bg-transparent border-b border-[#2C2420]/15 pb-2 text-2xl text-[#2C2420] placeholder-[#2C2420]/30 focus:outline-none focus:border-[#C9848F] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </div>

        {/* Divider with music icon */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-[#2C2420]/10" />
          <Music className="w-5 h-5 text-[#A8B5A2]" />
          <div className="flex-1 h-px bg-[#2C2420]/10" />
        </div>

        {/* Spotify section */}
        <div className="space-y-4">
          <div>
            <h3
              className="text-xl text-[#2C2420] italic mb-1"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Add a Song Moment 🎵
            </h3>
            <p
              className="text-sm text-[#2C2420]/45"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Pick the exact moment that reminds you of them
            </p>
          </div>

          {/* Spotify URL */}
          <div className="relative">
            <input
              id="spotify-url"
              type="url"
              value={spotifyUrl}
              onChange={(e) => {
                setSpotifyUrl(e.target.value);
                setShowEmbed(false);
              }}
              placeholder="Paste Spotify track link..."
              className="w-full bg-[#FAF7F2] border border-[#2C2420]/10 rounded-2xl px-4 py-3 pr-12 text-sm text-[#2C2420] placeholder-[#2C2420]/35 focus:outline-none focus:border-[#C9848F]/50 transition-all"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
            {trackId && (
              <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B5A2]" />
            )}
          </div>

          {/* Timestamp pickers (show when valid track) */}
          <AnimatePresence>
            {trackId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label
                      className="block text-xs tracking-widest uppercase text-[#A8B5A2]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      ▶ Start at
                    </label>
                    <input
                      id="song-start"
                      type="text"
                      value={startMmss}
                      onChange={(e) => setStartMmss(e.target.value)}
                      placeholder="00:00"
                      pattern="[0-9]{1,2}:[0-9]{2}"
                      className="w-full bg-[#FAF7F2] border border-[#2C2420]/10 rounded-xl px-3 py-2.5 text-sm text-[#2C2420] placeholder-[#2C2420]/30 focus:outline-none focus:border-[#C9848F]/50 transition-all font-mono"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label
                      className="block text-xs tracking-widest uppercase text-[#A8B5A2]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      ⏹ End at{" "}
                      <span className="normal-case text-[#2C2420]/30">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="song-end"
                      type="text"
                      value={endMmss}
                      onChange={(e) => setEndMmss(e.target.value)}
                      placeholder="—"
                      pattern="[0-9]{1,2}:[0-9]{2}"
                      className="w-full bg-[#FAF7F2] border border-[#2C2420]/10 rounded-xl px-3 py-2.5 text-sm text-[#2C2420] placeholder-[#2C2420]/30 focus:outline-none focus:border-[#C9848F]/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  id="preview-song-moment"
                  onClick={() => setShowEmbed((v) => !v)}
                  className="flex items-center gap-2 text-sm text-[#C9848F] hover:text-[#2C2420] transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <Eye className="w-4 h-4" />
                  {showEmbed ? "Hide preview" : "▶ Preview this moment"}
                </button>

                <AnimatePresence>
                  {showEmbed && trackId && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-2xl overflow-hidden"
                    >
                      <iframe
                        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&t=${startSec}`}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="border-0 rounded-2xl"
                        title="Spotify track preview"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px bg-[#2C2420]/10" />
        </div>

        {/* Action buttons */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-400 text-center"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => router.push("/arrange")}
            className="flex items-center gap-2 text-sm text-[#2C2420]/50 hover:text-[#2C2420] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              id="preview-bouquet"
              onClick={() => router.push("/arrange")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2C2420]/15 bg-white text-[#2C2420]/70 text-sm hover:bg-[#FAF7F2] hover:border-[#C9848F]/40 transition-all"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              id="finish-bouquet"
              onClick={handleFinish}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#C9848F] text-white px-7 py-2.5 rounded-full font-medium hover:bg-[#2C2420] transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(201,132,143,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              {isSubmitting ? "Creating..." : "Finish Bouquet 🎀"}
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
