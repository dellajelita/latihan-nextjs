import Link from "next/link";
import type { Saringan } from "@/data/saring";
import { alamatHalaman } from "@/data/saring";

export default function Halaman({
  s,
  hal,
  jumlah,
}: {
  s: Saringan;
  hal: number;
  jumlah: number;
}) {
  // 4. Tidak menampilkan apa pun bila hanya ada satu halaman
  if (jumlah <= 1) return null;

  return (
    <div className="mt-6 flex items-center gap-2">
      {/* 1. Tautan « Sebelumnya (tidak tampil di halaman 1) */}
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border bg-white px-3 py-1 text-sm hover:bg-gray-50"
        >
          &laquo; Sebelumnya
        </Link>
      )}

      {/* 2. Tautan nomor 1 sampai jumlah, nomor aktif tampil berbeda (biru & tebal) */}
      {Array.from({ length: jumlah }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={alamatHalaman(s, n)}
          className={`rounded border px-3 py-1 text-sm ${
            n === hal
              ? "bg-blue-600 font-bold text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          {n}
        </Link>
      ))}

      {/* 3. Tautan Berikutnya » (tidak tampil di halaman terakhir) */}
      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border bg-white px-3 py-1 text-sm hover:bg-gray-50"
        >
          Berikutnya &raquo;
        </Link>
      )}
    </div>
  );
}