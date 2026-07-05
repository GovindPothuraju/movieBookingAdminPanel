import { useState } from "react";

const DeleteSeatLayoutModal = ({ onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-heading">Delete Seat Layout</h2>

        <p className="mt-4 text-text-gray">
          This will permanently remove all seats for this screen. You'll need to recreate the layout from scratch. This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button onClick={onClose} disabled={loading} className="rounded-xl border border-border-light px-5 py-2.5 font-semibold text-text-gray transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50">
            Cancel
          </button>

          <button onClick={handleDelete} disabled={loading} className="rounded-xl bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteSeatLayoutModal;