import {
  LayoutDashboard,
  Building2,
  Monitor,
  Film,
  CalendarClock,
  Ticket,
  Activity,
  BarChart3,
  ClipboardList,
  Bell,
  User,
  Settings,
  Clapperboard,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Movies", icon: Film, path: "/movies" },
  { name: "Theaters", icon: Building2, path: "/admin/theaters" },
  { name: "Screens", icon: Monitor, path: "/admin/screens" },
  { name: "Shows", icon: CalendarClock, path: "/shows" },
  { name: "Bookings", icon: Ticket, path: "/bookings" },
  { name: "Live Seats", icon: Activity, path: "/live-seats" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Audit Logs", icon: ClipboardList, path: "/audit-logs" },
  { name: "Notifications", icon: Bell, path: "/notifications" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const SideBar = ({ open }) => {
  return (
    <aside
      className={`
        bg-white
        border-r
        h-screen
        transition-all
        duration-300
        flex
        flex-col
        ${open ? "w-72" : "w-20"}
      `}
    >
      {/* Logo */}

      <div
        className={`
          h-20
          border-b
          flex
          items-center
          ${open ? "justify-start px-5" : "justify-center"}
        `}
      >
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Clapperboard className="text-white" size={24} />
        </div>

        {open && (
          <div className="ml-3">
            <h1 className="text-3xl font-bold text-heading">
              CineFlow
            </h1>

            <p className="text-sm text-text-gray">
              Admin Console
            </p>
          </div>
        )}
      </div>

      {/* Menu */}

      <nav className="flex-1 py-5 px-3">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={!open ? item.name : ""}
              className={({ isActive }) =>
                `
                flex
                items-center
                h-12
                rounded-2xl
                mb-2
                transition-all
                duration-200

                ${
                  open
                    ? "px-4 gap-4 justify-start"
                    : "justify-center"
                }

                ${
                  isActive
                    ? "bg-orange-50 text-primary border-l-4 border-primary"
                    : "text-heading hover:bg-gray-100"
                }
              `
              }
            >
              <Icon size={21} className="flex-shrink-0" />

              {open && (
                <span className="font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;