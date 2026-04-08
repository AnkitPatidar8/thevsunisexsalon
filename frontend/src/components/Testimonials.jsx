
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  { name: "Neha", text: "Amazing service and friendly staff. Loved the ambience!" },
  { name: "Rohit", text: "Best fade and beard styling I’ve ever had 🔥" },
  { name: "Sneha", text: "Hair color turned out exactly how I wanted. Super happy!" },
  { name: "Kunal", text: "Professional team and premium service. Worth every penny." },
  { name: "Anjali", text: "My go-to salon for every occasion. Highly recommended 💯" },
  { name: "Vikas", text: "Stylish place with skilled barbers. Great experience!" },
  { name: "Ritu", text: "Makeup was flawless and long lasting. Loved it ❤️" },
  { name: "Sahil", text: "Perfect haircut every single time. Trustworthy salon." },
  { name: "Komal", text: "Very hygienic and well maintained. Staff is polite." },
  { name: "Arjun", text: "Modern styles and expert guidance. Totally satisfied." },
  { name: "Megha", text: "Bridal makeup was stunning. Got so many compliments 😍" },
  { name: "Nitin", text: "Quick service without compromising quality. Loved it." },
  { name: "Priya", text: "Relaxing experience and beautiful results. Thank you!" },
  { name: "Deepak", text: "Best salon in town. Clean, classy and professional." },
  { name: "Isha", text: "Staff listens carefully and delivers exactly what you want." },
  { name: "Mohit", text: "Excellent beard shaping and hair styling. Highly recommended." },
  { name: "Simran", text: "Loved the vibe and service. Definitely coming again 💕" },
  { name: "Akash", text: "Great experience every visit. Skilled and friendly team." },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const review = reviews[index];

  return (
    <section className="py-16 md:py-24 bg-zinc-900 text-center px-4">
      
      {/* Title */}
      <h2 className="text-3xl md:text-4xl text-white font-bold mb-10">
        What <span className="text-yellow-500">Clients Say</span>
      </h2>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-black/70 p-6 md:p-8 rounded-3xl border border-white/10 transition-all duration-500">

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-4 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
        </div>

        {/* Review */}
        <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
          “{review.text}”
        </p>

        {/* Name */}
        <h4 className="text-yellow-500 font-semibold">
          — {review.name}
        </h4>

      </div>
    </section>
  );
}