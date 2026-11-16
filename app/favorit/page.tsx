"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import KartuEvent from "@/components/KartuEvent";

export default function FavoritPage() {
  const [favoritList, setFavoritList] = useState<any[]>([]);

  useEffect(() => {
    const storedFav = localStorage.getItem("daftar_favorit");
    if (storedFav) {
      try {
        setFavoritList(JSON.parse(storedFav));
      } catch (e) {
        setFavoritList([]);
      }
    }
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Event Favorit</h1>

      {favoritList.length === 0 ? (
        <div className="text-center py-12 border rounded-xl bg-white shadow-sm">
          <p className="text-slate-500 mb-4">Belum ada favorit.</p>
          <Link
            href="/event"
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            Pilih event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritList.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
