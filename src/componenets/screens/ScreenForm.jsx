import { useState } from "react";
import axios from "axios";

const SCREEN_TYPE_OPTIONS = ["2D", "3D", "IMAX", "4DX"];

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const ScreenForm = ({ theaterId, onClose, refreshScreens, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    rows: initialData?.rows || "",
    columns: initialData?.columns || "",
    screenType: initialData?.screenType || "2D",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalSeats =
    Number(formData.rows) > 0 && Number(formData.columns) > 0
      ? Number(formData.rows) * Number(formData.columns)
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let response;

      if (initialData) {
        // Only screenType is editable once a screen exists
        response = await axios.patch(
          `${BASE_URL}/screens/${initialData._id}`,
          { screenType: formData.screenType },
          { withCredentials: true }
        );
      } else {
        const payload = {
          name: formData.name,
          rows: Number(formData.rows),
          columns: Number(formData.columns),
          screenType: formData.screenType,
        };

        response = await axios.post(`${BASE_URL}/theaters/${theaterId}/screens`, payload, {
          withCredentials: true,
        });
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
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-8 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading sm:text-3xl">
        {initialData ? "Edit Screen" : "Add Screen"}
      </h1>

      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border-light bg-white p-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Screen Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Screen A"
            value={formData.name}
            onChange={handleChange}
            disabled={!!initialData}
            className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:bg-orange-50 disabled:text-text-gray"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-heading">Rows</label>
            <input
              type="number"
              name="rows"
              min="1"
              placeholder="e.g. 10"
              value={formData.rows}
              onChange={handleChange}
              disabled={!!initialData}
              className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:bg-orange-50 disabled:text-text-gray"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-heading">Columns</label>
            <input
              type="number"
              name="columns"
              min="1"
              placeholder="e.g. 12"
              value={formData.columns}
              onChange={handleChange}
              disabled={!!initialData}
              className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:bg-orange-50 disabled:text-text-gray"
            />
          </div>

        </div>

        {totalSeats && (
          <p className="text-sm text-text-gray">
            Total seats: <span className="font-semibold text-heading">{totalSeats}</span>
          </p>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Screen Type</label>
          <div className="flex flex-wrap gap-2">
            {SCREEN_TYPE_OPTIONS.map((type) => {
              const active = formData.screenType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, screenType: type }))}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-border-light bg-white text-text-gray hover:border-primary hover:text-primary"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {initialData && (
          <p className="text-sm text-text-gray">
            Name and layout can't be changed after creation. Only screen type can be updated.
          </p>
        )}

      </div>

      <div className="flex justify-end gap-3 pb-4">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Saving..." : initialData ? "Update Screen" : "Create Screen"}
        </button>
      </div>

    </form>
  );
};

export default ScreenForm;