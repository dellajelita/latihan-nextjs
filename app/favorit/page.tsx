"use client";

import { useState } from "react";

export default function FavoritPage() {
  // Gunakan fungsi callback pada useState untuk membaca localStorage langsung tanpa useEffect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favoritList, setFavoritList] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("favorit");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ... sisa kode komponen tetap sama ...
}
