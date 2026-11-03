"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 border-b bg-white px-6 py-3">
      <span className="text-lg font-bold text-blue-600">EventKu</span>
      <Link
        href="/"
        className={
          pathname === "/"
            ? "font-bold text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }
      >
        Beranda
      </Link>
      <Link
        href="/event"
        className={
          pathname === "/event"
            ? "font-bold text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }
      >
        Event
      </Link>
      <Link
        href="/favorit"
        className={
          pathname === "/favorit"
            ? "font-bold text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }
      >
        Favorit
      </Link>
      <Link
        href="/tentang"
        className={
          pathname === "/tentang"
            ? "font-bold text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }
      >
        Tentang
      </Link>
      <Link
        href="/kontak"
        className={
          pathname === "/kontak"
            ? "font-bold text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }
      >
        Kontak
      </Link>
    </nav>
  );
}
