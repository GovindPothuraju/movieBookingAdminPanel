import { useEffect, useState } from "react";
import { X, Monitor, Building2 } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const ScreenDetails = ({ screen, open, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !screen?._id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${BASE_URL}/screens/${screen._id}`, {
          withCredentials: true,
        });

        setDetails(response.data.data);
      } catch (err) {
        console.log(err.response?.data);
        setError(err.response?.data?.message || "Failed to load screen details");
        setDetails(screen);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [open, screen]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  if (!open || !screen) return null;

  const data = details || screen;
  const theater = data.theaterId || {};

  const formatDate = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="sticky top-0 flex items-center justify-between border-b border-border-light bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-heading">Screen Details</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-text-gray transition hover:bg-primary-light hover:text-primary">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-text-gray">
            Loading details...
          </div>
        ) : (
          <div className="px-6 py-6">

            <div className="flex items-center gap-2">
              <Monitor size={20} className="text-primary" />
              <h1 className="text-2xl font-bold text-heading">{data.name}</h1>
            </div>

            {error && (
              <p className="mt-2 text-sm font-medium text-accent">{error}</p>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-text-gray">
              <Building2 size={16} className="text-primary" />
              <span>
                {[theater.name, theater.city].filter(Boolean).join(" · ") || "—"}
              </span>
            </div>

            <div className="mt-6 divide-y divide-border-light border-t border-border-light">

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-text-gray">Layout</span>
                <span className="font-semibold text-heading">{data.rows} rows × {data.columns} columns</span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-text-gray">Total Seats</span>
                <span className="font-semibold text-heading">
                  {data.totalSeats ?? (data.rows && data.columns ? data.rows * data.columns : "—")}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-text-gray">Screen Type</span>
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
                  {data.screenType}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-text-gray">Status</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    data.isActive ? "bg-green-100 text-green-700" : "bg-accent-light text-accent"
                  }`}
                >
                  {data.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-text-gray">Created Date</span>
                <span className="font-semibold text-heading">{formatDate(data.createdAt)}</span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-text-gray">Updated Date</span>
                <span className="font-semibold text-heading">{formatDate(data.updatedAt)}</span>
              </div>

            </div>

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

export default ScreenDetails;