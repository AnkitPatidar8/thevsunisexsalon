

import { Star, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Anjali Pal",
    role: "Beauty Makeup Artist",
    experience: "7+ Years Experience • 485+ Clients",
    image: "/images/anjali.jpeg",
    rating: "5.0",
  },
  {
    name: "Shubham Sen",
    role: "Hair Specialist",
    experience: "5+ Years Experience • 3545+ Clients",
    image: "/images/shubham.jpeg",
    rating: "4.7",
  },
  {
    name: "Vishal Solanki",
    role: "Master Hairstylist",
    experience: "8+ Years Experience • 1485+ Clients",
    image: "/images/vishal.jpeg",
    rating: "4.9",
  },
  {
    name: "Yash Bhati",
    role: "Professional Unisex Hair Styling Expert",
    experience: "6+ Years Experience • 8185+ Clients",
    image: "/images/yash.jpeg",
    rating: "4.8",
  },
];

export default function Team({ onBookClick }) {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleClick = (name, index) => {
    setLoadingIndex(index);
    setTimeout(() => {
      onBookClick(name);
      setLoadingIndex(null);
    }, 600);
  };

  return (
    <section id="team" className="py-16 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl md:text-5xl text-white font-bold text-center mb-4">
          Meet Our <span className="text-yellow-500">Experts</span>
        </h2>

        <p className="text-gray-400 text-center mb-10 text-sm md:text-base">
          Premium stylists. Instant booking. Luxury experience.
        </p>

        {/* ✅ FIXED MOBILE SLIDER */}
        <div className="
          flex md:grid md:grid-cols-4 gap-6
          overflow-x-auto md:overflow-visible
          scroll-smooth snap-x snap-mandatory
          pb-4
        ">

          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="
                min-w-[85%] sm:min-w-[60%] md:min-w-0
                snap-center
                rounded-2xl overflow-hidden
                bg-white/5 backdrop-blur-lg
                border border-white/10 shadow-xl group
              "
            >

              {/* Image */}
              <div className="relative aspect-[5/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full text-yellow-400 text-xs">
                  <Star size={12} fill="currentColor" />
                  {member.rating}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>

                <p className="text-yellow-500 text-xs mb-1">
                  {member.role}
                </p>

                <p className="text-gray-400 text-xs mb-4">
                  {member.experience}
                </p>

                <button
                  onClick={() => handleClick(member.name, index)}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-2.5 rounded-xl font-semibold hover:bg-yellow-400 active:scale-95 transition-all duration-200"
                >
                  {loadingIndex === index ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Opening...
                    </>
                  ) : (
                    <>
                      <CalendarCheck size={16} />
                      Book Now
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}