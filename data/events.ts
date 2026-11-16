export type Event = {
  id: string;
  judul: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  kategori: string;
  harga: number;
  kuota: number;
  terisi: number;
  gambar?: string;
};

export function rupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

export const events: Event[] = [
  {
    id: "1",
    judul: "Workshop React untuk Pemula",
    tanggal: "2026-11-14",
    lokasi: "Lab RPL",
    deskripsi: "Belajar dasar React dari nol...",
    kategori: "Workshop",
    harga: 50000,
    kuota: 50,
    terisi: 32,
    gambar: "/img/event-1.png",
  },
  {
    id: "2",
    judul: "Turnamen Futsal Antar Kelas",
    tanggal: "2026-11-20",
    lokasi: "Lapangan Sekolah",
    deskripsi: "Ajang sportivitas antar kelas...",
    kategori: "Olahraga",
    harga: 0,
    kuota: 32,
    terisi: 32,
    gambar: "/img/event-2.png",
  },
  {
    id: "3",
    judul: "Konser Musik Akustik",
    tanggal: "2026-11-27",
    lokasi: "Aula",
    deskripsi: "Pentas seni musik akustik...",
    kategori: "Musik",
    harga: 25000,
    kuota: 100,
    terisi: 46,
    gambar: "/img/event-3.png",
  },
  {
    id: "4",
    judul: "Bazar Karya Siswa",
    tanggal: "2026-12-03",
    lokasi: "Halaman Depan",
    deskripsi: "Pameran hasil project kewirausahaan...",
    kategori: "Bazar",
    harga: 0,
    kuota: 500,
    terisi: 241,
    gambar: "/img/event-4.png",
  },
  {
    id: "5",
    judul: "Pelatihan Desain Poster",
    tanggal: "2026-12-05",
    lokasi: "Lab Multimedia",
    deskripsi: "Workshop kilat desain grafis...",
    kategori: "Workshop",
    harga: 35000,
    kuota: 40,
    terisi: 40,
    gambar: "/img/event-5.png",
  },
  {
    id: "6",
    judul: "Lomba Cerdas Cermat",
    tanggal: "2026-12-10",
    lokasi: "Aula",
    deskripsi: "Uji wawasan akademik antar tingkat...",
    kategori: "Lomba",
    harga: 10000,
    kuota: 60,
    terisi: 18,
    gambar: "/img/event-6.png",
  },
];
