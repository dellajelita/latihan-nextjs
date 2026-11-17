import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import KartuEvent from "@/components/KartuEvent";

export default async function KatalogEvent({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const semua = await ambilEvents();
  const daftarKategori = ["Semua", ...new Set(semua.map((e) => e.kategori))];

  const hasil =
    kategori && kategori !== "Semua"
      ? semua.filter((e) => e.kategori.toLowerCase() === kategori.toLowerCase())
      : semua;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Semua Event</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {daftarKategori.map((kat) => {
          const aktif = (kategori ?? "Semua") === kat;
          return (
            <Link
              key={kat}
              href={kat === "Semua" ? "/event" : `/event?kategori=${kat}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                aktif
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {kat}
            </Link>
          );
        })}
      </div>

      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada event pada kategori ini.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
