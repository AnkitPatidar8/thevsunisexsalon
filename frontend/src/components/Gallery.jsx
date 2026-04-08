

import { useState, useEffect } from "react";
import { Instagram, X, ChevronLeft, ChevronRight } from "lucide-react";
import anime from "animejs";

const images = [
  "/images/c1.jpg",
  "/images/gg3.jpeg",
  "/images/c2.jpg",
  "/images/gg5.jpeg",
  "/images/salon.jpeg",
  "/images/gg1.jpeg",
  "/images/gg2.jpeg",
  "/images/c4.jpg",
  "/images/c5.jpg",
  "/images/c6.jpg",
  "/images/c7.jpg",
  "/images/c8.jpg",
  "/images/gg4.jpeg",
  "/images/c9.jpg",
  "/images/c10.jpg",
  "/images/c11.jpg",
  "/images/c12.jpg",
];

export default function Gallery() {
  const [visible, setVisible] = useState(6);
  const [activeIndex, setActiveIndex] = useState(null);

  // 🔥 Entry Animation
  useEffect(() => {
    anime({
      targets: ".gallery-item",
      opacity: [0, 1],
      translateY: [40, 0],
      delay: anime.stagger(80),
      duration: 700,
      easing: "easeOutQuad",
    });
  }, [visible]);

  // 🔥 Modal Animation
  useEffect(() => {
    if (activeIndex !== null) {
      anime({
        targets: ".modal-img",
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  }, [activeIndex]);

  const handleClose = () => {
    anime({
      targets: ".modal-img",
      scale: [1, 0.9],
      opacity: [1, 0],
      duration: 200,
      easing: "easeInQuad",
      complete: () => setActiveIndex(null),
    });
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section id="gallery" className="py-16 bg-zinc-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
        Our <span className="text-yellow-500">Gallery</span>
      </h2>

      <p className="text-center text-gray-400 mb-10 text-sm">
        Real transformations. Real confidence ✨
      </p>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 columns-2 md:columns-3 gap-4 space-y-4">
        {images.slice(0, visible).map((img, i) => (
          <div
            key={i}
            className="gallery-item break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => setActiveIndex(i)}
          >
            <img
              src={img}
              className="w-full rounded-2xl transition duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
        {visible < images.length && (
          <button
            onClick={() => setVisible(visible + 4)}
            className="bg-yellow-500 text-black px-6 py-2.5 rounded-xl font-semibold active:scale-95"
          >
            Load More
          </button>
        )}

        <a
          href="https://www.instagram.com/the_vs_unisex_salon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-yellow-500 text-yellow-500 px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 hover:text-black transition"
        >
          <Instagram size={18} />
          Follow Instagram
        </a>
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">

          {/* Image */}
          <img
            src={images[activeIndex]}
            className="modal-img max-h-[80vh] rounded-2xl"
          />

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 bg-white text-black p-2 rounded-full"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 bg-white/20 p-2 rounded-full text-white"
          >
            <ChevronLeft />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 bg-white/20 p-2 rounded-full text-white"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}