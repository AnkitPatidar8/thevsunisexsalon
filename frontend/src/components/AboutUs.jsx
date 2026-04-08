

import Header from "./Header";
import Footer from "./Footer";
import { Award, Users, Sparkles } from "lucide-react";

export default function AboutUs() {
  return (
    <>
      <Header />

      <section id="about" className="py-28 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT : CEO IMAGE */}
          <div className="relative group">
            <div
              className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full opacity-0
            group-hover:opacity-100 transition duration-700"
            />

            <img
              src="/images/ceo.jpeg"
              alt="CEO"
              className="relative rounded-3xl w-full max-w-md mx-auto
            border border-white/10
            group-hover:scale-105 transition duration-700"
            />

            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2
            bg-black/80 backdrop-blur px-6 py-3 rounded-2xl
            border border-yellow-500/40 text-center"
            >
              <p className="text-yellow-500 font-bold text-lg">10+ Years</p>
              <p className="text-gray-400 text-sm">Industry Experience</p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight text-gray-400">
              About <span className="text-yellow-500">THE VS UNISEX SALON</span>
            </h2>

            <p className="text-gray-400 leading-relaxed">
              At THE VS UNISEX SALON, we believe grooming is not just a service —
              it’s an experience. Founded with a vision to redefine style,
              confidence, and self-expression.
            </p>

            {/* CEO */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-5">
              <h4 className="text-xl font-semibold text-yellow-500">
                Vishal Solanki
              </h4>
              <p className="text-sm text-gray-400 mb-2">Founder & CEO</p>

              <p className="text-gray-300 text-sm leading-relaxed">
                “My goal is simple — every client should walk out feeling
                confident, stylish, and proud.”
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-6 pt-4">

              <div className="bg-black/70 border border-white/10 rounded-2xl p-6
              hover:border-yellow-500 hover:-translate-y-2 transition">
                <Award className="text-yellow-500 mb-3" />
                <h5 className="font-semibold mb-1 text-white">Premium Quality</h5>
                <p className="text-sm text-gray-400">
                  Top products & latest techniques
                </p>
              </div>

              <div className="bg-black/70 border border-white/10 rounded-2xl p-6
              hover:border-yellow-500 hover:-translate-y-2 transition">
                <Users className="text-yellow-500 mb-3" />
                <h5 className="font-semibold mb-1 text-white">Expert Team</h5>
                <p className="text-sm text-gray-400">
                  Certified & experienced stylists
                </p>
              </div>

              <div className="bg-black/70 border border-white/10 rounded-2xl p-6
              hover:border-yellow-500 hover:-translate-y-2 transition">
                <Sparkles className="text-yellow-500 mb-3" />
                <h5 className="font-semibold mb-1 text-white">Luxury Experience</h5>
                <p className="text-sm text-gray-400">
                  Comfort, hygiene & style combined
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
