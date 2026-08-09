import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// On-brand palette for status slices — cycles if more statuses are added
const STATUS_COLORS = ["#F5B942", "#1C1917", "#E8A317", "#D6D3D1", "#78716C"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];

  return (
    <div className="rounded-xl border border-[#FFDE86]/40 bg-[#1C1917] px-4 py-2.5 shadow-xl">
      <p className="text-sm font-semibold text-white">
        {entry.name}: <span className="text-[#FFDE86]">{entry.value}</span>
      </p>
    </div>
  );
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-medium text-gray-500">
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

const BookingStatusChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const total = formattedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-[#FFDE86]/20 bg-white p-5 shadow-[0_2px_12px_-2px_rgba(28,25,23,0.06)] sm:p-6">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-gray-800">Booking Status</h2>
        <p className="text-sm text-gray-400">
          Distribution of confirmed and cancelled bookings
        </p>
      </div>

      <div className="relative h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="46%"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              cornerRadius={6}
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total — signature donut treatment */}
        <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-2xl font-black text-gray-800">{total}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            Total
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingStatusChart;