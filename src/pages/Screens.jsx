import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { getAllScreens } from "../services/screenService";
import AllScreensTable from "../componenets/screens/AllScreensTable";

const LIMIT_OPTIONS = [10, 20, 30, 50];

const Screens = () => {
  const [screens, setScreens] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchScreens = async () => {
    try {
      setLoading(true);

      const data = await getAllScreens({ page, limit, search });

      setScreens(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Small debounce so every keystroke doesn't fire a request
    const timer = setTimeout(() => {
      fetchScreens();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, limit, search]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Screens
        </h1>

        <p className="text-text-gray">
          All screens across your theater network.
        </p>
      </div>

      {/* Search + record count */}
      <div className="rounded-2xl border border-border-light bg-white p-4">

        <div className="flex items-center justify-between gap-4">

          <div className="relative w-full max-w-md">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-gray" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-border-light py-2.5 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>

          <span className="whitespace-nowrap text-sm text-text-gray">
            {pagination.totalScreens ?? 0} records
          </span>

        </div>

      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          Loading...
        </div>
      ) : screens.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          No Screens Found
        </div>
      ) : (
        <AllScreensTable screens={screens} />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="rounded-lg border border-border-light px-3 py-2 text-sm outline-none transition focus:border-primary"
        >
          {LIMIT_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l} per page
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">

          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-text-gray">
            Page {pagination.page || 1} of {pagination.totalPages || 1}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default Screens;