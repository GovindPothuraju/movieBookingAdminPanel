import { useState } from "react";
import axios from "axios";

const SCREEN_TYPE_OPTIONS = ["2D", "3D", "IMAX", "4DX"];

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const ScreenForm = ({ theaterId, onClose, refreshScreens, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    screenType: initialData?.screenType || "2D",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let response;

      if (initialData) {
        response = await axios.patch(
          `${BASE_URL}/screens/${initialData._id}`,
          { screenType: formData.screenType },
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/theaters/${theaterId}/screens`,
          formData,
          { withCredentials: true }
        );
      }

      alert(response.data.message);

      if (refreshScreens) refreshScreens();
      if (onClose) onClose();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to save screen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-6 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading">
        {initialData ? "Edit Screen" : "Add Screen"}
      </h1>

      <div className="space-y-5 rounded-2xl border border-border-light bg-white p-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Screen Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Audi 1"
            value={formData.name}
            onChange={handleChange}
            disabled={!!initialData}
            className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-primary-light/40 disabled:text-text-gray"
          />
          {initialData && (
            <p className="mt-1.5 text-xs text-text-gray">Screen name can't be changed after creation.</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Screen Type</label>
          <select
            name="screenType"
            value={formData.screenType}
            onChange={handleChange}
            className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          >
            {SCREEN_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {!initialData && (
          <p className="text-sm text-text-gray">
            Seat rows, columns, and categories are configured in the next step — after creating this screen, use "Seats" to build its layout.
          </p>
        )}

      </div>

      <div className="flex justify-end gap-3 pb-2">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Saving..." : initialData ? "Update Screen" : "Add Screen"}
        </button>
      </div>

    </form>
  );
};

export default ScreenForm;