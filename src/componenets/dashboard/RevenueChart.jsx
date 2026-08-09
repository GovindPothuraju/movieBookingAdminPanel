import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Custom tooltip — visual only, same `revenue` field being read
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-[#FFDE86]/40 bg-[#1C1917] px-4 py-3 shadow-xl">
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
        {label}
      </p>
      <p className="mt-1 text-base font-bold text-[#FFDE86]">
        ₹{Number(payload[0].value).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const RevenueChart = ({ data }) => {
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
          <h2 className="text-lg font-bold text-gray-800">Revenue Trend</h2>
          <p className="text-sm text-gray-400">Revenue for the last 7 days</p>
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-[#FFF7ED] px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#F5B942]" />
          <span className="text-xs font-semibold text-[#B8781A]">
            Revenue (₹)
          </span>
        </div>
      </div>

      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFDE86" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#FFDE86" stopOpacity={0.02} />
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
              tick={{ fontSize: 12, fill: "#A8A29E" }}
              tickFormatter={(value) => `₹${value}`}
              axisLine={false}
              tickLine={false}
              width={60}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#E8A317"
              strokeWidth={3}
              fill="url(#revenueFill)"
              dot={{ r: 4, fill: "#E8A317", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#E8A317", strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;