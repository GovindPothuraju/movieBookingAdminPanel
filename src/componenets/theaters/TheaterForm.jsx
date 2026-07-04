import { useState } from "react";
import axios from "axios";
const AMENITY_OPTIONS = [
  "PARKING",
  "FOOD COURT",
  "WHEELCHAIR ACCESSIBLE",
  "AC",
  "DOLBY ATOMS",
  "IMAX",
  "ONLINE BOOKING",
  "WIFI",
];
const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const TheaterForm = ({ onClose, refreshTheaters, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    city: initialData?.city || "",
    address: {
      street: initialData?.address?.street || "",
      area: initialData?.address?.area || "",
      state: initialData?.address?.state || "",
      pincode: initialData?.address?.pincode || "",
    },
    contactEmail: initialData?.contactEmail || "",
    contactPhone: initialData?.contactPhone || "",
    amenities: initialData?.amenities || [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        city: formData.city,
        address: formData.address,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        amenities: formData.amenities,
      };

      let response;

      if (initialData) {
        response = await axios.patch(`${BASE_URL}/theaters/${initialData._id}`, payload, {
          withCredentials: true,
        });
      } else {
        response = await axios.post(`${BASE_URL}/theaters`, payload, {
          withCredentials: true,
        });
      }

      alert(response.data.message);

      if (refreshTheaters) refreshTheaters();
      if (onClose) onClose();
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Failed to save theater");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading sm:text-3xl">
        {initialData ? "Edit Theater" : "Create Theater"}
      </h1>

      {/* Basic Fields */}
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border-light bg-white p-5 sm:grid-cols-2">

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Theater Name</label>
          <input type="text" name="name" placeholder="Theater Name" value={formData.name} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">City</label>
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">State</label>
          <input type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleAddressChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Street</label>
          <input type="text" name="street" placeholder="Street Address" value={formData.address.street} onChange={handleAddressChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Area / Landmark</label>
          <input type="text" name="area" placeholder="Area" value={formData.address.area} onChange={handleAddressChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Pincode</label>
          <input type="text" name="pincode" placeholder="Pincode" value={formData.address.pincode} onChange={handleAddressChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Contact Email</label>
          <input type="email" name="contactEmail" placeholder="contact@theater.com" value={formData.contactEmail} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Contact Phone</label>
          <input type="tel" name="contactPhone" placeholder="Contact Phone" value={formData.contactPhone} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        {/* Amenities */}
        {/* Amenities */}
        {/* Amenities */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITY_OPTIONS.map((amenity) => {
              const active = formData.amenities.includes(amenity);
              return (
                <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-white" : "border-border-light bg-white text-text-gray hover:border-primary hover:text-primary"}`}>
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pb-4">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Saving..." : initialData ? "Update Theater" : "Create Theater"}
        </button>
      </div>

    </form>
  );
};

export default TheaterForm;