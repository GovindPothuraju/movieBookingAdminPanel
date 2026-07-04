import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const DeleteScreenModal = ({ screen, onClose, refreshScreens }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`${BASE_URL}/screens/${screen._id}`, {
        withCredentials: true,
      });

      alert(response.data.message);

      if (refreshScreens) refreshScreens();
      if (onClose) onClose();
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Failed to delete screen");
    } finally {
      setLoading(false);
    }
  };

  if (!screen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-bold text-heading">Delete Screen</h2>

        <p className="mt-2 text-sm text-text-gray">
          Are you sure you want to delete <span className="font-semibold text-heading">{screen.name}</span>?
          It will move to the Deleted tab and can be reactivated later.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-border-light px-5 py-2.5 font-semibold text-text-gray transition hover:bg-primary-light">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-accent px-5 py-2.5 font-semibold text-white shadow-md shadow-accent/20 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Screen"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteScreenModal;