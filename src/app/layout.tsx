import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Petalé | Create & Send Beautiful Digital Flower Bouquets",
    template: "%s | Petalé",
  },
  description:
    "Send a personalized digital flower bouquet with a custom message and Spotify song. Experience a beautiful fullscreen gift reveal. The perfect digital emotion for someone special.",
  keywords: [
    "digital flower bouquet",
    "virtual bouquet",
    "flower gift online",
    "personalized flower gift",
    "digital greeting",
    "Petalé",
    "send flowers online",
    "romantic gift idea",
  ],
  authors: [{ name: "Petalé" }],
  creator: "Petalé",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://petale.app",
    siteName: "Petalé",
    title: "Petalé — Digital Flower Bouquet Gift",
    description:
      "Pick flowers. Arrange a bouquet. Write your heart. Share forever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petalé — Digital Flower Bouquet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petalé — Digital Flower Bouquet Gift",
    description:
      "Pick flowers. Arrange a bouquet. Write your heart. Share forever.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://petale.app" />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased bg-[#FAF7F2] text-[#2C2420]`}
        suppressHydrationWarning
      >
        {/* ── Navigation ── */}
        <nav
          aria-label="Main navigation"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md bg-[#FAF7F2]/80 border-b border-[#2C2420]/[0.06]"
        >
          <Link href="/" aria-label="Petalé Home" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Petalé logo"
              width={180}
              height={45}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/flowers"
              className="font-sans text-sm text-[#2C2420]/60 hover:text-[#2C2420] transition-colors duration-200 hidden md:inline"
            >
              Create
            </Link>
            <Link
              href="/flowers"
              className="inline-flex items-center gap-2 bg-[#C9848F] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#2C2420] transition-all duration-300"
              id="nav-cta"
            >
              Send Flowers 🌸
            </Link>
          </div>
        </nav>

        {/* ── Page Content ── */}
        <div className="pt-[73px]">{children}</div>

        {/* ── Footer ── */}
        <footer
          aria-label="Site footer"
          className="mt-24 border-t border-[#2C2420]/[0.07] bg-[#FFFEF9]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand column */}
              <div className="space-y-4">
                <Image
                  src="/logo.svg"
                  alt="Petalé"
                  width={140}
                  height={35}
                  className="h-8 w-auto"
                />
                <p className="font-sans text-sm text-[#2C2420]/55 leading-relaxed max-w-xs">
                  Flowers aren&apos;t just flowers. They are{" "}
                  <em className="font-display">I thought about you</em> — made
                  digital, made permanent.
                </p>
                <p className="font-sans text-xs text-[#A8B5A2] tracking-wider uppercase">
                  Crafted with Intention
                </p>
              </div>

              {/* Create column */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-[#2C2420] italic">
                  Create
                </h3>
                <ul className="space-y-2.5 font-sans text-sm text-[#2C2420]/55">
                  <li>
                    <Link
                      href="/flowers"
                      className="hover:text-[#C9848F] transition-colors"
                    >
                      Choose Flowers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/flowers"
                      className="hover:text-[#C9848F] transition-colors"
                    >
                      Build a Bouquet
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/flowers"
                      className="hover:text-[#C9848F] transition-colors"
                    >
                      Write a Message
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/flowers"
                      className="hover:text-[#C9848F] transition-colors"
                    >
                      Add a Song Moment
                    </Link>
                  </li>
                </ul>
              </div>

              {/* About column */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-[#2C2420] italic">
                  About
                </h3>
                <ul className="space-y-2.5 font-sans text-sm text-[#2C2420]/55">
                  <li>
                    <span className="text-[#A8B5A2]">Free to use</span>
                  </li>
                  <li>
                    <span className="text-[#A8B5A2]">No login required</span>
                  </li>
                  <li>
                    <span className="text-[#A8B5A2]">
                      Links expire in 30 days
                    </span>
                  </li>
                  <li>
                    <span className="text-[#A8B5A2]">
                      Premium coming soon ✦
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-[#2C2420]/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-sans text-xs text-[#2C2420]/35">
                © {new Date().getFullYear()} Petalé. All rights reserved.
              </p>
              <div className="flex items-center gap-1 font-display text-sm text-[#2C2420]/35 italic">
                <span>Made for every</span>
                <span className="text-[#C9848F] mx-1">🌸</span>
                <span>moment that matters</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
