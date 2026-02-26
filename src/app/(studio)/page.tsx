"use client";

import Link from "next/link";
import NextImage from "next/image";
import { MoveRight, Heart, Music2, Share2, Sparkles, Send } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const STEPS = [
  { icon: "🌸", label: "Pick your flowers", sub: "8 botanical varieties" },
  { icon: "💐", label: "Arrange the bouquet", sub: "Auto-arranged beautifully" },
  { icon: "✉️", label: "Write your note", sub: "Words that last forever" },
  { icon: "🎵", label: "Add a song moment", sub: "The exact second that matters" },
  { icon: "🔗", label: "Share the link", sub: "One link. One person." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2]">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24 overflow-hidden">
        {/* Radial bloom glow layers */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F2C4CE]/30 blur-[130px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#A8B5A2]/20 blur-[100px] rounded-full" 
          />
        </div>

        {/* Decorative floating flowers with parallax motion */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [-25, -20, -25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-12 opacity-40 hidden md:block"
        >
          <NextImage src="/flowers/rose-Binryhht.webp" alt="" width={100} height={120} aria-hidden />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [15, 10, 15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-16 opacity-30 hidden md:block"
        >
          <NextImage src="/flowers/lily-Bn_fQTOU.webp" alt="" width={90} height={110} aria-hidden />
        </motion.div>
        <motion.div 
          animate={{ x: [0, 15, 0], y: [0, -15, 0], rotate: [10, 15, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-40 left-20 opacity-35 hidden md:block"
        >
          <NextImage src="/flowers/daisy-CELBRpZ7.webp" alt="" width={80} height={100} aria-hidden />
        </motion.div>
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, 10, 0], rotate: [-15, -10, -15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-48 right-24 opacity-30 hidden md:block"
        >
          <NextImage src="/flowers/peony-BCw4kTvM.webp" alt="" width={100} height={120} aria-hidden />
        </motion.div>

        {/* Hero content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#F2C4CE]/40 rounded-full px-5 py-2 text-sm text-[#C9848F] mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-[#C9848F]" />
            <span className="font-sans font-medium">Free to create & celebrate</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl text-[#2C2420] leading-[0.95] italic font-display mb-8"
          >
            Flowers as
            <br />
            <span className="relative inline-block mt-2">
              Digital Emotion
              <motion.svg 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                className="absolute -bottom-4 left-0 w-full overflow-visible" 
                height="12" 
                viewBox="0 0 400 12" 
                preserveAspectRatio="none"
              >
                <path d="M5 8 Q100 0 200 6 Q300 12 395 5" stroke="#F2C4CE" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </motion.svg>
            </span>
            .
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-[#2C2420]/60 max-w-2xl mx-auto leading-relaxed font-sans mb-12"
          >
            Pick flowers. Write your story. Add the{" "}
            <em className="text-[#C9848F] not-italic font-semibold bg-[#F2C4CE]/10 px-1 rounded">exact song moment</em>. Send a link that blooms forever.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/flowers"
              className="group relative inline-flex items-center gap-3 bg-[#C9848F] text-white px-10 py-5 rounded-full text-xl font-medium transition-all duration-500 hover:bg-[#2C2420] hover:scale-105 active:scale-95 shadow-[0_20px_50px_-15px_rgba(201,132,143,0.5)] hover:shadow-[0_25px_60px_-15px_rgba(44,36,32,0.4)]"
            >
              Start Creating
              <MoveRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Link>
            <div className="flex flex-col items-start sm:items-center">
              <span className="text-sm font-sans text-[#2C2420]/40 font-medium">No account needed</span>
              <span className="text-[10px] uppercase tracking-widest text-[#A8B5A2] font-sans">Takes 3 minutes</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#2C2420]/30 font-sans">Scroll to discover</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-[#C9848F] via-[#F2C4CE] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── How it works (Process) ── */}
      <section className="relative py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="font-display text-6xl md:text-7xl text-[#2C2420] italic mb-6">
              The Journey of a Gift
            </h2>
            <div className="w-20 h-1 bg-[#F2C4CE]/40 mx-auto rounded-full" />
          </motion.div>

          {/* Process Timeline */}
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 items-start">
            {/* Desktop Connector Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
              className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#F2C4CE]/50 to-transparent origin-left" 
            />

            {STEPS.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center space-y-6 group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#F2C4CE]/40 flex items-center justify-center text-3xl shadow-[0_15px_40px_-10px_rgba(201,132,143,0.15)] group-hover:scale-110 group-hover:shadow-[0_20px_50px_-10px_rgba(201,132,143,0.25)] transition-all duration-500 relative z-10">
                    {step.icon}
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute inset-0 bg-[#F2C4CE]/20 rounded-full blur-xl -z-10"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#A8B5A2] block">
                    Step {i + 1}
                  </span>
                  <h3 className="font-display text-2xl italic text-[#2C2420]">
                    {step.label}
                  </h3>
                  <p className="text-sm text-[#2C2420]/45 leading-relaxed font-sans px-4">
                    {step.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature highlights ── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-7 h-7 text-[#C9848F]" />,
                title: "Emotional by design",
                desc: "Every detail — from serif fonts to muted colors — is chosen to feel luxurious and intimate. Not another greeting card.",
              },
              {
                icon: <Music2 className="w-7 h-7 text-[#C9848F]" />,
                title: "Song moments",
                desc: "Paste a Spotify link and pick the exact moment that pulse with memory. The recipient hears it the instant they open.",
              },
              {
                icon: <Share2 className="w-7 h-7 text-[#C9848F]" />,
                title: "One link. One person.",
                desc: "No dashboards, no logins. Just a single, beautiful link that opens into a world made specifically for them.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-[#FFFEF9] rounded-[2.5rem] p-10 space-y-6 border border-[#2C2420]/[0.03] shadow-[0_30px_70px_-20px_rgba(44,36,32,0.06)] hover:shadow-[0_40px_80px_-20px_rgba(201,132,143,0.12)] transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F2C4CE]/20 flex items-center justify-center group-hover:bg-[#F2C4CE]/40 transition-colors duration-500">
                  {f.icon}
                </div>
                <h3 className="font-display text-3xl italic text-[#2C2420]">
                  {f.title}
                </h3>
                <p className="text-base text-[#2C2420]/50 leading-relaxed font-sans">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Quote / Intention ── */}
      <section className="py-40 px-6 bg-gradient-to-b from-white to-[#FAF7F2] text-center">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-3xl mx-auto space-y-12"
         >
            <div className="inline-block px-6 py-2 rounded-full border border-[#2C2420]/10 text-[10px] uppercase font-bold tracking-[0.4em] text-[#A8B5A2] font-sans">
              Our Philosophy
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-[#2C2420] italic leading-[1.1]">
              &quot;Flowers aren&apos;t just flowers. They are &apos;I thought about you&apos; — made digital, made permanent.&quot;
            </h2>
            <div className="flex items-center justify-center gap-4 text-[#C9848F]">
              <div className="w-12 h-px bg-current opacity-20" />
              <span className="font-display italic text-2xl">Petalé team</span>
              <div className="w-12 h-px bg-current opacity-20" />
            </div>
         </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-40 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#C9848F]/5" />
        
        {/* Animated background elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#F2C4CE]/20 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#A8B5A2]/10 blur-[100px] rounded-full"
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-10"
        >
          <div className="flex justify-center gap-4">
            <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-4xl">🌸</motion.span>
            <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="text-4xl">💐</motion.span>
            <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="text-4xl">🌺</motion.span>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-6xl md:text-7xl text-[#2C2420] italic">
              Someone deserves this.
            </h2>
            <p className="text-[#2C2420]/50 text-xl font-sans">
              No login. No friction. Just pure emotion.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/flowers"
              className="inline-flex items-center gap-4 bg-[#2C2420] text-white px-14 py-6 rounded-full text-2xl font-medium transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(44,36,32,0.4)] hover:shadow-[0_25px_70px_-15px_rgba(44,36,32,0.6)] group"
            >
              Start Your Bouquet
              <Send className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
          
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#A8B5A2] font-sans mt-8">
            Create yours in 3 minutes
          </p>
        </motion.div>
      </section>

      <style jsx global>{`
        .font-display { font-family: var(--font-cormorant); }
        .font-sans { font-family: var(--font-dm-sans); }
      `}</style>
    </main>
  );
}
