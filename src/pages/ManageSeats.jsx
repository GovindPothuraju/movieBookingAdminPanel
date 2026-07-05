import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getScreenById } from "../services/screenService";
import { getSeatLayout, createSeatLayout, updateSeatLayout, deleteSeatLayout } from "../services/seatService";

import SeatLayout from "../componenets/seats/SeatLayout";
import SeatLayoutForm from "../componenets/seats/SeatLayoutForm";
import DeleteSeatLayoutModal from "../componenets/seats/DeleteSeatLayoutModal";

const ManageSeats = () => {
  const { screenId } = useParams();
  const navigate = useNavigate();

  const [screen, setScreen] = useState(null);
  const [seats, setSeats] = useState(null); // { A: [...], B: [...] } or null if none
  const [totalSeats, setTotalSeats] = useState(null); // null = unknown yet, distinct from 0

  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create"); // "create" | "edit"

  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchScreen = async () => {
    try {
      const data = await getScreenById(screenId);
      setScreen(data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const data = await getSeatLayout(screenId);
      setSeats(data.data.seats);
      setTotalSeats(data.data.totalSeats);
    } catch (err) {
      // 404 here just means no layout exists yet — not a real error
      setSeats(null);
      setTotalSeats(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreen();
    fetchSeats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenId]);

  const handleCreateLayout = async ({ rows, columns, layout }) => {
    try {
      const response = await createSeatLayout(screenId, { rows, columns, layout });
      alert(response.message);
      setFormOpen(false);
      await fetchSeats();
      await fetchScreen();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to create seat layout");
    }
  };

  const handleUpdateLayout = async ({ rows, columns, layout }) => {
    try {
      const response = await updateSeatLayout(screenId, { rows, columns, layout });
      alert(response.message);
      setFormOpen(false);
      await fetchSeats();
      await fetchScreen();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to update seat layout");
    }
  };

  const handleDeleteLayout = async () => {
    try {
      const response = await deleteSeatLayout(screenId);
      alert(response.message);
      setDeleteOpen(false);
      await fetchSeats();
      await fetchScreen();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to delete seat layout");
    }
  };

  const openCreateForm = () => {
    setFormMode("create");
    setFormOpen(true);
  };

  const openEditForm = () => {
    setFormMode("edit");
    setFormOpen(true);
  };

  // totalSeats (from the seat layout endpoint) is always the source of truth
  // once it's been fetched — it reflects what actually exists right now.
  // Only fall back to screen.totalSeats before that first fetch resolves.
  const displaySeatCount = totalSeats !== null ? totalSeats : screen?.totalSeats ?? 0;

  return (
    <div className="space-y-6">

      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-semibold text-text-gray transition hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Screens
      </button>

      {/* Screen header */}
      <div className="rounded-2xl border border-border-light bg-white p-6">
        <h1 className="text-2xl font-bold text-heading">{screen?.name || "Loading screen..."}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-gray">
          {screen?.screenType && (
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {screen.screenType}
            </span>
          )}
          <span>{displaySeatCount} Seats</span>
        </div>
      </div>

      {/* Layout / Empty state */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-text-gray">
          Loading seat layout...
        </div>
      ) : seats && Object.keys(seats).length > 0 ? (
        <SeatLayout
          seats={seats}
          totalSeats={totalSeats}
          onEdit={openEditForm}
          onDelete={() => setDeleteOpen(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border-light bg-white p-14 text-center">
          <p className="text-text-gray">No layout created for this screen yet.</p>
          <button
            onClick={openCreateForm}
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Create Layout
          </button>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-page shadow-xl">
            <SeatLayoutForm
              mode={formMode}
              onClose={() => setFormOpen(false)}
              onSubmit={formMode === "edit" ? handleUpdateLayout : handleCreateLayout}
            />
          </div>
        </div>
      )}

      {deleteOpen && (
        <DeleteSeatLayoutModal
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDeleteLayout}
        />
      )}

    </div>
  );
};

export default ManageSeats;