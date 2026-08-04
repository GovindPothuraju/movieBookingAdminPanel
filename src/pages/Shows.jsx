import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import { getShows } from "../services/showService";
import { getTheaters } from "../services/theaterService";

import ShowTable from "../componenets/shows/ShowTable";
import ShowForm from "../componenets/shows/ShowForm";
import ShowEditForm from "../componenets/shows/ShowEditForm";
import ShowDetails from "../componenets/shows/ShowDetails";
import DeleteShowModal from "../componenets/shows/DeleteShowModal";

const LIMIT_OPTIONS = [10, 20, 30, 50];
const STATUS_OPTIONS = ["SCHEDULED", "CANCELLED", "COMPLETED"];

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [pagination, setPagination] = useState({});
  const [theaters, setTheaters] = useState([]);

  const [loading, setLoading] = useState(true);

  const [theaterId, setTheaterId] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editShow, setEditShow] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewShow, setViewShow] = useState(null);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelShowTarget, setCancelShowTarget] = useState(null);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const data = await getShows({ page, limit, theaterId, status, date });
      setShows(data.data);
      setPagination(data.pagination || {});
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchTheaters = async () => {
    try {
      const data = await getTheaters({ page: 1, limit: 50 });
      setTheaters(data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  useEffect(() => {
    fetchShows();
  }, [page, limit, theaterId, status, date]);

  const clearFilters = () => {
    setTheaterId("");
    setStatus("");
    setDate("");
    setPage(1);
  };

  const hasActiveFilters = theaterId || status || date;

  const handleAdd = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  const handleEdit = (show) => {
    setEditShow(show);
    setEditOpen(true);
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
    setEditShow(null);
  };

  const handleView = (show) => {
    setViewShow(show);
    setViewOpen(true);
  };
  const handleCloseView = () => {
    setViewOpen(false);
    setViewShow(null);
  };

  const handleCancelRequest = (show) => {
    setCancelShowTarget(show);
    setCancelOpen(true);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
    setCancelShowTarget(null);
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">Shows</h1>
          <p className="text-text-gray">Schedule and manage showtimes.</p>
        </div>

        <button onClick={handleAdd} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white transition hover:bg-orange-600">
          <Plus size={18} />
          Add Show
        </button>

      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row">

        <select
          value={theaterId}
          onChange={(e) => { setTheaterId(e.target.value); setPage(1); }}
          className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-56"
        >
          <option value="">All Theaters</option>
          {theaters.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-48"
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setPage(1); }}
          className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-48"
        />

        <select
          value={limit}
          onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
          className="rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-40"
        >
          {LIMIT_OPTIONS.map((l) => (
            <option key={l} value={l}>{l} per page</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-border-light px-4 py-3 text-sm font-medium text-text-gray transition hover:border-accent hover:text-accent">
            <X size={16} />
            Clear Filters
          </button>
        )}

      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">Loading...</div>
      ) : shows.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">No Shows Found</div>
      ) : (
        <ShowTable shows={shows} onView={handleView} onEdit={handleEdit} onCancel={handleCancelRequest} />
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
          Page {pagination.page || 1} of {pagination.totalPages || 1} ({pagination.totalShows || 0} total)
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
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-page shadow-xl">
            <ShowForm onClose={handleCloseForm} refreshShows={fetchShows} />
          </div>
        </div>
      )}

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-page shadow-xl">
            <ShowEditForm show={editShow} onClose={handleCloseEdit} refreshShows={fetchShows} />
          </div>
        </div>
      )}

      <ShowDetails show={viewShow} open={viewOpen} onClose={handleCloseView} />

      {cancelOpen && (
        <DeleteShowModal show={cancelShowTarget} onClose={handleCloseCancel} refreshShows={fetchShows} />
      )}

    </div>
  );
};

export default Shows;