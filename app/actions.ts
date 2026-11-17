"use server";

import { pesanan } from "@/data/pesanan";
import { events, type Event } from "@/data/events";
import { redirect } from "next/navigation";

export interface Pesanan {
  nomor: number;
  eventId: number;
  judul: string;
  nama: string;
  email: string;
  jumlah: number;
  total: number;
  waktu: string;
}

export async function tambahPesanan(formData: FormData) {
  const eventId = Number(formData.get("eventId"));
  const nama = (formData.get("nama") as string) || "Della Jelita";
  const email = (formData.get("email") as string) || "";
  const jumlah = Number(formData.get("jumlah")) || 1;

  const event = events.find((e: Event) => Number(e.id) === eventId);
  if (!event) return;

  // Tambah jumlah terisi agar sisa tiket di event berkurang
  event.terisi += jumlah;

  const pesananBaru: Pesanan = {
    nomor: pesanan.length + 1,
    eventId: Number(event.id), // Pastikan berupa number
    judul: event.judul,
    nama: nama,
    email: email,
    jumlah: jumlah,
    total: event.harga * jumlah,
    waktu: new Date().toLocaleDateString(),
  };

  pesanan.push(pesananBaru);

  redirect("/pesanan");
}

export async function batalkanPesanan(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  const index = pesanan.findIndex((p: Pesanan) => Number(p.nomor) === nomor);

  if (index !== -1) {
    const p = pesanan[index];
    // Menggunakan Number() agar tipe data string dan number aman saat dibandingkan
    const event = events.find((e: Event) => Number(e.id) === Number(p.eventId));
    if (event) {
      event.terisi = Math.max(0, event.terisi - p.jumlah);
    }
    pesanan.splice(index, 1);
  }

  redirect("/pesanan");
}
