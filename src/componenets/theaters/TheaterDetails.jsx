import { useEffect, useState } from "react";
import { X, MapPin, Mail, Phone, Monitor } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const TheaterDetails = ({ theater, open, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !theater?._id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${BASE_URL}/theaters/${theater._id}`, {
          withCredentials: true,
        });

        setDetails(response.data.data);
      } catch (err) {
        console.log(err.response?.data);
        setError(err.response?.data?.message || "Failed to load theater details");
        setDetails(theater);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [open, theater]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  if (!open || !theater) return null;

  const data = details || theater;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border-light bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-heading">Theater Details</h2>
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

            <h1 className="text-2xl font-bold text-heading">{data.name}</h1>

            {error && (
              <p className="mt-2 text-sm font-medium text-accent">{error}</p>
            )}

            <div className="mt-4 flex items-start gap-2 text-sm text-text-gray">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>
                {[data.address?.street, data.address?.area, data.city, data.address?.state, data.address?.pincode].filter(Boolean).join(", ")}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-gray">
              {data.contactEmail && (
                <span className="flex items-center gap-1.5">
                  <Mail size={15} />
                  {data.contactEmail}
                </span>
              )}

              {data.contactPhone && (
                <span className="flex items-center gap-1.5">
                  <Phone size={15} />
                  {data.contactPhone}
                </span>
              )}
            </div>

            {/* Amenities */}
            {data.amenities?.length > 0 && (
              <div className="mt-6 border-t border-border-light pt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {data.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Screens */}
            {data.screens?.length > 0 && (
              <div className="mt-6 border-t border-border-light pt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Screens</h3>
                <div className="space-y-2">
                  {data.screens.map((screen) => (
                    <div key={screen._id} className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-primary" />
                        <span className="font-medium text-heading">{screen.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-gray">
                        <span>{screen.totalSeats} seats</span>
                        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">{screen.screenType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end border-t border-border-light px-6 py-4">
          <button onClick={onClose} className="rounded-xl border border-border-light px-6 py-2.5 font-semibold text-text-gray transition hover:bg-primary-light">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default TheaterDetails;