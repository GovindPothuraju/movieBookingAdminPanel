import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";

import { getScreens, getDeletedScreens, getTheaterById, reactivateScreen } from "../services/screenService";
import ScreenTable from "../componenets/screens/ScreenTable";
import DeletedScreenTable from "../componenets/screens/DeletedScreenTable";
import ScreenForm from "../componenets/screens/ScreenForm";
import ScreenDetails from "../componenets/screens/ScreenDetails";
import DeleteScreenModal from "../componenets/screens/DeleteScreenModal";

const LIMIT_OPTIONS = [10, 20, 30, 50];
const TYPE_OPTIONS = ["ALL", "2D", "3D", "IMAX", "4DX"];

const ManageScreens = () => {
  const { theaterId } = useParams();
  const navigate = useNavigate();

  const [theater, setTheater] = useState(null);

  const [tab, setTab] = useState("active"); // "active" | "deleted"

  const [screens, setScreens] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);

  const [screenType, setScreenType] = useState("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [open, setOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewScreen, setViewScreen] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteScreenTarget, setDeleteScreenTarget] = useState(null);

  const fetchTheater = async () => {
    try {
      const data = await getTheaterById(theaterId);
      setTheater(data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const fetchScreens = async () => {
    try {
      setLoading(true);

      const service = tab === "deleted" ? getDeletedScreens : getScreens;
      const data = await service({ theaterId, page, limit });

      setScreens(data.data);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheater();
  }, [theaterId]);

  useEffect(() => {
    fetchScreens();
  }, [page, limit, tab, theaterId]);

  const switchTab = (newTab) => {
    setTab(newTab);
    setPage(1);
  };

  const handleAdd = () => {
    setSelectedScreen(null);
    setOpen(true);
  };

  const handleEdit = (screen) => {
    setSelectedScreen(screen);
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedScreen(null);
  };

  const handleView = (screen) => {
    setViewScreen(screen);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setViewScreen(null);
  };

  const handleDelete = (screen) => {
    setDeleteScreenTarget(screen);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setDeleteScreenTarget(null);
  };

  const handleReactivate = async (screen) => {
    try {
      const response = await reactivateScreen(screen._id);
      alert(response.message);
      fetchScreens();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to reactivate screen");
    }
  };

  // Type filter applied client-side since neither screens route currently
  // accepts a screenType query param on the backend.
  const filteredScreens =
    screenType === "ALL" ? screens : screens.filter((s) => s.screenType === screenType);

  return (
    <div className="space-y-6">

      {/* Back link */}
      <button
        onClick={() => navigate("/admin/theaters")}
        className="flex items-center gap-1.5 text-sm font-semibold text-text-gray transition hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Theaters
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            {theater?.name || "Loading theater..."}
          </h1>

          <p className="text-text-gray">
            {theater?.city}
          </p>

        </div>

        {tab === "active" && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Screen
          </button>
        )}

      </div>

      {/* Tabs */}
      <div className="flex w-fit rounded-xl border border-border-light bg-white p-1">

        <button
          onClick={() => switchTab("active")}
          className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${tab === "active" ? "bg-primary text-white" : "text-text-gray hover:text-primary"}`}
        >
          Active
        </button>

        <button
          onClick={() => switchTab("deleted")}
          className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${tab === "deleted" ? "bg-accent text-white" : "text-text-gray hover:text-accent"}`}
        >
          Deleted
        </button>

      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row">

        <select
          value={screenType}
          onChange={(e) => setScreenType(e.target.value)}
          className="rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-48"
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t === "ALL" ? "All Screen Types" : t}
            </option>
          ))}
        </select>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-40"
        >
          {LIMIT_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l} per page
            </option>
          ))}
        </select>

        {screenType !== "ALL" && (
          <button
            onClick={() => setScreenType("ALL")}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-border-light px-4 py-3 text-sm font-medium text-text-gray transition hover:border-accent hover:text-accent"
          >
            <X size={16} />
            Clear
          </button>
        )}

      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          Loading...
        </div>
      ) : filteredScreens.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          {tab === "deleted" ? "No Deleted Screens" : "No Screens Found"}
        </div>
      ) : tab === "deleted" ? (
        <DeletedScreenTable screens={filteredScreens} onView={handleView} onReactivate={handleReactivate} />
      ) : (
        <ScreenTable screens={filteredScreens} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">

        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(page - 1)}
          className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-text-gray">

          Page {pagination.page || 1}
          {" "}of{" "}
          {pagination.totalPages || 1}
          {" "}
          ({pagination.totalScreens || 0} total)

        </span>

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(page + 1)}
          className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-page shadow-xl">
            <ScreenForm
              theaterId={theaterId}
              initialData={selectedScreen}
              onClose={handleCloseForm}
              refreshScreens={fetchScreens}
            />
          </div>
        </div>
      )}

      <ScreenDetails screen={viewScreen} open={viewOpen} onClose={handleCloseView} />

      {deleteOpen && (
        <DeleteScreenModal
          screen={deleteScreenTarget}
          onClose={handleCloseDelete}
          refreshScreens={fetchScreens}
        />
      )}

    </div>
  );
};

export default ManageScreens;