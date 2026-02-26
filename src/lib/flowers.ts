export interface Flower {
  id: string;
  name: string;
  color: string;
  meaning: string;
  image: string;
  swatchColor: string;
  tier: "tall" | "medium" | "small" | "foliage";
}

export const FLOWERS: Flower[] = [
  // ── FOILAGE & FILLERS ──
  {
    id: "foliage-1",
    name: "Sage Spray",
    color: "Dusty Green",
    meaning: "Support",
    image: "/flowers/1.webp",
    swatchColor: "#A8B5A2",
    tier: "foliage",
  },
  {
    id: "foliage-2",
    name: "Eucalyptus",
    color: "Silver Green",
    meaning: "Growth",
    image: "/flowers/2.webp",
    swatchColor: "#94a89a",
    tier: "foliage",
  },
  {
    id: "foliage-3",
    name: "Olive Branch",
    color: "Deep Sage",
    meaning: "Peace",
    image: "/flowers/3.webp",
    swatchColor: "#7c8c7c",
    tier: "foliage",
  },
  {
    id: "foliage-4",
    name: "Wild Fern",
    color: "Muted Olive",
    meaning: "Sincerity",
    image: "/flowers/4.png",
    swatchColor: "#8ea38e",
    tier: "foliage",
  },
  {
    id: "foliage-5",
    name: "Meadow Grass",
    color: "Soft Sage",
    meaning: "Connection",
    image: "/flowers/5.png",
    swatchColor: "#b5c4b5",
    tier: "foliage",
  },

  // ── MAIN FLOWERS ──
  {
    id: "rose",
    name: "Rose",
    color: "Pink / Red",
    meaning: "Love & Passion",
    image: "/flowers/rose-Binryhht.webp",
    swatchColor: "#d4707e",
    tier: "medium",
  },
  {
    id: "tulip",
    name: "Tulip",
    color: "Yellow / Pink",
    meaning: "Cheerfulness",
    image: "/flowers/tulip-DkVON6MI.webp",
    swatchColor: "#f0b840",
    tier: "medium",
  },
  {
    id: "lily",
    name: "Lily",
    color: "White / Blush",
    meaning: "Purity",
    image: "/flowers/lily-Bn_fQTOU.webp",
    swatchColor: "#f0dece",
    tier: "tall",
  },
  {
    id: "orchid",
    name: "Orchid",
    color: "Purple / Lavender",
    meaning: "Admiration",
    image: "/flowers/orchid-DO40kC-2.webp",
    swatchColor: "#a060c0",
    tier: "tall",
  },
  {
    id: "peony",
    name: "Peony",
    color: "Soft Pink",
    meaning: "Romance",
    image: "/flowers/peony-BCw4kTvM.webp",
    swatchColor: "#e898a8",
    tier: "medium",
  },
  {
    id: "daisy",
    name: "Daisy",
    color: "White / Yellow",
    meaning: "Innocence",
    image: "/flowers/daisy-CELBRpZ7.webp",
    swatchColor: "#f0c840",
    tier: "small",
  },
  {
    id: "carnation",
    name: "Carnation",
    color: "Pink / Red",
    meaning: "Deep Love",
    image: "/flowers/carnation-DoiHabBz.webp",
    swatchColor: "#d87088",
    tier: "small",
  },
  {
    id: "chrysanthemum",
    name: "Chrysanthemum",
    color: "Yellow / Gold",
    meaning: "Joy",
    image: "/flowers/chrysanthemum-nmdROtFj.webp",
    swatchColor: "#d89810",
    tier: "medium",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    color: "Bright Yellow",
    meaning: "Adoration",
    image: "/flowers/sunflower.png",
    swatchColor: "#ffc800",
    tier: "tall",
  },
  {
    id: "lotus",
    name: "Lotus",
    color: "White / Pink",
    meaning: "Rebirth",
    image: "/flowers/lotus-DDF3I5iL.webp",
    swatchColor: "#fce4ec",
    tier: "small",
  },
  {
    id: "camellia",
    name: "Camellia",
    color: "Pink / White",
    meaning: "Longing",
    image: "/flowers/camellia-Doo1wvpa.webp",
    swatchColor: "#f48fb1",
    tier: "medium",
  },
  {
    id: "anemone",
    name: "Anemone",
    color: "White / Dark Center",
    meaning: "Protection",
    image: "/flowers/anemone.png",
    swatchColor: "#ffffff",
    tier: "small",
  },
];

export const BACKGROUNDS = [
  { id: "cream", value: "#FAF7F2", label: "Paper Cream" },
  { id: "blush", value: "#F2C4CE", label: "Soft Blush" },
  { id: "sage", value: "#A8B5A2", label: "Dusty Sage" },
  { id: "dark", value: "#2C2420", label: "Midnight Coffee" },
];

export function arrangeInitialBouquet(flowers: Flower[]) {
  const POSITIONS = [
    { x: 0, y: -20, rotate: -5, z: 10, scale: 1 },
    { x: -70, y: 10, rotate: -18, z: 8, scale: 0.92 },
    { x: 70, y: 10, rotate: 18, z: 8, scale: 0.92 },
    { x: -40, y: 40, rotate: -8, z: 9, scale: 0.96 },
    { x: 40, y: 40, rotate: 8, z: 9, scale: 0.96 },
    { x: -110, y: 30, rotate: -25, z: 7, scale: 0.85 },
    { x: 110, y: 30, rotate: 25, z: 7, scale: 0.85 },
    { x: 0, y: 60, rotate: 0, z: 11, scale: 0.9 },
  ];

  return flowers.map((flower, i) => {
    const pos = POSITIONS[i] || POSITIONS[0];
    
    // Foliage goes to the back by default
    const defaultZ = flower.tier === "foliage" ? 1 : pos.z;
    const defaultScale = flower.tier === "foliage" ? 1.5 : pos.scale;

    return {
      instanceId: Math.random().toString(36).substr(2, 9),
      flower,
      x: pos.x,
      y: pos.y,
      scale: defaultScale,
      rotation: pos.rotate,
      zIndex: defaultZ,
    };
  });
}
