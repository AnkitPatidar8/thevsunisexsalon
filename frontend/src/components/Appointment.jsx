// import { CalendarDays, User, Scissors, Clock, X } from "lucide-react";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import API from "../config/api";

// export default function AppointmentModal({ open, onClose }) {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [service, setService] = useState("");
//   const [stylist, setStylist] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   const timeSlots = [
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "12:00 PM - 01:00 PM",
//     "01:00 PM - 02:00 PM",
//     "02:00 PM - 03:00 PM",
//     "03:00 PM - 04:00 PM",
//     "04:00 PM - 05:00 PM",
//     "05:00 PM - 06:00 PM",
//     "06:00 PM - 07:00 PM",
//     "07:00 PM - 08:00 PM",
//     "08:00 PM - 09:00 PM",
//   ];

//   const handleBooking = async () => {
//     if (!name || !mobile || !service || !stylist || !date || !time) {
//       return alert("All fields required");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${API}/appointments`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           mobile,
//           service,
//           stylist,
//           date,
//           time,
//         }),
//       });

//       console.log("Status:", res.status);

//       if (res.status === 200 || res.status === 201) {
//         Swal.fire({
//           title: "Your appointment is booked",
//           icon: "success",
//           theme: "dark",
//         });

//         onClose();

//         setName("");
//         setMobile("");
//         setService("");
//         setStylist("");
//         setDate("");
//         setTime("");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong!",
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "Server not responding",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div onClick={onClose} className="fixed inset-0 bg-black/70 z-40" />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-6 relative">

//           {/* Close */}
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 text-white hover:text-yellow-500"
//           >
//             <X />
//           </button>

//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center text-white mb-6">
//             Book <span className="text-yellow-500">Appointment</span>
//           </h2>

//           <div className="space-y-4">

//             {/* Name */}
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             />

//             {/* Mobile */}
//             <input
//               type="tel"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800   text-white"
//             />

//             {/* Service */}
//             <select
//               value={service}
//               onChange={(e) => setService(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Service</option>
//               <option>Haircut</option>
//               <option>Hair Styling</option>
//               <option>Facial</option>
//               <option>Makeup</option>
//             </select>

//             {/* Stylist */}
//             <select
//               value={stylist}
//               onChange={(e) => setStylist(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Stylist</option>
//               <option>Vishal</option>
//               <option>Shubham</option>
//               <option>Yash</option>
//               <option>Rishika</option>
//             </select>

//             {/* Date */}
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//               placeholder="Date"
//             />

//             {/* Time */}
//             <select
//               value={time}
//               disabled={!date}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white disabled:opacity-50"
//             >
//               <option value="">Select Time</option>
//               {timeSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>

//             {/* Button */}
//             <button
//               onClick={handleBooking}
//               disabled={loading}
//               className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
//                   Booking...
//                 </>
//               ) : (
//                 "Confirm Booking"
//               )}
//             </button>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import { X } from "lucide-react";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import API from "../config/api";

// export default function AppointmentModal({ open, onClose }) {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [service, setService] = useState("");
//   const [stylist, setStylist] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   const timeSlots = [
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "12:00 PM - 01:00 PM",
//     "01:00 PM - 02:00 PM",
//     "02:00 PM - 03:00 PM",
//     "03:00 PM - 04:00 PM",
//     "04:00 PM - 05:00 PM",
//     "05:00 PM - 06:00 PM",
//     "06:00 PM - 07:00 PM",
//     "07:00 PM - 08:00 PM",
//     "08:00 PM - 09:00 PM",
//   ];

//   // ✅ Today date (for min date)
//   const today = new Date().toISOString().split("T")[0];

//   // ✅ Filter time slots for same day
//   const getFilteredSlots = () => {
//     if (!date) return timeSlots;

//     const selectedDate = new Date(date);
//     const now = new Date();

//     if (selectedDate.toDateString() !== now.toDateString()) {
//       return timeSlots;
//     }

//     const currentHour = now.getHours();

