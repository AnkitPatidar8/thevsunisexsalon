

// import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   CalendarCheck,
//   CreditCard,
//   Calculator,
//   LogOut,
//   BanknoteArrowDown,
// } from "lucide-react";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const logout = () => {
//     localStorage.removeItem("adminLoggedIn");
//     navigate("/admin");
//   };

//   const linkStyle = (path) =>
//     `flex items-center gap-3 p-3 rounded-lg transition
//      ${
//        location.pathname === path
//          ? "bg-yellow-500 text-black font-semibold"
//          : "hover:bg-zinc-800 text-zinc-300"
//      }`;

//   return (
//     <div className="flex min-h-screen bg-zinc-950 text-white">

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 lg:hidden z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col
//         transform transition-transform duration-300 z-50
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       >
//         {/* Mobile Close */}
//         <div className="flex items-center justify-between mb-8 lg:hidden">
//           <h2 className="text-xl font-bold text-yellow-500">VS Salon</h2>
//           <button onClick={() => setOpen(false)}>
//             <X size={24} />
//           </button>
//         </div>

//         {/* Desktop Logo */}
//         <h2 className="text-2xl font-bold text-yellow-500 mb-10 hidden lg:block">
//           VS Salon
//         </h2>

//         <nav className="flex flex-col gap-3">

//           <Link
//             to="/admin/dashboard"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard")}
//           >
//             <LayoutDashboard size={18} />
//             Dashboard
//           </Link>

//           <Link
//             to="/admin/dashboard/appointments"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/appointments")}
//           >
//             <CalendarCheck size={18} />
//             Appointments
//           </Link>

//           <Link
//             to="/admin/dashboard/payments"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/payments")}
//           >
//             <CreditCard size={18} />
//             Payments
//           </Link>

//           <Link
//             to="/admin/dashboard/calculation"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/calculation")}
//           >
//             <Calculator size={18} />
//             Daily Calculation
//           </Link>
//           <Link
//             to="/admin/dashboard/expense"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/Expense")}
//           >
//             <BanknoteArrowDown size={18} />
//             Expense
//           </Link>

          

//         </nav>

//         {/* Logout */}
//         <div className="mt-auto pt-10">

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>

//         </div>
//       </aside>

//       {/* Main Section */}
//       <div className="flex-1 flex flex-col">

//         {/* Mobile Navbar */}
//         <header className="lg:hidden flex items-center gap-4 p-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-30">

//           <button onClick={() => setOpen(true)}>
//             <Menu size={26} />
//           </button>

//           <h1 className="text-lg font-semibold text-yellow-500">
//             VS Salon Admin
//           </h1>

//         </header>

//         {/* Page Content */}
//         <main className="p-4 sm:p-6 lg:p-8">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }

// import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   CalendarCheck,
//   CreditCard,
//   Calculator,
//   LogOut,
//   BanknoteArrowDown,
// } from "lucide-react";
// import API from "../config/api";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   // 🔐 AUTH CHECK (IMPORTANT)
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/admin"); // login page
//       return;
//     }

//     // optional: verify token with backend
//     verifyToken(token);
//   }, []);

//   const verifyToken = async (token) => {
//     try {
//       const res = await fetch(`${API}/api/admin/dashboard`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         // token invalid
//         logout();
//       }
//     } catch (err) {
//       console.error("Auth Error:", err);
//       logout();
//     }
//   };

//   // 🔓 LOGOUT FIX
//   const logout = () => {
//     localStorage.removeItem("adminLoggedIn");
//     localStorage.removeItem("token");
//     navigate("/admin");
//   };

//   const linkStyle = (path) =>
//     `flex items-center gap-3 p-3 rounded-lg transition
//      ${
//        location.pathname === path
//          ? "bg-yellow-500 text-black font-semibold"
//          : "hover:bg-zinc-800 text-zinc-300"
//      }`;

