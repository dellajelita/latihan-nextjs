import KontrolKatalog from "@/components/KontrolKatalog";
import Halaman from "@/components/Halaman";
import KartuEvent from "@/components/KartuEvent";
import { events } from "@/data/events";
import { bacaSaringan, saringEvents, PER_HALAMAN } from "@/data/saring";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const s = bacaSaringan(params);

  const daftarKategori = [
    "Semua",
    ...Array.from(new Set(events.map((e) => e.kategori))),
  ];
  const semuaEventSaring = saringEvents(events, s);

  const jumlahHalaman = Math.ceil(semuaEventSaring.length / PER_HALAMAN);
  const halAktif = Math.min(s.hal, jumlahHalaman || 1);
  const eventTampil = semuaEventSaring.slice(
    (halAktif - 1) * PER_HALAMAN,
    halAktif * PER_HALAMAN,
  );

  const totalSisaTiket = semuaEventSaring.reduce(
    (acc, e) => acc + (e.kuota - e.terisi),
    0,
  );
  const rataRataHarga =
    semuaEventSaring.length > 0
      ? Math.round(
          semuaEventSaring.reduce((acc, e) => acc + e.harga, 0) /
            semuaEventSaring.length,
        )
      : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Katalog Event</h1>

      <KontrolKatalog
        key={JSON.stringify(s)}
        s={s}
        daftarKategori={daftarKategori}
      />

      <div className="mb-4 text-sm text-gray-600">
        {semuaEventSaring.length} event ditemukan · Rata-rata harga Rp{" "}
        {rataRataHarga.toLocaleString("id-ID")} · Total sisa tiket{" "}
        {totalSisaTiket}
      </div>

      {eventTampil.length === 0 ? (
        <p className="text-gray-500">Tidak ada event yang cocok.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventTampil.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}

      <Halaman s={s} hal={halAktif} jumlah={jumlahHalaman} />
    </div>
  );
}
