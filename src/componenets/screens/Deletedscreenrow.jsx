const DeletedScreenRow = ({ screen, onView, onReactivate }) => {
  const totalSeats = screen.totalSeats ?? (screen.rows && screen.columns ? screen.rows * screen.columns : "—");

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium">
        {screen.name}
      </td>

      <td className="px-4 py-4 text-text-gray">
        <div className="flex flex-col">
          <span>{totalSeats} seats</span>
          <span className="text-xs text-text-gray/70">{screen.rows} × {screen.columns}</span>
        </div>
      </td>

      <td className="px-4 py-4">
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
          {screen.screenType}
        </span>
      </td>

      <td className="px-4 py-4">
        <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-medium text-accent">
          Inactive
        </span>
      </td>

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <button onClick={() => onView(screen)} className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary">
            View
          </button>

          <button onClick={() => onReactivate(screen)} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Reactivate
          </button>

        </div>

      </td>

    </tr>
  );
};

export default DeletedScreenRow;