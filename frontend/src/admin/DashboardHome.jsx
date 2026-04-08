
import StatsCards from "./StatsCards";
import EarningsGraph from "./EarningsGraph";
import TodayAppointments from "./TodayAppointments";
import Payments from "./Payments";
import HisabKitab from "./Expense";
import PDFReport from "./PDFReport";
import WeeklyPDF from "./WeeklyPDF";

export default function DashboardHome() {
  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <StatsCards />

      {/* Graph */}
      <div className="bg-zinc-800 rounded-xl p-4 sm:p-6">
        <EarningsGraph />
      </div>

      {/* Appointments + Payments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-zinc-800 rounded-xl p-4 sm:p-6">
          <TodayAppointments />
        </div>

        <div className="bg-zinc-800 rounded-xl p-4 sm:p-6">
          {/* Dashboard me table hide */}
          <Payments showTable={false} />
        </div>

      </div>

      {/* Hisab Kitab */}
      <div className="bg-zinc-800 rounded-xl p-4 sm:p-6">
        <HisabKitab />
      </div>

      {/* Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-zinc-800 rounded-xl p-4 sm:p-6">
          <PDFReport />
        </div>

        <div className="bg-zinc-800 rounded-xl p-4 sm:p-6">
          <WeeklyPDF />
        </div>

      </div>

    </div>
  );
}
