import { NextResponse } from "next/server";
import { events } from "@/data/events";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(event);
}
