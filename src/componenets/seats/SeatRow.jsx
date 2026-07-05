import SeatCell from "./SeatCell";

const SeatRow = ({ rowLabel, seats }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 shrink-0 text-sm font-semibold text-heading">{rowLabel}</span>
      <div className="flex flex-wrap gap-1.5">
        {seats.map((seat) => (
          <SeatCell key={seat.seatLabel} label={seat.seatLabel} category={seat.category} />
        ))}
      </div>
    </div>
  );
};

export default SeatRow;