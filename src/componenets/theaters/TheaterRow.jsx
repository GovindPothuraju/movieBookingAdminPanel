const TheaterRow = ({ theater, onView, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium">
        {theater.name}
      </td>

      <td className="px-4 py-4">
        {theater.city}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {theater.address?.street || "—"}
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1.5">
          {(theater.amenities || []).slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
              {a}
            </span>
          ))}
          {theater.amenities?.length > 3 && (
            <span className="rounded-full bg-border-light px-2.5 py-1 text-xs font-medium text-text-gray">
              +{theater.amenities.length - 3}
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <button onClick={() => onView(theater)} className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary">
            View
          </button>

          <button onClick={() => onEdit(theater)} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Edit
          </button>

          <button onClick={() => onDelete(theater)} className="rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white">
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
};

export default TheaterRow;