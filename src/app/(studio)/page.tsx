import type { Metadata } from "next";
import Link from "next/link";
import NextImage from "next/image";
import { MoveRight, Heart, Music2, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Petalé | Send Personalized Digital Flower Bouquets & Musical Gifts",
  description:
    "Create a beautiful digital flower bouquet with a personal message and music. Share a unique link that opens into a stunning fullscreen experience. The perfect thoughtful gift.",
};

const STEPS = [
  { icon: "🌸", label: "Pick your flowers", sub: "8 botanical varieties" },
  { icon: "💐", label: "Arrange the bouquet", sub: "Auto-arranged beautifully" },
  { icon: "✉️", label: "Write your note", sub: "Words that last forever" },
  { icon: "🎵", label: "Add a song moment", sub: "The exact second that matters" },
  { icon: "🔗", label: "Share the link", sub: "One link. One person." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 text-center">
        {/* Radial bloom glow */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F2C4CE]/25 blur-[120px] rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#A8B5A2]/15 blur-[80px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#F2C4CE]/20 blur-[90px] rounded-full" />
        </div>

        {/* Decorative floating flowers */}
        <div className="absolute top-16 left-8 opacity-30 animate-pulse hidden md:block">
          <NextImage src="/flowers/rose-Binryhht.webp" alt="" width={80} height={95} aria-hidden className="rotate-[-25deg]" />
        </div>
        <div className="absolute top-24 right-12 opacity-20 hidden md:block" style={{ animation: "float 4s ease-in-out infinite" }}>
          <NextImage src="/flowers/lily-Bn_fQTOU.webp" alt="" width={70} height={85} aria-hidden className="rotate-[15deg]" />
        </div>
        <div className="absolute bottom-24 left-16 opacity-25 hidden md:block" style={{ animation: "float 5s ease-in-out infinite 1s" }}>
          <NextImage src="/flowers/daisy-CELBRpZ7.webp" alt="" width={65} height={75} aria-hidden className="rotate-[10deg]" />
        </div>
        <div className="absolute bottom-32 right-10 opacity-20 hidden md:block" style={{ animation: "float 3.5s ease-in-out infinite 0.5s" }}>
          <NextImage src="/flowers/peony-BCw4kTvM.webp" alt="" width={75} height={90} aria-hidden className="rotate-[-15deg]" />
        </div>

        {/* Hero text */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFFEF9] border border-[#F2C4CE]/60 rounded-full px-4 py-1.5 text-sm text-[#C9848F] mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#C9848F]" />
            <span style={{ fontFamily: "var(--font-dm-sans)" }}>Free to create &amp; share</span>
          </div>

          <h1
            className="text-6xl md:text-8xl text-[#2C2420] leading-[1.05] italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Flowers as
            <br />
            <span className="relative">
              Digital Emotion
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 400 8" preserveAspectRatio="none">
                <path d="M0 6 Q100 0 200 5 Q300 10 400 4" stroke="#F2C4CE" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            .
          </h1>

          <p
            className="text-xl md:text-2xl text-[#2C2420]/55 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Pick flowers. Write your story. Add the{" "}
            <em className="text-[#C9848F] not-italic font-medium">exact song moment</em>. Send a link that blooms forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/flowers"
              id="hero-cta"
              className="group relative inline-flex items-center gap-3 bg-[#C9848F] text-white px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 hover:bg-[#2C2420] shadow-[0_12px_40px_-10px_rgba(201,132,143,0.45)] hover:shadow-[0_16px_48px_-10px_rgba(44,36,32,0.3)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Create a Bouquet
              <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-sm text-[#2C2420]/35" style={{ fontFamily: "var(--font-dm-sans)" }}>
              No account needed · Takes 3 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 bg-[#FFFEF9]" aria-labelledby="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              id="how-it-works"
              className="font-display text-5xl md:text-6xl text-[#2C2420] italic mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              How it works
            </h2>
            <p className="text-[#2C2420]/45 text-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Five steps to something they&apos;ll never forget.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#F2C4CE]/50 flex items-center justify-center text-2xl shadow-[0_8px_30px_-10px_rgba(201,132,143,0.2)] group-hover:shadow-[0_12px_40px_-10px_rgba(201,132,143,0.3)] transition-all duration-300 group-hover:scale-105">
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute mt-8 ml-[7rem] w-full h-px bg-[#F2C4CE]/30" />
                )}
                <p className="text-[#2C2420]/35 text-xs font-medium tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Step {i + 1}
                </p>
                <h3 className="font-display text-xl italic text-[#2C2420]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {step.label}
                </h3>
                <p className="text-sm text-[#2C2420]/40" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {step.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="py-24 px-6" aria-labelledby="features">
        <div className="max-w-5xl mx-auto">
          <h2
            id="features"
            className="font-display text-5xl text-[#2C2420] italic text-center mb-16"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            What makes Petalé different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6 text-[#C9848F]" />,
                title: "Emotional by design",
                desc: "Every detail — from serif fonts to muted colors — is chosen to feel luxurious and intimate. Not another greeting card.",
              },
              {
                icon: <Music2 className="w-6 h-6 text-[#C9848F]" />,
                title: "Song moments, not playlists",
                desc: "Paste a Spotify link and pick the exact 30 seconds that feel like them. The recipient hears it the moment they open.",
              },
              {
                icon: <Share2 className="w-6 h-6 text-[#C9848F]" />,
                title: "One link. One person.",
                desc: "Generate a private, beautiful URL. No dashboard. No login. Just a link they open to a fullscreen experience.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-[#FFFEF9] rounded-2xl p-8 space-y-4 border border-[#2C2420]/[0.05] shadow-[0_20px_50px_-20px_rgba(44,36,32,0.07)] hover:shadow-[0_24px_60px_-20px_rgba(201,132,143,0.15)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F2C4CE]/30 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-display text-2xl italic text-[#2C2420]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-[#2C2420]/50 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center gap-2 text-3xl">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>🌸</span>
            <span className="animate-bounce" style={{ animationDelay: "150ms" }}>💐</span>
            <span className="animate-bounce" style={{ animationDelay: "300ms" }}>🌺</span>
          </div>
          <h2
            className="font-display text-5xl md:text-6xl text-[#2C2420] italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Someone deserves this.
          </h2>
          <p className="text-[#2C2420]/50 text-lg" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Not tomorrow. Right now.
          </p>
          <Link
            href="/flowers"
            id="bottom-cta"
            className="inline-flex items-center gap-3 bg-[#C9848F] text-white px-12 py-5 rounded-full text-xl font-medium hover:bg-[#2C2420] transition-all duration-300 shadow-[0_16px_50px_-12px_rgba(201,132,143,0.45)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Send Flowers Now 🌸
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
        }
      `}</style>
    </main>
  );
}
