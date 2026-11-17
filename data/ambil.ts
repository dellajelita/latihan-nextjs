import { type Event } from "@/data/events";
import { supabase } from "@/lib/supabase";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");

  if (error) {
    console.error("Gagal memuat events:", error.message);
    throw new Error("Gagal memuat event: " + error.message);
  }
  return data as Event[];
}

export async function ambilEvent(
  id: number | string,
): Promise<Event | undefined> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gagal memuat detail event:", error.message);
    return undefined;
  }
  return data as Event;
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id);

  if (error) {
    console.error("Gagal memuat event terkait:", error.message);
    return [];
  }
  return data as Event[];
}
