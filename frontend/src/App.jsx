
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import FloatingButtons from "./components/FloatingButtons";
import Appointment from "./components/Appointment"; // 👈 ye change

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import DashboardHome from "./admin/DashboardHome";
import Appointments from "./admin/Appointments";
import Payments from "./admin/Payments";
import Calculation from "./admin/Calculation";
import ProtectedRoute from "./admin/ProtectedRoute";
import Expense from "./admin/Expense";

export default function App() {

  const [openAppointment, setOpenAppointment] = useState(false);

  useEffect(() => {

    const shown = localStorage.getItem("appointmentPopupShown");

    if (!shown) {

      const timer = setTimeout(() => {
        setOpenAppointment(true);
        localStorage.setItem("appointmentPopupShown", "true");
      }, 4000);

      return () => clearTimeout(timer);

    }

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ================= PROTECTED ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="payments" element={<Payments />} />
          <Route path="calculation" element={<Calculation />} />
          <Route path="expense" element={<Expense />} />
        </Route>

      </Routes>

      <FloatingButtons />

      {/* Appointment Popup */}
      <Appointment
        open={openAppointment}
        onClose={() => setOpenAppointment(false)}
      />

    </BrowserRouter>
  );
}