//   return (
//     <div className="flex min-h-screen bg-zinc-950 text-white">

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 lg:hidden z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col
//         transform transition-transform duration-300 z-50
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       >
//         {/* Mobile Close */}
//         <div className="flex items-center justify-between mb-8 lg:hidden">
//           <h2 className="text-xl font-bold text-yellow-500">VS Salon</h2>
//           <button onClick={() => setOpen(false)}>
//             <X size={24} />
//           </button>
//         </div>

//         {/* Desktop Logo */}
//         <h2 className="text-2xl font-bold text-yellow-500 mb-10 hidden lg:block">
//           VS Salon
//         </h2>

//         <nav className="flex flex-col gap-3">

//           <Link
//             to="/admin/dashboard"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard")}
//           >
//             <LayoutDashboard size={18} />
//             Dashboard
//           </Link>

//           <Link
//             to="/admin/dashboard/appointments"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/appointments")}
//           >
//             <CalendarCheck size={18} />
//             Appointments
//           </Link>

//           <Link
//             to="/admin/dashboard/payments"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/payments")}
//           >
//             <CreditCard size={18} />
//             Payments
//           </Link>

//           <Link
//             to="/admin/dashboard/calculation"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/calculation")}
//           >
//             <Calculator size={18} />
//             Daily Calculation
//           </Link>

//           <Link
//             to="/admin/dashboard/expense"
//             onClick={() => setOpen(false)}
//             className={linkStyle("/admin/dashboard/expense")}
//           >
//             <BanknoteArrowDown size={18} />
//             Expense
//           </Link>

//         </nav>

//         {/* Logout */}
//         <div className="mt-auto pt-10">
//           <button
//             onClick={logout}
//             className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Section */}
//       <div className="flex-1 flex flex-col">

//         {/* Mobile Navbar */}
//         <header className="lg:hidden flex items-center gap-4 p-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-30">
//           <button onClick={() => setOpen(true)}>
//             <Menu size={26} />
//           </button>

//           <h1 className="text-lg font-semibold text-yellow-500">
//             VS Salon Admin
//           </h1>
//         </header>

//         {/* Page Content */}
//         <main className="p-4 sm:p-6 lg:p-8">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarCheck,
  CreditCard,
  Calculator,
  LogOut,
  BanknoteArrowDown,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // 🔐 SIMPLE AUTH CHECK (FIXED)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin"); // login page
    }
  }, []);

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const linkStyle = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition
     ${
       location.pathname === path
         ? "bg-yellow-500 text-black font-semibold"
         : "hover:bg-zinc-800 text-zinc-300"
     }`;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Mobile Close */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h2 className="text-xl font-bold text-yellow-500">VS Salon</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Desktop Logo */}
        <h2 className="text-2xl font-bold text-yellow-500 mb-10 hidden lg:block">
          VS Salon
        </h2>

        <nav className="flex flex-col gap-3">

          <Link
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className={linkStyle("/admin/dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/dashboard/appointments"
            onClick={() => setOpen(false)}
            className={linkStyle("/admin/dashboard/appointments")}
          >
            <CalendarCheck size={18} />
            Appointments
          </Link>

          <Link
            to="/admin/dashboard/payments"
            onClick={() => setOpen(false)}
            className={linkStyle("/admin/dashboard/payments")}
          >
            <CreditCard size={18} />
            Payments
          </Link>

          <Link
            to="/admin/dashboard/calculation"
            onClick={() => setOpen(false)}
            className={linkStyle("/admin/dashboard/calculation")}
          >
            <Calculator size={18} />
            Daily Calculation
          </Link>

          <Link
            to="/admin/dashboard/expense"
            onClick={() => setOpen(false)}
            className={linkStyle("/admin/dashboard/expense")}
          >
            <BanknoteArrowDown size={18} />
            Expense
          </Link>

        </nav>

        {/* Logout */}
        <div className="mt-auto pt-10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Navbar */}
        <header className="lg:hidden flex items-center gap-4 p-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-30">
          <button onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>

          <h1 className="text-lg font-semibold text-yellow-500">
            VS Salon Admin
          </h1>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}