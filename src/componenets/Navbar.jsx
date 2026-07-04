import {
  Menu,
  Search,
  Bell,
  LogOut,
} from "lucide-react";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="py-5 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-5 flex-1">

        <button className="text-gray-600 hover:text-primary transition"
                onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search movies, theaters, bookings..."
            className="
              w-full
              rounded-full
              border
              border-gray-200
              bg-[#FAF7F5]
              py-3
              pl-12
              pr-4
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-orange-100
            "
          />
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-primary transition">
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-1.5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
            A
          </div>

          <div className="leading-4">
            <h3 className="font-semibold text-heading">
              Admin
            </h3>

            <p className="text-sm text-text-gray">
              Super Admin
            </p>
          </div>

        </div>

        {/* Logout */}
        <button className="text-gray-500 hover:text-red-500 transition">
          <LogOut size={22} />
        </button>

      </div>

    </header>
  );
};

export default Navbar;