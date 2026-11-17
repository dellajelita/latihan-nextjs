"use client";

import Image from "next/image";
import Link from "next/link";
import { events, rupiah, type Event } from "@/data/events";
import { useParams } from "next/navigation";
import { useState } from "react";
import { tambahPesanan } from "@/app/actions";

export default function DetailEventPage() {
  const params = useParams();
  const id = params?.id;

  const event = events.find((e: Event) => String(e.id) === String(id));

  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("Della Jelita");

  // Inisialisasi state favorit langsung dari localStorage tanpa useEffect untuk menghindari error linter
  const [isFavorit, setIsFavorit] = useState<boolean>(() => {
    if (typeof window === "undefined" || !event) return false;
    try {
      const existingFavorit = JSON.parse(
        localStorage.getItem("daftar_favorit") || "[]",
      );
      return existingFavorit.some(
        (fav: Event) => Number(fav.id) === Number(event.id),
      );
    } catch {
      return false;
    }
  });

  if (!event) {
    return (
      <main className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">Event tidak ditemukan</h1>
        <p className="text-sm text-slate-500 mt-1">
          Mungkin event ini sudah dihapus atau alamatnya salah.
        </p>
        <Link
          href="/event"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Kembali ke katalog
        </Link>
      </main>
    );
  }

  const sisaTiket = event.kuota - event.terisi;
  const eventTerkait = events
    .filter(
      (e: Event) =>
        e.kategori === event.kategori && String(e.id) !== String(event.id),
    )
    .slice(0, 2);

  const toggleFavorit = () => {
    const existingFavorit = JSON.parse(
      localStorage.getItem("daftar_favorit") || "[]",
    );
    let updatedFavorit;

    if (isFavorit) {
      updatedFavorit = existingFavorit.filter(
        (fav: Event) => Number(fav.id) !== Number(event.id),
      );
      setIsFavorit(false);
    } else {
      updatedFavorit = [event, ...existingFavorit];
      setIsFavorit(true);
    }

    localStorage.setItem("daftar_favorit", JSON.stringify(updatedFavorit));
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <article className="bg-white rounded-xl border p-6 shadow-sm">
        <div className="relative mb-4 aspect-[40/21] w-full">
          <Image
            src={event.gambar ?? "/img/default.png"}
            alt={event.judul}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            priority
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              {event.kategori}
            </span>
            <h1 className="mt-2 text-2xl font-bold">{event.judul}</h1>
            <p className="text-sm text-slate-500 mt-1">
              {event.tanggal} · {event.lokasi}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleFavorit}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-medium"
            title={isFavorit ? "Hapus dari favorit" : "Tambah ke favorit"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 transition-colors ${
                isFavorit
                  ? "text-red-500 fill-red-500"
                  : "text-slate-400 fill-none"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed">{event.deskripsi}</p>

        <div className="mt-6 border-t pt-4">
          <p className="text-lg font-bold">{rupiah(event.harga)}</p>
          <p className="text-sm text-slate-500">
            {sisaTiket > 0
              ? `Sisa ${sisaTiket} dari ${event.kuota} tiket`
              : "Tiket habis"}
          </p>
        </div>

        {/* Form Pesan Tiket */}
        <section className="mt-8 border-t pt-6">
          <h2 className="text-lg font-bold mb-4">Pesan tiket</h2>
          {sisaTiket > 0 ? (
            <form action={tambahPesanan} className="space-y-4">
              <input type="hidden" name="eventId" value={event.id} />
              <div>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="jumlah"
                  min="1"
                  max={sisaTiket}
                  value={jumlah}
                  onChange={(e) => setJumlah(Number(e.target.value))}
                  className="w-24 rounded border p-2 text-sm"
                />
              </div>
              <p className="font-bold text-sm">
                Total: {rupiah(event.harga * jumlah)}
              </p>
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Pesan
              </button>
            </form>
          ) : (
            <p className="text-sm text-red-600 font-medium">
              Maaf, tiket untuk event ini sudah habis.
            </p>
          )}
        </section>

        {/* Event Terkait */}
        {eventTerkait.length > 0 && (
          <section className="mt-8 border-t pt-6">
            <h3 className="font-bold mb-2">Event terkait</h3>
            <ul className="space-y-1">
              {eventTerkait.map((item: Event) => (
                <li key={item.id}>
                  <Link
                    href={`/event/${item.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {item.judul}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
