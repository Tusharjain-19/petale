import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

// In-memory store for development. Replace with Supabase for production.
export const bouquetStore = new Map<string, Record<string, unknown>>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { arrangedFlowers, message, to, from, song, background, slug } = body;

    if (!arrangedFlowers || arrangedFlowers.length < 3) {
      return NextResponse.json(
        { error: "Please select at least 3 flowers." },
        { status: 400 }
      );
    }
    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const id = slug || nanoid(10);

    if (bouquetStore.has(id)) {
      return NextResponse.json(
        { error: "This custom link is already taken. Try another." },
        { status: 409 }
      );
    }

    const data = {
      id,
      flowers: arrangedFlowers, // Renaming key for clarity in storage
      message,
      to: to || "",
      from: from || "",
      song: song || { url: "", start: 0, end: 0 },
      background: background || "#FAF7F2",
      createdAt: new Date().toISOString(),
    };

    bouquetStore.set(id, data);

    return NextResponse.json({ id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const data = bouquetStore.get(id);
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(data);
}