//     return timeSlots.filter((slot) => {
//       let hour = parseInt(slot.split(":")[0]);
//       if (slot.includes("PM") && hour !== 12) hour += 12;
//       if (slot.includes("AM") && hour === 12) hour = 0;

//       return hour > currentHour;
//     });
//   };

//   // ✅ Form validation
//   const validateForm = () => {
//     if (!name || !mobile || !service || !stylist || !date || !time) {
//       Swal.fire({
//         icon: "warning",
//         title: "All fields required",
//         theme: "dark",
//       });
//       return false;
//     }

//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Mobile Number",
//         text: "Enter valid 10-digit number",
//         theme: "dark",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleBooking = async () => {
//     if (!validateForm()) return;

//     try {
//       setLoading(true);

//       const res = await fetch(`${API}/appointments`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           mobile,
//           service,
//           stylist,
//           date,
//           time,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           title: "Booked Successfully 🎉",
//           html: `
//             <p><b>${service}</b> with <b>${stylist}</b></p>
//             <p>${date} • ${time}</p>
//           `,
//           icon: "success",
//           theme: "dark",
//         });

//         // reset
//         setName("");
//         setMobile("");
//         setService("");
//         setStylist("");
//         setDate("");
//         setTime("");

//         onClose();
//       } else {
//         throw new Error(data.message || "Booking failed");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Server not responding",
//         theme: "dark",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;

//   const isFormValid =
//     name && mobile && service && stylist && date && time;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black/70 z-40"
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="w-full max-w-md bg-zinc-900 rounded-3xl p-6 relative shadow-2xl"
//         >
//           {/* Close */}
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 text-white hover:text-yellow-500"
//           >
//             <X />
//           </button>

//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center text-white mb-6">
//             Book <span className="text-yellow-500">Appointment</span>
//           </h2>

//           <div className="space-y-4">
//             {/* Name */}
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white focus:outline-none"
//             />

//             {/* Mobile */}
//             <input
//               type="tel"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white focus:outline-none"
//             />

//             {/* Service */}
//             <select
//               value={service}
//               onChange={(e) => setService(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Service</option>
//               <option>Haircut</option>
//               <option>Hair Styling</option>
//               <option>Facial</option>
//               <option>Makeup</option>
//             </select>

//             {/* Stylist */}
//             <select
//               value={stylist}
//               onChange={(e) => setStylist(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Stylist</option>
//               <option>Vishal</option>
//               <option>Shubham</option>
//               <option>Yash</option>
//               <option>Rishika</option>
//             </select>

//             {/* Date */}
//             <input
//               type="date"
//               min={today}
//               value={date}
//               onChange={(e) => {
//                 setDate(e.target.value);
//                 setTime("");
//               }}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             />

//             {/* Time */}
//             <select
//               value={time}
//               disabled={!date}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white disabled:opacity-50"
//             >
//               <option value="">Select Time</option>
//               {getFilteredSlots().map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>

//             {/* Button */}
//             <button
//               onClick={handleBooking}
//               disabled={!isFormValid || loading}
//               className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
//                   Booking...
//                 </>
//               ) : (
//                 "Confirm Booking"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import { X } from "lucide-react";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import API from "../config/api";

// export default function AppointmentModal({ open, onClose }) {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [service, setService] = useState("");
//   const [stylist, setStylist] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ NEW
//   const [bookedSlots, setBookedSlots] = useState([]);

//   const timeSlots = [
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "12:00 PM - 01:00 PM",
//     "01:00 PM - 02:00 PM",
//     "02:00 PM - 03:00 PM",
//     "03:00 PM - 04:00 PM",
//     "04:00 PM - 05:00 PM",
//     "05:00 PM - 06:00 PM",
//     "06:00 PM - 07:00 PM",
//     "07:00 PM - 08:00 PM",
//     "08:00 PM - 09:00 PM",
//   ];

//   const today = new Date().toISOString().split("T")[0];

