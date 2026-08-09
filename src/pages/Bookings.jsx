import { useEffect, useState } from "react";

import { getBookings } from "../services/bookingService";
import BookingTable from "../componenets/bookings/BookingTable";
import BookingDetails from "../componenets/bookings/BookingDetails";

const LIMIT_OPTIONS = [10, 20, 30, 50];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getBookings({ page, limit });
      setBookings(data.data);
      setPagination(data.pagination || {});
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, limit]);

  const handleView = (booking) => {
    setViewBooking(booking);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setViewBooking(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-text-gray">View all customer bookings.</p>
        </div>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        >
          {LIMIT_OPTIONS.map((l) => (
            <option key={l} value={l}>{l} per page</option>
          ))}
        </select>

      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">No Bookings Found</div>
      ) : (
        <BookingTable bookings={bookings} onView={handleView} />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">

        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(page - 1)}
          className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-text-gray">
          Page {pagination.currentPage || 1} of {pagination.totalPages || 1} ({pagination.totalBookings || 0} total)
        </span>

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(page + 1)}
          className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

      <BookingDetails booking={viewBooking} open={viewOpen} onClose={handleCloseView} />

    </div>
  );
};

export default Bookings;