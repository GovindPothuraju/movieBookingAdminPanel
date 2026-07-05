import { useNavigate } from "react-router-dom";

const ScreenRow = ({ screen, onView, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium">
        {screen.name}
      </td>

      <td className="px-4 py-4">
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
          {screen.screenType}
        </span>
      </td>

      <td className="px-4 py-4 text-text-gray">
        {screen.totalSeats ?? "—"}
      </td>

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <button onClick={() => onView(screen)} className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary">
            View
          </button>

          <button onClick={() => navigate(`/screens/${screen._id}/seats`)} className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary">
            Seats
          </button>

          <button onClick={() => onEdit(screen)} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Edit
          </button>

          <button onClick={() => onDelete(screen)} className="rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white">
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
};

export default ScreenRow;