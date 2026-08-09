import BookingRow from "./BookingRow";

const BookingTable = ({ bookings, onView }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-orange-50">

          <tr>
            <th className="px-4 py-4 text-left">Booking ID</th>
            <th className="px-4 py-4 text-left">User</th>
            <th className="px-4 py-4 text-left">Movie</th>
            <th className="px-4 py-4 text-left">Theater / Screen</th>
            <th className="px-4 py-4 text-left">Show Time</th>
            <th className="px-4 py-4 text-left">Amount</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (
            <BookingRow key={booking.bookingId || booking._id} booking={booking} onView={onView} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default BookingTable;