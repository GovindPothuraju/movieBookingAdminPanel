import { useState } from "react";
import { cancelShow } from "../../services/showService";

const DeleteShowModal = ({ show, onClose, refreshShows }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await cancelShow(show._id);
      alert(response.message);
      refreshShows();
      onClose();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to cancel show");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-heading">Cancel Show?</h2>

        <p className="mt-4 text-text-gray">
          <span className="font-semibold text-heading">{show.movieId?.title}</span> at{" "}
          <span className="font-semibold text-heading">{show.theaterId?.name}</span> will be marked as cancelled. This cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button onClick={onClose} disabled={loading} className="rounded-xl border border-border-light px-5 py-2.5 font-semibold text-text-gray transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50">
            No
          </button>

          <button onClick={handleCancel} disabled={loading} className="rounded-xl bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Cancelling..." : "Yes, Cancel Show"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteShowModal;