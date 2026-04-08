

import { useState } from "react";

const gallery = [
  {
    before: "/images/b1.jpeg",
    after: "/images/a1.jpeg",
    title: "Hair Transformation",
  },
  {
    before: "/images/b2.png",
    after: "/images/a2.png",
    title: "Makeup Look",
  },
  {
    before: "/images/p1.jpg",
    after: "/images/after2.jpg",
    title: "Makeup Look",
  },
];

function BeforeAfterCard({ before, after, title }) {
  const [slider, setSlider] = useState(50);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const percent = (x / rect.width) * 100;
    setSlider(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div
      className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden cursor-ew-resize group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image */}
      <img
        src={after}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${slider}%` }}
      >
        <img src={before} className="w-full h-full object-cover" />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white"
        style={{ left: `${slider}%` }}
      />

      {/* Circle Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-black shadow"
        style={{ left: `calc(${slider}% - 12px)` }}
      />

      {/* Labels */}
      <div className="absolute top-3 left-3 text-xs bg-black/60 px-2 py-1 rounded text-white">
        Before
      </div>
      <div className="absolute top-3 right-3 text-xs bg-black/60 px-2 py-1 rounded text-white">
        After
      </div>

      {/* Title */}
      <div className="absolute bottom-0 w-full bg-black/70 text-center py-2">
        <p className="text-yellow-500 text-sm font-semibold">{title}</p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="py-6 bg-zinc-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
        Before <span className="text-yellow-500">/ After</span>
      </h2>
      <p className="text-gray-400 text-center mb-12 md:mb-16 text-sm md:text-base">
        Real results, real transformations – see the difference our expertise
        makes. Before meets after – redefining confidence with every makeover.
      </p>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {gallery.map((item, i) => (
          <BeforeAfterCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
