import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-orange-800 shadow-md p-7 mb-6">
      <div className="container mx-auto flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <p className="text-2xl font-bold text-white font-serif text-center whitespace-nowrap">
          Gezdik Gördük Yazdık
        </p>
        <div className="space-x-6 text-white font-bold">
          <Link href="/" className="hover:text-amber-400">
            Anasayfa
          </Link>
          <Link href="#iletisim" className="hover:text-amber-400">
            İletişim
          </Link>
          <Link
            href="/blog-yaz"
            className="bg-white text-orange-800 px-4 py-2 rounded-2xl text-sm transition hover:bg-amber-400 hover:text-white"
          >
            Sen de yaz!
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
