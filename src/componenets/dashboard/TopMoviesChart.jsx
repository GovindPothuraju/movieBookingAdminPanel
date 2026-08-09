import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

// Gold-to-neutral ramp — rank 1 gets the deepest gold, fading down the list.
// Extra rows beyond the ramp all share the last (palest) tone.
const RANK_FILLS = ["#E8A317", "#F5B942", "#FFDE86", "#F1E0B0", "#EDE7DC"];
const getFill = (index) => RANK_FILLS[Math.min(index, RANK_FILLS.length - 1)];

// Axis labels stay short so long titles don't crowd the chart;
// the tooltip below still shows the full, untruncated name.
const truncateName = (name) =>
  name.length > 16 ? `${name.slice(0, 16)}…` : name;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-[#FFDE86]/40 bg-[#1C1917] px-4 py-3 shadow-xl">
      <p className="max-w-[180px] truncate text-sm font-semibold text-white">
        {item.name}
      </p>
      <p className="mt-1 text-base font-bold text-[#FFDE86]">
        {item.bookings.toLocaleString("en-IN")} bookings
      </p>
    </div>
  );
};

const TopMoviesChart = ({ data }) => {
  // Same fields as before (movieName -> name, totalBookings -> bookings),
  // sorted descending so the leaderboard order always matches the bar length.
  const formattedData = data
    .map((movie) => ({
      name: movie.movieName,
      bookings: movie.totalBookings,
    }))
    .sort((a, b) => b.bookings - a.bookings);

  const topMovie = formattedData[0];

  return (
    <div className="rounded-2xl border border-[#FFDE86]/20 bg-white p-5 shadow-[0_2px_12px_-2px_rgba(28,25,23,0.06)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Top Movies</h2>
          <p className="text-sm text-gray-400">
            Movies with the highest bookings
          </p>
        </div>

        {topMovie && (
          <div className="hidden max-w-[45%] items-center gap-2 rounded-full bg-[#FFF7ED] px-3 py-1.5 sm:flex">
            <span className="text-sm">🏆</span>
            <span className="truncate text-xs font-semibold text-[#B8781A]">
              {topMovie.name}
            </span>
          </div>
        )}
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 5, right: 36, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              horizontal={false}
              stroke="#F1E4CB"
            />

            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#A8A29E" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              tickFormatter={truncateName}
              width={110}
              tick={{ fontSize: 12, fill: "#57534E" }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#FFF7ED" }} />

            <Bar dataKey="bookings" radius={[0, 8, 8, 0]} maxBarSize={26}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getFill(index)} />
              ))}

              <LabelList
                dataKey="bookings"
                position="right"
                formatter={(value) => value.toLocaleString("en-IN")}
                style={{ fontSize: 12, fontWeight: 600, fill: "#78716C" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopMoviesChart;