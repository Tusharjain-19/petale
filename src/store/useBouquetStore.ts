import { create } from "zustand";
import { type Flower } from "@/lib/flowers";

export interface ArrangedFlower {
  instanceId: string;
  flower: Flower;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
}

interface BouquetState {
  selectedFlowers: Flower[]; // Still used for Step 1 selection
  arrangedFlowers: ArrangedFlower[]; // Used for the actual arrangement in Step 2 & 3
  message: string;
  to: string;
  from: string;
  songConfig: {
    url: string;
    start: number;
    end: number;
  };
  background: string;

  // Actions
  addFlower: (flower: Flower) => void;
  removeFlower: (id: string) => void;

  setArrangedFlowers: (flowers: ArrangedFlower[]) => void;
  updateFlowerTransform: (instanceId: string, transform: Partial<{ x: number, y: number, scale: number, rotation: number, zIndex: number }>) => void;
  removeArrangedFlower: (instanceId: string) => void;
  addArrangedFlower: (flower: Flower) => void;

  setMessage: (msg: string) => void;
  setSong: (config: { url: string; start: number; end: number }) => void;
  setBackground: (bg: string) => void;
  setNames: (to: string, from: string) => void;
  clearBouquet: () => void;
}

export const useBouquetStore = create<BouquetState>((set) => ({
  selectedFlowers: [],
  arrangedFlowers: [],
  message: "",
  to: "",
  from: "",
  songConfig: { url: "", start: 0, end: 0 },
  background: "#FAF7F2", // Default cream

  addFlower: (flower) =>
    set((state) => {
      if (state.selectedFlowers.length >= 20) return state; // Increased limit for freedom
      return { selectedFlowers: [...state.selectedFlowers, flower] };
    }),

  removeFlower: (id) =>
    set((state) => {
      const index = [...state.selectedFlowers].reverse().findIndex(f => f.id === id);
      if (index === -1) return state;
      const actualIndex = state.selectedFlowers.length - 1 - index;
      const newSelected = [...state.selectedFlowers];
      newSelected.splice(actualIndex, 1);
      return { selectedFlowers: newSelected };
    }),

  setArrangedFlowers: (flowers) => set({ arrangedFlowers: flowers }),

  updateFlowerTransform: (instanceId, transform) =>
    set((state) => ({
      arrangedFlowers: state.arrangedFlowers.map((f) =>
        f.instanceId === instanceId ? { ...f, ...transform } : f
      ),
    })),

  removeArrangedFlower: (instanceId) =>
    set((state) => ({
      arrangedFlowers: state.arrangedFlowers.filter((f) => f.instanceId !== instanceId),
    })),
  addArrangedFlower: (flower) =>
    set((state) => {
      const isFoliage = flower.tier === "foliage";
      const newInstance: ArrangedFlower = {
        instanceId: Math.random().toString(36).substr(2, 9),
        flower,
        x: 0,
        y: 0,
        scale: isFoliage ? 1.5 : 1,
        rotation: 0,
        zIndex: isFoliage ? 1 : Math.max(...state.arrangedFlowers.map(f => f.zIndex), 0) + 1,
      };

      // If adding foliage, we push it to the back
      const updatedFlowers = isFoliage
        ? [newInstance, ...state.arrangedFlowers.map(f => ({ ...f, zIndex: f.zIndex + 1 }))]
        : [...state.arrangedFlowers, newInstance];

      return { arrangedFlowers: updatedFlowers };
    }),

  setMessage: (msg) => set({ message: msg }),
  setSong: (config) => set({ songConfig: config }),
  setBackground: (bg) => set({ background: bg }),
  setNames: (to, from) => set({ to, from }),
  clearBouquet: () =>
    set({
      selectedFlowers: [],
      arrangedFlowers: [],
      message: "",
      to: "",
      from: "",
      songConfig: { url: "", start: 0, end: 0 },
      background: "#FAF7F2",
    }),
}));