//   // ✅ FETCH BOOKED SLOTS
//   const fetchBookedSlots = async (selectedDate) => {
//     try {
//       const res = await fetch(
//         `${API}/appointments/booked?date=${selectedDate}`
//       );
//       const data = await res.json();
//       setBookedSlots(data);
//     } catch (err) {
//       console.log("Error fetching slots");
//     }
//   };

//   // ✅ FILTER TIME (same day logic)
//   const getFilteredSlots = () => {
//     if (!date) return timeSlots;

//     const selectedDate = new Date(date);
//     const now = new Date();

//     if (selectedDate.toDateString() !== now.toDateString()) {
//       return timeSlots;
//     }

//     const currentHour = now.getHours();

//     return timeSlots.filter((slot) => {
//       let hour = parseInt(slot.split(":")[0]);
//       if (slot.includes("PM") && hour !== 12) hour += 12;
//       if (slot.includes("AM") && hour === 12) hour = 0;

//       return hour > currentHour;
//     });
//   };

//   // ✅ VALIDATION
//   const validateForm = () => {
//     if (!name || !mobile || !service || !stylist || !date || !time) {
//       Swal.fire({
//         icon: "warning",
//         title: "All fields required",
//         theme: "dark",
//       });
//       return false;
//     }

//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Mobile Number",
//         text: "Enter valid 10-digit number",
//         theme: "dark",
//       });
//       return false;
//     }

//     return true;
//   };

//   // ✅ WHATSAPP FUNCTION
//   const sendWhatsApp = () => {
//     const message = `Hello ${name}, your appointment is confirmed!
// Service: ${service}
// Stylist: ${stylist}
// Date: ${date}
// Time: ${time}`;

//     const url = `https://wa.me/91${mobile}?text=${encodeURIComponent(
//       message
//     )}`;

//     window.open(url, "_blank");
//   };

//   const handleBooking = async () => {
//     if (!validateForm()) return;

//     try {
//       setLoading(true);

//       const res = await fetch(`${API}/appointments`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           mobile,
//           service,
//           stylist,
//           date,
//           time,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           title: "Booked Successfully 🎉",
//           html: `
//             <p><b>${service}</b> with <b>${stylist}</b></p>
//             <p>${date} • ${time}</p>
//           `,
//           icon: "success",
//           theme: "dark",
//         });

//         // ✅ WhatsApp open
//         sendWhatsApp();

//         // reset
//         setName("");
//         setMobile("");
//         setService("");
//         setStylist("");
//         setDate("");
//         setTime("");

//         onClose();
//       } else {
//         throw new Error(data.message || "Booking failed");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Server not responding",
//         theme: "dark",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;

//   const isFormValid =
//     name && mobile && service && stylist && date && time;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black/70 z-40"
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="w-full max-w-md bg-zinc-900 rounded-3xl p-6 relative shadow-2xl"
//         >
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 text-white hover:text-yellow-500"
//           >
//             <X />
//           </button>

//           <h2 className="text-2xl font-bold text-center text-white mb-6">
//             Book <span className="text-yellow-500">Appointment</span>
//           </h2>

//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             />

//             <input
//               type="tel"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             />

//             <select
//               value={service}
//               onChange={(e) => setService(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Service</option>
//               <option>Haircut</option>
//               <option>Hair Styling</option>
//               <option>Facial</option>
//               <option>Makeup</option>
//             </select>

//             <select
//               value={stylist}
//               onChange={(e) => setStylist(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Stylist</option>
//               <option>Vishal</option>
//               <option>Shubham</option>
//               <option>Yash</option>
//               <option>Rishika</option>
//             </select>

//             {/* DATE */}
//             <input
//               type="date"
//               min={today}
//               value={date}
//               onChange={(e) => {
//                 const selected = e.target.value;
//                 setDate(selected);
//                 setTime("");
//                 fetchBookedSlots(selected); // ✅ important
//               }}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             />

//             {/* TIME */}
//             <select
//               value={time}
//               disabled={!date}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full p-3 rounded-xl bg-zinc-800 text-white"
//             >
//               <option value="">Select Time</option>

