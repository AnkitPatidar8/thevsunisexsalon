
import { useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Appointment from "../components/Appointment";
import Team from "../components/Team";
import BeforeAfter from "../components/BeforeAfter";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";


export default function Home() {
  const [openBooking, setOpenBooking] = useState(false);

  const openBookingModal = () => setOpenBooking(true);
  const closeBookingModal = () => setOpenBooking(false);

  return (
    <>
      {/* Header */}
      <Header onBookClick={openBookingModal} />

      {/* Hero */}
      <Hero onBookClick={openBookingModal} />

      {/* Services */}
      <Services onBookClick={openBookingModal} />

      {/* Team */}
      <Team onBookClick={openBookingModal} />

      {/* Appointment Popup (CENTER MODAL) */}
      <Appointment
        open={openBooking}
        onClose={closeBookingModal}
      />

      {/* Other Sections */}
      <BeforeAfter />
      <Gallery />
      
      <Testimonials />
      {/* <AboutUs /> */}

      {/* Footer */}
      <Footer onBookClick={openBookingModal} />

       {/* 🔥 WHATSAPP FLOATING BUTTON */}
     
    </>
  );
}
