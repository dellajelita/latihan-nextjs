"use client";

import { useState } from "react";
import KartuEvent from "@/components/KartuEvent";
import { type Event } from "@/data/events";
import Link from "next/link";

export default function FavoritPage() {
  const [favoritList, setFavoritList] = useState<Event[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("daftar_favorit"); // Sesuaikan kunci localStorage dengan yang dipakai di detail event ("daftar_favorit" atau "favorit")
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const hapusSemuaFavorit = () => {
    localStorage.removeItem("daftar_favorit");
    setFavoritList([]);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Favorit Saya</h1>
        {favoritList.length > 0 && (
          <button
            type="button"
            onClick={hapusSemuaFavorit}
            className="text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200 transition-colors"
          >
            Hapus Semua Favorit
          </button>
        )}
      </div>

      {favoritList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-4">
            Belum ada event yang ditambahkan ke daftar favorit.
          </p>
          <Link
            href="/event"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Jelajahi Event
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoritList.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
