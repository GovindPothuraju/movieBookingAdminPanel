const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
};

const BookingRow = ({ booking, onView }) => {
  const bookedAt = booking.createdAt ? new Date(booking.createdAt) : null;

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium text-heading">
        {booking.bookingId || booking._id}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {booking.userId?.name || "—"}
        <div className="text-xs text-text-gray/70">{booking.userId?.email}</div>
      </td>

      <td className="px-4 py-4 text-text-gray">
        {booking.movieId?.title || "—"}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {booking.theaterId?.name || "—"}
        {booking.screenId?.name && <span className="text-xs"> · {booking.screenId.name}</span>}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {booking.showId?.showTime
          ? new Date(booking.showId.showTime).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—"}
      </td>

      <td className="px-4 py-4 font-medium text-heading">
        {booking.totalAmount != null ? `₹${booking.totalAmount}` : "—"}
      </td>

      <td className="px-4 py-4">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[booking.status?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}>
          {booking.bookingStatus || "—"}
        </span>
      </td>

      <td className="px-4 py-4">
        <button
          onClick={() => onView(booking)}
          className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary"
        >
          View
        </button>
      </td>

    </tr>
  );
};

export default BookingRow;