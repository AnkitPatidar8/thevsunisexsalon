
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 sm:gap-3 z-50">

      {/* WhatsApp */}
      <a
        href="https://wa.me/919340218053"
        target="_blank"
        rel="noopener noreferrer"
        className="
        bg-green-500 text-white 
        p-3 sm:p-4 
        rounded-full 
        shadow-lg 
        hover:scale-110 active:scale-95
        transition duration-300
        flex items-center justify-center
        "
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* Call */}
      <a
        href="tel:+919340218053"
        className="
        bg-yellow-500 text-black 
        p-3 sm:p-4 
        rounded-full 
        shadow-lg 
        hover:scale-110 active:scale-95
        transition duration-300
        flex items-center justify-center
        "
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

    </div>
  );
}