//               {getFilteredSlots().map((slot) => {
//                 const isBooked = bookedSlots.includes(slot);

//                 return (
//                   <option
//                     key={slot}
//                     value={slot}
//                     disabled={isBooked}
//                   >
//                     {isBooked ? `${slot} (Booked)` : slot}
//                   </option>
//                 );
//               })}
//             </select>

//             <button
//               onClick={handleBooking}
//               disabled={!isFormValid || loading}
//               className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold"
//             >
//               {loading ? "Booking..." : "Confirm Booking"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { X } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import API from "../config/api";

export default function AppointmentModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  // ✅ Fetch booked slots
  const fetchBookedSlots = async (selectedDate) => {
    try {
      const res = await fetch(
        `${API}/api/appointments/booked?date=${selectedDate}`,
      );
      const data = await res.json();
      setBookedSlots(data);
    } catch (err) {
      console.log("Error fetching slots");
    }
  };

  // ✅ Filter past time (same day)
  const getFilteredSlots = () => {
    if (!date) return timeSlots;

    const selectedDate = new Date(date);
    const now = new Date();

    if (selectedDate.toDateString() !== now.toDateString()) {
      return timeSlots;
    }

    const currentHour = now.getHours();

    return timeSlots.filter((slot) => {
      let hour = parseInt(slot.split(":")[0]);
      if (slot.includes("PM") && hour !== 12) hour += 12;
      if (slot.includes("AM") && hour === 12) hour = 0;

      return hour > currentHour;
    });
  };

  // ✅ Validation
  const validateForm = () => {
    if (!name || !mobile || !service || !stylist || !date || !time) {
      Swal.fire({
        icon: "warning",
        title: "All fields required",
        theme: "dark",
      });
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text: "Enter valid 10-digit number",
        theme: "dark",
      });
      return false;
    }

    return true;
  };

  // ✅ Booking handler (NO WhatsApp here)
  const handleBooking = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
          service,
          stylist,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Booked Successfully 🎉",
          text: "Confirmation message sent on WhatsApp",
          icon: "success",
          theme: "dark",
        });

        // reset form
        setName("");
        setMobile("");
        setService("");
        setStylist("");
        setDate("");
        setTime("");

        onClose();
      } else {
        throw new Error(data.message || "Booking failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Server not responding",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const isFormValid = name && mobile && service && stylist && date && time;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-zinc-900 rounded-3xl p-6 relative shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-yellow-500"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Book <span className="text-yellow-500">Appointment</span>
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 text-white"
            />

            {/* Mobile */}
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 text-white"
            />

            {/* Service */}
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 text-white"
            >
              <option value="">Select Service</option>
              <option>Haircut</option>
              <option>Hair Styling</option>
              <option>Facial</option>
              <option>Makeup</option>
            </select>

            {/* Stylist */}
            <select
              value={stylist}
              onChange={(e) => setStylist(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 text-white"
            >
              <option value="">Select Stylist</option>
              <option>anjali</option>
              <option>Shubham</option>
              <option>Vishal</option>
              <option>Yash</option>
              <option>Sumit</option>
            </select>

            {/* Date */}
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => {
                const selected = e.target.value;
                setDate(selected);
                setTime("");
                fetchBookedSlots(selected);
              }}
              className="w-full p-3 rounded-xl bg-zinc-800 text-white"
            />

            {/* Time */}
            <select
              value={time}
              disabled={!date}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 text-white"
            >
              <option value="">Select Time</option>

              {getFilteredSlots().map((slot) => {
                const isBooked =
                  Array.isArray(bookedSlots) && bookedSlots.includes(slot);

                return (
                  <option key={slot} value={slot} disabled={isBooked}>
                    {isBooked ? `${slot} (Booked)` : slot}
                  </option>
                );
              })}
            </select>

            {/* Button */}
            <button
              onClick={handleBooking}
              disabled={!isFormValid || loading}
              className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
