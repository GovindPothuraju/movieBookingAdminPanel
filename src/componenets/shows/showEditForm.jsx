import { useState } from "react";
import { updateShow } from "../../services/showService";

const STATUS_OPTIONS = ["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"];

const ShowEditForm = ({ show, onClose, refreshShows }) => {
  const [priceMap, setPriceMap] = useState({ ...show.priceMap });
  const [status, setStatus] = useState(show.status);
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (category, value) => {
    setPriceMap((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const numericPriceMap = {};
      Object.entries(priceMap).forEach(([cat, price]) => {
        numericPriceMap[cat] = Number(price);
      });

      const response = await updateShow(show._id, { priceMap: numericPriceMap, status });
      alert(response.message);

      if (refreshShows) refreshShows();
      if (onClose) onClose();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to update show");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-6 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading">Edit Show</h1>

      <div className="rounded-2xl border border-border-light bg-white p-5">
        <p className="text-sm text-text-gray">
          {show.movieId?.title} · {show.theaterId?.name} · {show.screenId?.name}
        </p>
        <p className="mt-1 text-xs text-text-gray">
          Movie, theater, screen, date, and time can't be changed here — only pricing and status.
        </p>
      </div>

      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-3 block text-sm font-medium text-heading">Seat Category Prices</label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.keys(priceMap).map((cat) => (
            <div key={cat}>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-gray">{cat} Price</label>
              <input
                type="number"
                min="1"
                value={priceMap[cat]}
                onChange={(e) => handlePriceChange(cat, e.target.value)}
                className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-heading">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pb-2">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Saving..." : "Update Show"}
        </button>
      </div>

    </form>
  );
};

export default ShowEditForm;