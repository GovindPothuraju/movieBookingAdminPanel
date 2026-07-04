import { Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FORMAT_STYLES = {
  "2D": "bg-primary-light text-primary",
  "3D": "bg-blue-100 text-blue-600",
  IMAX: "bg-accent-light text-accent",
  "4DX": "bg-purple-100 text-purple-600",
};

const AllScreensRow = ({ screen }) => {
  const navigate = useNavigate();

  const capacity = screen.totalSeats ?? (screen.rows && screen.columns ? screen.rows * screen.columns : "—");
  const formatStyle = FORMAT_STYLES[screen.screenType] || "bg-primary-light text-primary";

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
            <Monitor size={16} className="text-primary" />
          </div>
          <span className="font-medium text-heading">{screen.name}</span>
        </div>
      </td>

      <td className="px-4 py-4 text-text-gray">
        {screen.theaterId?.name || "—"}
      </td>

      <td className="px-4 py-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${formatStyle}`}>
          {screen.screenType}
        </span>
      </td>

      <td className="px-4 py-4 text-text-gray">
        {screen.rows}×{screen.columns}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {capacity}
      </td>

      <td className="px-4 py-4 text-right">
        <button
          onClick={() => navigate(`/admin/screens/${screen._id}/seats`)}
          className="flex items-center gap-1.5 rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary"
        >
          <Monitor size={14} />
          Seats
        </button>
      </td>

    </tr>
  );
};

export default AllScreensRow;