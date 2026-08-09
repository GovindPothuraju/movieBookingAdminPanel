import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-[#FFDE86]/40 bg-[#1C1917] px-4 py-3 shadow-xl">
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
        {label}
      </p>
      <p className="mt-1 text-base font-bold text-[#FFDE86]">
        {payload[0].value} bookings
      </p>
    </div>
  );
};

const BookingChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
  }));

  return (
    <div className="rounded-2xl border border-[#FFDE86]/20 bg-white p-5 shadow-[0_2px_12px_-2px_rgba(28,25,23,0.06)] sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Booking Trend</h2>
          <p className="text-sm text-gray-400">Bookings for the last 7 days</p>
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-[#FFF7ED] px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#1C1917]" />
          <span className="text-xs font-semibold text-[#78716C]">
            Tickets sold
          </span>
        </div>
      </div>

      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="bookingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1C1917" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#1C1917" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 6"
              vertical={false}
              stroke="#F1E4CB"
            />

            <XAxis
              dataKey="displayDate"
              tick={{ fontSize: 12, fill: "#A8A29E" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#A8A29E" }}
              axisLine={false}
              tickLine={false}
              width={40}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#1C1917"
              strokeWidth={3}
              fill="url(#bookingFill)"
              dot={{ r: 4, fill: "#1C1917", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#1C1917", strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingChart;