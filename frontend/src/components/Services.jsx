

import { Scissors, Sparkles, Palette, Smile, Crown } from "lucide-react";

const services = [
  {
    title: "Haircut",
    desc: "Trendy & classic cuts by expert stylists",
    icon: Scissors,
    price: 199,
  },
  {
    title: "Hair Styling",
    desc: "Professional styling for every occasion",
    icon: Sparkles,
    price: 499,
  },
  {
    title: "Hair Color",
    desc: "Premium global colors & highlights",
    icon: Palette,
    price: 699,
  },
  {
    title: "Facial",
    desc: "Glow & skin rejuvenation treatments",
    icon: Smile,
    price: 799,
  },
  {
    title: "Makeup",
    desc: "Party & special occasion makeup",
    icon: Crown,
    price: 1499,
  },
  {
    title: "Bridal Makeup",
    desc: "Luxury bridal & pre-bridal looks",
    icon: Crown,
    price: 5999,
  },
];

export default function Services({ onBookClick }) {
  return (
    <section id="services" className="py-16 md:py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-yellow-500">Our Premium Services</span>
        </h2>

        <p className="text-gray-400 text-center mb-12 md:mb-16 text-sm md:text-base">
          Experience luxury grooming with expert professionals
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group bg-black/70 backdrop-blur border border-white/10 rounded-3xl p-6 md:p-8 text-center
                hover:-translate-y-2 hover:border-yellow-500/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 flex items-center justify-center
                rounded-full bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition">
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl text-slate-300 font-semibold mb-2 group-hover:text-yellow-500 transition">
                  {service.title}
                </h3>

                {/* Price */}
                <p className="text-yellow-500 font-semibold mb-3 text-sm md:text-base">
                  Start just ₹{service.price}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6">
                  {service.desc}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-center flex-wrap">

                  <button
                    onClick={onBookClick}
                    className="text-sm text-yellow-500 border border-yellow-500/40 px-5 py-2 rounded-full
                    hover:bg-yellow-500 hover:text-black transition"
                  >
                    Book Now
                  </button>

                  <a
                    href="https://wa.me/919340218053?text=May%20I%20help%20you%20with%20salon%20services%20?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-yellow-500 border border-yellow-500/40 px-5 py-2 rounded-full
                    hover:bg-yellow-500 hover:text-black transition"
                  >
                    Get Info
                  </a>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}