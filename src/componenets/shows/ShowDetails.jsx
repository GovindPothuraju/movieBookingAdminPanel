import { X, MapPin, Monitor, Calendar, Clock } from "lucide-react";

const STATUS_STYLES = {
  SCHEDULED: "bg-green-100 text-green-700",
  ONGOING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const ShowDetails = ({ show, open, onClose }) => {
  if (!open || !show) return null;

  const dateObj = new Date(show.showTime);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="sticky top-0 flex items-center justify-between border-b border-border-light bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-heading">Show Details</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-text-gray transition hover:bg-primary-light hover:text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6">

          <div className="flex gap-4">
            {show.movieId?.poster && (
              <img src={show.movieId.poster} alt={show.movieId.title} className="h-32 w-24 shrink-0 rounded-xl object-cover" />
            )}

            <div>
              <h1 className="text-xl font-bold text-heading">{show.movieId?.title}</h1>

              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[show.status] || "bg-gray-100 text-gray-700"}`}>
                {show.status}
              </span>

              <div className="mt-3 space-y-1.5 text-sm text-text-gray">
                <p className="flex items-center gap-1.5"><MapPin size={14} /> {show.theaterId?.name}</p>
                <p className="flex items-center gap-1.5"><Monitor size={14} /> {show.screenId?.name}</p>
                <p className="flex items-center gap-1.5"><Calendar size={14} /> {dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                <p className="flex items-center gap-1.5"><Clock size={14} /> {dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
          </div>

          {/* Price List */}
          {show.priceMap && (
            <div className="mt-6 border-t border-border-light pt-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Price List</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(show.priceMap).map(([cat, price]) => (
                  <span key={cat} className="rounded-full bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
                    {cat}: ₹{price}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Available Seats */}
          {show.availableSeats !== undefined && (
            <div className="mt-6 border-t border-border-light pt-5">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-gray">Availability</h3>
              <p className="text-sm text-heading">{show.availableSeats} / {show.totalSeats} seats available</p>
            </div>
          )}

        </div>

        <div className="flex justify-end border-t border-border-light px-6 py-4">
          <button onClick={onClose} className="rounded-xl border border-border-light px-6 py-2.5 font-semibold text-text-gray transition hover:bg-primary-light">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShowDetails;
