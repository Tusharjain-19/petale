import fs from "fs";
import path from "path";
import { type ArrangedFlower } from "@/store/useBouquetStore";

const DB_PATH = path.join(process.cwd(), "db.json");

interface BouquetData {
  id: string;
  flowers: ArrangedFlower[];
  message: string;
  to: string;
  from: string;
  song: { url: string; start: number; end: number };
  background: string;
  wrap: string;
  createdAt: string;
}

function readDB(): Record<string, BouquetData> {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return {};
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return {};
  }
}

function writeDB(data: Record<string, BouquetData>) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing DB:", error);
  }
}

export const bouquetStore = {
  get: (id: string) => {
    const db = readDB();
    return db[id];
  },
  set: (id: string, data: BouquetData) => {
    const db = readDB();
    db[id] = data;
    writeDB(db);
  },
  has: (id: string) => {
    const db = readDB();
    return !!db[id];
  }
};
