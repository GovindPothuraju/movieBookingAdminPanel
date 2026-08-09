import {
  Menu,
  Search,
  Bell,
  LogOut,
} from "lucide-react";

import axios from "axios";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
 
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://moviebookingbackend-icoh.onrender.com/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // Redirect after successful logout
      //navigate("/",{ replace: true });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
   const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const today = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#FFDE86]/25 bg-white px-6 py-4 shadow-[0_1px_16px_-6px_rgba(28,25,23,0.1)]">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#FFF7ED] hover:text-[#B8781A]"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-base font-bold text-gray-800">
            {greeting}, Admin <span>👋</span>
          </h1>
          <p className="text-xs text-gray-400">{today}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification */}
        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#FFF7ED] hover:text-[#B8781A]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
          </span>
        </button>

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-full border border-[#FFDE86]/40 bg-white py-1.5 pl-1.5 pr-4 transition hover:border-[#FFDE86]">
          <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFDE86] to-[#F5B942] font-bold text-[#1C1917]">
            A
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></span>
          </div>

          <div className="hidden leading-4 sm:block">
            <h3 className="text-sm font-semibold text-gray-800">Admin</h3>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;