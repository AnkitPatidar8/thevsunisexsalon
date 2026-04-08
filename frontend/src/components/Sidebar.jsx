import { X, LayoutDashboard, CalendarCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static z-50 top-0 left-0 h-full w-64 bg-white shadow transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Salon Admin</h2>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/appointments"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <CalendarCheck size={20} />
            Appointments
          </Link>

          <Link
            to="/clients"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <Users size={20} />
            Clients
          </Link>

        </nav>
      </div>
    </>
  );
}