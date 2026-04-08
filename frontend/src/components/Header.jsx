


import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header({ onBookClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-zinc-900 text-white w-full sticky top-0 z-50 transition-all ${
        scrolled ? "shadow-lg shadow-black/40" : ""
      }`}
    >
      <div className="flex items-center justify-between px-3 md:px-8 py-3">

        {/* 🔥 Left: Logo + Name (Mobile + Desktop) */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/lg.png"
            alt="THE VS UNISEX SALON"
            className="h-10 md:h-20 object-contain"
          />

          {/* Mobile Name */}
          <span className="md:hidden text-sm font-semibold leading-tight">
           The VS Salon
          </span>
        </Link>

        {/* Desktop Center Menu (UNCHANGED) */}
        <div className="hidden md:flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-wide">
            THE VS UNISEX SALON
          </h1>

          <div className="flex gap-6 text-sm mt-2">
            <a href="/#services">Services</a>
            <Link to="/about">About Us</Link>
            <a href="/#team">Our Team</a>
            <a href="/#gallery">Gallery</a>
          </div>
        </div>

        {/* 🔥 Right Side (Mobile + Desktop) */}
        <div className="flex items-center gap-2">

          {/* Mobile Book Button */}
          <button
            onClick={onBookClick}
            className="md:hidden bg-yellow-500 text-black px-3 py-1.5 rounded-lg text-xs font-semibold active:scale-95"
          >
            Book
          </button>

          {/* Desktop Book Button */}
          <button
            onClick={onBookClick}
            className="hidden md:block bg-yellow-500 text-black px-5 py-2 rounded-xl hover:scale-105 transition"
          >
            Book Now
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu size={26} />
          </button>

        </div>
      </div>

      {/* Drawer (UNCHANGED) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 p-6 text-lg">
          <a href="/#services" onClick={() => setOpen(false)}>Services</a>
          <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
          <a href="/#team" onClick={() => setOpen(false)}>Our Team</a>
          <a href="/#gallery" onClick={() => setOpen(false)}>Gallery</a>

          <button
            onClick={() => {
              onBookClick();
              setOpen(false);
            }}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg mt-4"
          >
            Book Now
          </button>
        </nav>
      </div>
    </header>
  );
}