const STATUS_STYLES = {
  SCHEDULED: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const ShowRow = ({ show, onView, onEdit, onCancel }) => {
  const dateObj = new Date(show.showTime);

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium">
        {show.movieId?.title || "—"}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {show.theaterId?.name || "—"}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {show.screenId?.name || "—"}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
      </td>

      <td className="px-4 py-4">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[show.status] || "bg-gray-100 text-gray-700"}`}>
          {show.status}
        </span>
      </td>

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <button onClick={() => onView(show)} className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary">
            View
          </button>

          <button
            onClick={() => onEdit(show)}
            disabled={show.status === "CANCELLED"}
            className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary/10 disabled:hover:text-primary"
          >
            Edit
          </button>

          <button
            onClick={() => onCancel(show)}
            disabled={show.status === "CANCELLED"}
            className="rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent/10 disabled:hover:text-accent"
          >
            Cancel
          </button>

        </div>

      </td>

    </tr>
  );
};

export default ShowRow;
