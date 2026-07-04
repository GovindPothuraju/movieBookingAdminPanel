import { useState } from "react";

const STATUS_OPTIONS = ["UPCOMING", "NOW_SHOWING", "ARCHIVED"];

const STATUS_STYLES = {
  NOW_SHOWING: "bg-green-100 text-green-700",
  UPCOMING: "bg-yellow-100 text-yellow-700",
  ARCHIVED: "bg-red-100 text-red-700",
};

const MovieRow = ({ movie, onView, onEdit, onDelete, onStatusChange }) => {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    if (newStatus === movie.status) return;

    try {
      setUpdating(true);
      await onStatusChange(movie, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium">
        {movie.title}
      </td>

      <td className="px-4 py-4">
        {new Date(movie.releaseDate).toLocaleDateString()}
      </td>

      <td className="px-4 py-4">

        <select
          value={movie.status}
          onChange={handleStatusChange}
          disabled={updating}
          className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${STATUS_STYLES[movie.status] || "bg-gray-100 text-gray-700"}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>

      </td>

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <button onClick={() => onView(movie)} className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary">
            View
          </button>

          <button onClick={() => onEdit(movie)} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Edit
          </button>

          <button onClick={() => onDelete(movie)} className="rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white">
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
};

export default MovieRow;