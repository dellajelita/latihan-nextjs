"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface HasilPesan {
  berhasil: boolean;
  pesan: string;
  galat: {
    nama?: string;
    email?: string;
    jumlah?: string;
  };
  isian: {
    nama: string;
    email: string;
  };
}

export async function pesanTiket(
  _sebelumnya: HasilPesan,
  formData: FormData,
): Promise<HasilPesan> {
  const eventId = Number(formData.get("eventId"));
  const nama = ((formData.get("nama") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const jumlah = Number(formData.get("jumlah"));

  const galat: HasilPesan["galat"] = {};
  if (!nama) galat.nama = "Nama pemesan wajib diisi.";
  if (!email || !email.includes("@")) galat.email = "Email tidak valid.";
  if (!Number.isInteger(jumlah) || jumlah < 1) {
    galat.jumlah = "Jumlah tiket minimal 1.";
  }

  if (Object.keys(galat).length > 0) {
    return {
      berhasil: false,
      pesan: "Periksa kembali isian formulir.",
      galat,
      isian: { nama, email },
    };
  }

  const { data: event, error: errEvent } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", eventId)
    .maybeSingle();

  if (errEvent || !event) {
    return {
      berhasil: false,
      pesan: "Event tidak ditemukan.",
      galat: {},
      isian: { nama, email },
    };
  }

  const sisa = event.kuota - event.terisi;
  if (jumlah > sisa) {
    return {
      berhasil: false,
      pesan: `Sisa tiket hanya ${sisa}.`,
      galat: { jumlah: `Maksimal ${sisa} tiket.` },
      isian: { nama, email },
    };
  }

  const { error: errInsert } = await supabaseAdmin.from("pesanan").insert({
    event_id: event.id,
    nama,
    email,
    jumlah,
    total: event.harga * jumlah,
  });

  if (errInsert) {
    return {
      berhasil: false,
      pesan: "Gagal menyimpan pesanan: " + errInsert.message,
      galat: {},
      isian: { nama, email },
    };
  }

  const { error: errUpdate } = await supabaseAdmin
    .from("events")
    .update({ terisi: event.terisi + jumlah })
    .eq("id", event.id);

  if (errUpdate) {
    return {
      berhasil: false,
      pesan:
        "Pesanan tersimpan, tetapi gagal memperbarui kuota: " +
        errUpdate.message,
      galat: {},
      isian: { nama, email },
    };
  }

  revalidatePath("/event");
  revalidatePath(`/event/${event.id}`);
  revalidatePath("/pesanan");
  redirect("/pesanan");
}

export async function batalkanPesanan(formData: FormData) {
  const nomor = Number(formData.get("nomor") ?? formData.get("id"));
  if (!Number.isInteger(nomor)) return;

  const { data: pesanan } = await supabaseAdmin
    .from("pesanan")
    .select("*")
    .eq("nomor", nomor)
    .maybeSingle();

  if (pesanan) {
    const { data: event } = await supabaseAdmin
      .from("events")
      .select("*")
      .eq("id", pesanan.event_id)
      .maybeSingle();

    if (event) {
      await supabaseAdmin
        .from("events")
        .update({ terisi: Math.max(0, event.terisi - pesanan.jumlah) })
        .eq("id", event.id);
    }

    await supabaseAdmin.from("pesanan").delete().eq("nomor", nomor);
  }

  revalidatePath("/event");
  revalidatePath("/pesanan");
  redirect("/pesanan");
}
