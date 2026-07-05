import SeatRow from "./SeatRow";
import SeatLegend from "./SeatLegend";

const SeatLayout = ({ seats, totalSeats, onEdit, onDelete }) => {
  const rowLabels = Object.keys(seats).sort();

  return (
    <div className="rounded-2xl border border-border-light bg-white p-6">

      <div className="flex items-center justify-between">
        <SeatLegend />

        <div className="flex gap-2">
          <button onClick={onEdit} className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Edit Layout
          </button>
          <button onClick={onDelete} className="rounded-lg bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white">
            Delete Layout
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="rounded-full bg-heading px-16 py-2 text-center text-xs font-semibold uppercase tracking-widest text-white">
          Screen
        </div>
      </div>

      <div className="mt-8 space-y-3 overflow-x-auto">
        {rowLabels.map((rowLabel) => (
          <SeatRow key={rowLabel} rowLabel={rowLabel} seats={seats[rowLabel]} />
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-text-gray">
        {totalSeats} total seats
      </p>

    </div>
  );
};

export default SeatLayout;