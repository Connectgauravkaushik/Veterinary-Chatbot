import React, { useState } from "react";
import {
  Calendar,
  Search,
  Phone,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  LayoutGrid,
} from "lucide-react";
import { useAppointments } from "../customHook/useAppointments";

export default function VetAdminDashboard() {
  const { appointments, totalCount, loading } = useAppointments();
  const [search, setSearch] = useState("");

  const filteredData = appointments.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.ownerName.toLowerCase().includes(q) ||
      item.petName.toLowerCase().includes(q) ||
      item.phone.includes(q)
    );
  });

  const getDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Stethoscope size={18} />
          </div>
          <span className="font-bold text-lg">VetPortal</span>
        </div>
        <nav className="p-4">
          <button className="flex items-center gap-3 w-full px-4 py-3 bg-slate-50 text-blue-700 rounded-lg font-medium border border-slate-200">
            <LayoutGrid size={18} />
            Bookings
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div>
            <h1 className="text-lg font-bold">Appointment Requests</h1>
            <p className="text-xs text-slate-500">
              Manage incoming bookings from chatbot
            </p>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 p-8 overflow-auto">
          {/* STATS + SEARCH */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="bg-white px-5 py-2 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">
                  Total Booked
                </p>
                <p className="text-xl font-bold">{totalCount}</p>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Owner, Pet, Phone..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full border border-slate-200">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="px-6 py-4">Owner Name</th>
                  <th className="px-6 py-4">Pet Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredData.length ? (
                  filteredData.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">
                        {item.ownerName}
                      </td>
                      <td className="px-6 py-4">{item.petName}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{getDate(item.dateTime)}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {getTime(item.dateTime)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-400">
                      No bookings found for "{search}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-slate-200 flex justify-between text-xs text-slate-500">
              Viewing {filteredData.length} of {totalCount}
              <div className="flex gap-2">
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
