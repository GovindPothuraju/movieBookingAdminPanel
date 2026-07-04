import { useEffect, useState } from "react";
import { X, Star, Clock, Calendar, User, Film } from "lucide-react";
import axios from "axios";

const MovieDetails = ({ movie, open, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !movie?._id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://moviebookingbackend-icoh.onrender.com/movies/${movie._id}`,
          {
            withCredentials: true,
          }
        );

        setDetails(response.data.data);
      } catch (err) {
        console.log(err.response?.data);

        // fall back to whatever summary data we already have
        setDetails(movie);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [open, movie]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  if (!open || !movie) return null;

  const data = details || movie;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border-light bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-heading">Movie Details</h2>
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

            {/* Poster + Title */}
            <div className="flex flex-col gap-5 sm:flex-row">

              {data.poster && (
                <img src={data.poster} alt={data.title} className="h-56 w-full rounded-xl object-cover sm:w-40" />
              )}

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-heading">{data.title}</h1>

                {data.rating && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-heading">
                    <Star size={16} className="fill-primary text-primary" />
                    {data.rating} / 10
                  </div>
                )}

                {data.genres?.length > 0 && (
                  <p className="mt-2 text-sm text-text-gray">
                    {data.genres.map((g) => g.replace("_", " ")).join(" • ")}
                  </p>
                )}

                {data.languages?.length > 0 && (
                  <p className="mt-1 text-sm text-text-gray">
                    {data.languages.join(", ")}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-gray">
                  {data.duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} />
                      {data.duration} mins
                    </span>
                  )}

                  {data.releaseDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={15} />
                      {new Date(data.releaseDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  )}
                </div>

                {data.status && (
                  <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${data.status === "NOW_SHOWING" ? "bg-green-100 text-green-700" : data.status === "UPCOMING" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                    {data.status.replace("_", " ")}
                  </span>
                )}
              </div>

            </div>

            {/* Cast */}
            {data.cast?.length > 0 && (
              <div className="mt-6 border-t border-border-light pt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Cast</h3>
                <div className="flex flex-wrap gap-3">
                  {data.cast.map((member, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-full border border-border-light bg-primary-light px-3 py-1.5">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="h-6 w-6 rounded-full object-cover" />
                      ) : (
                        <User size={14} className="text-primary" />
                      )}
                      <span className="text-sm font-medium text-heading">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crew */}
            {data.crew?.length > 0 && (
              <div className="mt-6 border-t border-border-light pt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-gray">Crew</h3>
                <div className="flex flex-wrap gap-3">
                  {data.crew.map((member, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-full border border-border-light bg-primary-light px-3 py-1.5">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="h-6 w-6 rounded-full object-cover" />
                      ) : (
                        <Film size={14} className="text-primary" />
                      )}
                      <span className="text-sm font-medium text-heading">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {data.description && (
              <div className="mt-6 border-t border-border-light pt-5">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-gray">Description</h3>
                <p className="text-sm leading-relaxed text-heading">{data.description}</p>
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

export default MovieDetails;