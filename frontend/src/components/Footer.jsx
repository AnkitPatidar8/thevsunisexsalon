


import { Instagram, Facebook, Phone, MapPin,Clock8  } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-400 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-6 pb-12">

        {/* Brand */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">
            THE VS UNISEX SALON
          </h3>

          <p className="text-sm leading-relaxed mb-4">
            Premium unisex salon offering modern grooming, styling & beauty
            services by expert professionals.
          </p>

          <a href="/">
            <img
              className="h-16 md:h-20"
              src="/images/lg.png"
              alt="logo"
            />
          </a>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>

          <ul className="space-y-2 text-sm">
            <li>Haircut</li>
            <li>Hair Color</li>
            <li>Makeup</li>
            <li>Bridal Makeup</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>

          <ul className="space-y-3 text-sm">

            <li className="flex items-start gap-2">
              <MapPin size={30} className="mt-1 text-yellow-500" />
              <a
                href="https://maps.google.com/?q=Business Island Nipania Indore"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500"
              >
                G-6 Business Island, Samar Park Gate No.2  
                Main Road Nipania, Indore
              </a>
            </li>

            <li>
              <a
                href="tel:+919340218053"
                className="hover:text-yellow-500 flex items-center gap-2"
              >
                <Phone size={20} className="text-yellow-500" />
                +91 93402 18053
              </a>
            </li>
            <li>
              <a
                href="tel:+919340218053"
                className="hover:text-yellow-500 flex items-center gap-2"
              >
                <Clock8 size={20} className="text-yellow-500" />
                9 AM – 10 PM
              </a>
            </li>
                
                
            

          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>

          <div className="flex gap-4">

            <a
              href="https://www.instagram.com/the_vs_unisex_salon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-black rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-black rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <Facebook size={20} />
            </a>

            <a
              href="tel:+919340218053"
              className="p-3 bg-black rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <Phone size={20} />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-4 text-sm">
        © {new Date().getFullYear()} developed by{" "}
        <a
          href="https://ankit-patidar-portfolio.netlify.app/"
          className="text-yellow-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ankit Patidar
        </a>. All Rights Reserved.
      </div>
    </footer>
  );
}