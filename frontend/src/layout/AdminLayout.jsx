import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="bg-white shadow p-4 flex items-center gap-3 lg:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>

          <h1 className="font-semibold text-lg">
            Salon Admin
          </h1>
        </div>

        {/* Page Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}