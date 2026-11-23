"use client";

export default function TombolHapusEvent({ judul }: { judul: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(`Yakin ingin menghapus event "${judul}"?`)) {
          e.preventDefault();
        }
      }}
      className="text-red-600 underline"
    >
      Hapus
    </button>
  );
}
