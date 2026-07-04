import { useState } from "react";
import { RotateCcw } from "lucide-react";

const DeletedTheaterRow = ({ theater, onReactivate }) => {
  const [loading, setLoading] = useState(false);

  const handleReactivate = async () => {
    try {
      setLoading(true);
      await onReactivate(theater);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-border-light">

      <td className="px-4 py-4 font-medium">
        {theater.name}
      </td>

      <td className="px-4 py-4">
        {theater.city}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {theater.address?.street || "—"}
      </td>

      <td className="px-4 py-4 text-text-gray">
        {theater.contactEmail || "—"}
      </td>

      <td className="px-4 py-4">

        <button
          onClick={handleReactivate}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RotateCcw size={14} className={loading ? "animate-spin" : ""} />
          {loading ? "Restoring..." : "Reactivate"}
        </button>

      </td>

    </tr>
  );
};

export default DeletedTheaterRow;