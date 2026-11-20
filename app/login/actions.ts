"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

const COOKIE_GAGAL = "gagal_login";
const COOKIE_BLOKIR = "blokir_login";
const BATAS_GAGAL = 5;

function sandiSamaAman(input: string, target: string): boolean {
  if (!input || !target) return false;

  const digestInput = createHash("sha256").update(input).digest();
  const digestTarget = createHash("sha256").update(target).digest();

  return timingSafeEqual(digestInput, digestTarget);
}

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const penyimpanCookie = await cookies();

  // Cek apakah sedang dalam masa blokir 1 menit
  if (penyimpanCookie.get(COOKIE_BLOKIR)?.value === "1") {
    return {
      pesan: "Terlalu banyak percobaan gagal. Coba lagi dalam 1 menit.",
    };
  }

  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");

  if (!sandiSamaAman(sandi, process.env.ADMIN_PASSWORD ?? "")) {
    const gagalLama = Number(penyimpanCookie.get(COOKIE_GAGAL)?.value ?? "0");
    const gagalBaru = gagalLama + 1;

    if (gagalBaru >= BATAS_GAGAL) {
      penyimpanCookie.set(COOKIE_BLOKIR, "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/login",
        maxAge: 60, // blokir 1 menit
      });
      penyimpanCookie.delete(COOKIE_GAGAL);

      return {
        pesan: "Terlalu banyak percobaan gagal. Coba lagi dalam 1 menit.",
      };
    }

    penyimpanCookie.set(COOKIE_GAGAL, String(gagalBaru), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/login",
      maxAge: 60 * 5,
    });

    return { pesan: "Kata sandi salah." };
  }

  // Jika berhasil login, bersihkan cookie gagal & blokir
  penyimpanCookie.delete(COOKIE_GAGAL);
  penyimpanCookie.delete(COOKIE_BLOKIR);

  penyimpanCookie.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true, // tidak terbaca oleh JavaScript di browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  // hanya boleh kembali ke halaman admin (mencegah dilempar ke situs lain)
  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  const penyimpanCookie = await cookies();
  penyimpanCookie.delete(NAMA_COOKIE);
  redirect("/login");
}
