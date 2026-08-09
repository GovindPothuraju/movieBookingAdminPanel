import { useEffect, useState } from "react";

/**
 * StatCard — "ticket stub" styling
 * Same props/contract as before: { title, value, icon }
 * No logic changed — purely presentational.
 */
const StatCard = ({ title, value, icon, accent = false }) => {
  const [displayValue, setDisplayValue] = useState(value);

  // Subtle mount-in animation only — does not touch parent logic/state
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${
        accent
          ? "bg-gradient-to-br from-[#FFDE86] to-[#F5B942] shadow-[0_8px_24px_-8px_rgba(245,185,66,0.55)]"
          : "bg-white shadow-[0_2px_12px_-2px_rgba(28,25,23,0.08)] hover:shadow-[0_8px_24px_-6px_rgba(28,25,23,0.12)]"
      }`}
    >
      {/* Ticket perforation edge (signature element) */}
      <div className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2">
        <div
          className={`h-8 w-8 rounded-full ${
            accent ? "bg-[#FFF7ED]" : "bg-gray-50"
          }`}
        />
      </div>
      <div
        className={`pointer-events-none absolute right-9 top-0 bottom-0 border-r-2 border-dashed ${
          accent ? "border-[#1C1917]/10" : "border-gray-200"
        }`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`text-[11px] font-semibold uppercase tracking-wider ${
              accent ? "text-[#1C1917]/60" : "text-gray-400"
            }`}
          >
            {title}
          </p>

          <p
            className={`mt-2 truncate font-black tabular-nums tracking-tight ${
              accent ? "text-[#1C1917]" : "text-gray-800"
            }`}
            style={{ fontSize: "1.85rem", lineHeight: 1.1 }}
          >
            {displayValue}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-lg ${
            accent
              ? "bg-[#1C1917]/10 text-[#1C1917]"
              : "bg-[#FFF7ED] text-[#D89B2E]"
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Bottom mini progress rail — pure decoration, purely visual */}
      <div
        className={`relative mt-4 h-1 w-full overflow-hidden rounded-full ${
          accent ? "bg-[#1C1917]/10" : "bg-gray-100"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            accent ? "bg-[#1C1917]/40" : "bg-[#FFDE86]"
          }`}
          style={{ width: "70%" }}
        />
      </div>
    </div>
  );
};

export default StatCard;