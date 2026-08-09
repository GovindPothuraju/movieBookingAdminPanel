import { useEffect, useState } from "react";
import { X, User, Mail, Film, MapPin, Monitor, Calendar, Ticket } from "lucide-react";
import { getBookingById } from "../../services/bookingService";

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
};

const BookingDetails = ({ booking, open, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !booking) return;

    const lookupId = booking.bookingId || booking._id;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await getBookingById(lookupId);
        setDetails(response.data);
      } catch (err) {
        console.log(err.response?.data);
        setDetails(booking); // fall back to row data
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [open, booking]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  if (!open || !booking) return null;

  const data = details || booking;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="sticky top-0 flex items-center justify-between border-b border-border-light bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-heading">Booking Details</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-text-gray transition hover:bg-primary-light hover:text-primary">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-text-gray">
            Loading booking details...
          </div>
        ) : (
          <div className="px-6 py-6">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-gray">Booking ID</p>
                <p className="text-lg font-bold text-heading">{data.bookingId || data._id}</p>
              </div>

              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[data.status?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}>
                {data.status || "—"}
              </span>
            </div>

            {/* User */}
            <div className="mt-6 border-t border-border-light pt-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Customer</h3>
              <div className="space-y-1.5 text-sm text-heading">
                <p className="flex items-center gap-2"><User size={14} className="text-primary" /> {data.userId?.name || "—"}</p>
                <p className="flex items-center gap-2 text-text-gray"><Mail size={14} /> {data.userId?.email || "—"}</p>
              </div>
            </div>

            {/* Show info */}
            <div className="mt-6 border-t border-border-light pt-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Show</h3>
              <div className="space-y-1.5 text-sm text-heading">
                <p className="flex items-center gap-2"><Film size={14} className="text-primary" /> {data.movieId?.title || "—"}</p>
                <p className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {data.theaterId?.name || "—"}</p>
                <p className="flex items-center gap-2"><Monitor size={14} className="text-primary" /> {data.screenId?.name || "—"}</p>
                <p className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {data.showId?.showTime ? new Date(data.showId.showTime).toLocaleString() : "—"}
                </p>
              </div>
            </div>

            {/* Seats */}
            {data.seats?.length > 0 && (
              <div className="mt-6 border-t border-border-light pt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Seats</h3>
                <div className="flex flex-wrap gap-2">
                  {data.seats.map((seat, i) => (
                    <span key={i} className="flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
                      <Ticket size={13} />
                      {typeof seat === "string" ? seat : seat.seatLabel}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="mt-6 border-t border-border-light pt-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Payment</h3>
              <div className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3">
                <span className="text-sm text-text-gray">Total Amount</span>
                <span className="text-lg font-bold text-heading">
                  {data.totalAmount != null ? `₹${data.totalAmount}` : "—"}
                </span>
              </div>
            </div>

            {data.createdAt && (
              <p className="mt-6 text-center text-xs text-text-gray">
                Booked on {new Date(data.createdAt).toLocaleString()}
              </p>
            )}

          </div>
        )}

        <div className="flex justify-end border-t border-border-light px-6 py-4">
          <button onClick={onClose} className="rounded-xl border border-border-light px-6 py-2.5 font-semibold text-text-gray transition hover:bg-primary-light">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingDetails;