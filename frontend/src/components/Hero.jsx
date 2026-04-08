

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <section className="w-full h-[85vh] md:h-screen bg-zinc-900">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full"
      >
        <SwiperSlide>
          <Slide image="/images/new.jpg" video="/videos/slide2.mp4" />
        </SwiperSlide>

        <SwiperSlide>
          <Slide image="/images/salon.jpeg" video="/videos/slide5.mp4" />
        </SwiperSlide>

        <SwiperSlide>
          <Slide image="/images/t3.jpg" video="/videos/slide4.mp4" />
        </SwiperSlide>

        <SwiperSlide>
          <Slide image="/images/new2.jpg" video="/videos/slide3.mp4" />
        </SwiperSlide>

        <SwiperSlide>
          <Slide image="/images/Whasalon.jpeg" video="/videos/slide7.mp4" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

function Slide({ image, video }) {
  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">

      {/* ✅ Desktop Image */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* ✅ Mobile Video */}
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="block md:hidden absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <HeroContent />
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative text-center px-6">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
        THE VS UNISEX SALON
      </h1>

      

      <button
          
          >
            Book Now
          </button>
    </div>
  );
}