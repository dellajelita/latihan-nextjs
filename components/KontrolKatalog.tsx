"use client";

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  daftarKategori,
  urut,
  setUrut,
  hanyaAdaTiket,
  setHanyaAdaTiket,
  hargaMaks,
  setHargaMaks,
}: any) {
  return (
    <div className="mb-4 flex flex-wrap gap-3 items-center">
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2 text-sm"
      />
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="rounded border bg-white px-3 py-2 text-sm"
      >
        {daftarKategori.map((k: string) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <select
        value={urut}
        onChange={(e) => setUrut(e.target.value)}
        className="rounded border bg-white px-3 py-2 text-sm"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={hanyaAdaTiket}
          onChange={(e) => setHanyaAdaTiket(e.target.checked)}
          className="rounded border-slate-300"
        />
        Hanya yang masih ada tiket
      </label>

      <input
        type="number"
        value={hargaMaks}
        onChange={(e) => setHargaMaks(e.target.value)}
        placeholder="Harga maksimal"
        className="rounded border bg-white px-3 py-2 text-sm w-36"
      />
    </div>
  );
}
