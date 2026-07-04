import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

import { getTheaters, getDeletedTheaters, reactivateTheater } from "../services/theaterService";
import TheaterTable from "../componenets/theaters/TheaterTable";
import DeletedTheaterTable from "../componenets/theaters/DeletedTheaterTable";
import TheaterForm from "../componenets/theaters/TheaterForm";
import TheaterDetails from "../componenets/theaters/TheaterDetails";
import DeleteTheaterModal from "../componenets/theaters/DeleteTheaterModal";

const LIMIT = 10;

const Theaters = () => {
  const [tab, setTab] = useState("active"); // "active" | "deleted"

  const [theaters, setTheaters] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewTheater, setViewTheater] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTheater, setDeleteTheater] = useState(null);

  // Guards against out-of-order responses: only the response from the
  // *latest* request is allowed to update state.
  const requestId = useRef(0);

  const fetchTheaters = async (cityValue) => {
    const currentRequest = ++requestId.current;

    try {
      setLoading(true);
      const service = tab === "deleted" ? getDeletedTheaters : getTheaters;

      const data = await service({
        page,
        limit: LIMIT,
        city: cityValue,
      });

      // Ignore this response if a newer request has since been fired
      if (currentRequest !== requestId.current) return;

      setTheaters(data.data);
      setPagination(data.pagination);
    } catch (err) {
      if (currentRequest !== requestId.current) return;
      console.error(err);
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  };

  // Debounce the city filter so we don't fire a request per keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTheaters(city);
    }, 350);

    return () => clearTimeout(timer);
  }, [page, city, tab]);

  const switchTab = (newTab) => {
    setTab(newTab);
    setPage(1);
  };

  const handleAdd = () => {
    setSelectedTheater(null);
    setOpen(true);
  };

  const handleEdit = (theater) => {
    setSelectedTheater(theater);
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedTheater(null);
  };

  const handleView = (theater) => {
    setViewTheater(theater);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setViewTheater(null);
  };

  const handleDelete = (theater) => {
    setDeleteTheater(theater);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setDeleteTheater(null);
  };

  const handleReactivate = async (theater) => {
    try {
      const response = await reactivateTheater(theater._id);
      alert(response.message);
      fetchTheaters(city);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to reactivate theater");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Theaters
          </h1>

          <p className="text-text-gray">
            Manage all theaters.
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />

          Add Theater

        </button>

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

        <input
          type="text"
          placeholder="Filter by city..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-64"
        />

        {city && (
          <button
            onClick={() => {
              setCity("");
              setPage(1);
            }}
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
      ) : theaters.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          {tab === "deleted" ? "No Deleted Theaters" : "No Theaters Found"}
        </div>
      ) : tab === "deleted" ? (
        <DeletedTheaterTable theaters={theaters} onReactivate={handleReactivate} />
      ) : (
        <TheaterTable theaters={theaters} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
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
          ({pagination.totalTheaters || 0} total)

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
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-page shadow-xl">
            <TheaterForm
              initialData={selectedTheater}
              onClose={handleCloseForm}
              refreshTheaters={() => fetchTheaters(city)}
            />
          </div>
        </div>
      )}

      <TheaterDetails theater={viewTheater} open={viewOpen} onClose={handleCloseView} />

      {deleteOpen && (
        <DeleteTheaterModal
          theater={deleteTheater}
          onClose={handleCloseDelete}
          refreshTheaters={() => fetchTheaters(city)}
        />
      )}

    </div>
  );
};

export default Theaters;