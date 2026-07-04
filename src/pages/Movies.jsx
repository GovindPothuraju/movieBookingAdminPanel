import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";

import { getMovies } from "../services/movieService";
import MovieTable from "../componenets/movies/MovieTable";
import MovieForm from "../componenets/movies/MovieForm";
import MovieDetails from "../componenets/movies/MovieDetails";
import DeleteMovieModal from "../componenets/movies/DeleteMovieModal";

const GENRE_OPTIONS = ["ACTION", "DRAMA", "COMEDY", "THRILLER", "ROMANCE", "HORROR", "SCI_FI", "ANIMATION"];
const LANGUAGE_OPTIONS = ["TELUGU", "HINDI", "TAMIL", "MALAYALAM", "KANNADA", "ENGLISH"];

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewMovie, setViewMovie] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies({
        page,
        search,
        status,
        genre,
        language,
        sort,
      });
      setMovies(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, search, status, genre, language, sort]);

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setGenre("");
    setLanguage("");
    setSort("");
    setPage(1);
  };

  const hasActiveFilters = search || status || genre || language || sort;

  const handleAdd = () => {
    setSelectedMovie(null);
    setOpen(true);
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const handleView = (movie) => {
    setViewMovie(movie);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setViewMovie(null);
  };

  const handleDelete = (movie) => {
    setDeleteMovie(movie);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setDeleteMovie(null);
  };

  const handleStatusChange = async (movie, newStatus) => {
    try {
      const response = await axios.patch(
        `https://moviebookingbackend-icoh.onrender.com/movies/${movie._id}/status`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );

      setMovies((prev) =>
        prev.map((m) => (m._id === movie._id ? { ...m, status: response.data.data.status } : m))
      );
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Movies
          </h1>

          <p className="text-text-gray">
            Manage all movies.
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />

          Add Movie

        </button>

      </div>

      {/* Search & Filters */}
      <div className="space-y-3">

        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-48"
          >
            <option value="">All Status</option>
            <option value="NOW_SHOWING">Now Showing</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-48"
          >
            <option value="">All Genres</option>
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g.replace("_", " ")}
              </option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-48"
          >
            <option value="">All Languages</option>
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-border-light p-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 md:w-56"
          >
            <option value="">Sort By</option>
            <option value="releaseDate_desc">Release Date (Newest)</option>
            <option value="releaseDate_asc">Release Date (Oldest)</option>
            <option value="rating_desc">Rating (High to Low)</option>
            <option value="rating_asc">Rating (Low to High)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-border-light px-4 py-3 text-sm font-medium text-text-gray transition hover:border-accent hover:text-accent"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>

      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          Loading...
        </div>
      ) : movies.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          No Movies Found
        </div>
      ) : (
        <MovieTable movies={movies} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
      )}

      {/*pagination*/}
      <div className="flex items-center justify-between">

        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(page - 1)}
          className="rounded-lg border border-border-light px-4 py-2 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-text-gray">

          Page {pagination.currentPage || 1}
          {" "}of{" "}
          {pagination.totalPages || 1}

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
            <MovieForm
              initialData={selectedMovie}
              onClose={handleCloseForm}
              refreshMovies={fetchMovies}
            />
          </div>
        </div>
      )}

      <MovieDetails movie={viewMovie} open={viewOpen} onClose={handleCloseView} />

      {deleteOpen && (
        <DeleteMovieModal
          movie={deleteMovie}
          onClose={handleCloseDelete}
          refreshMovies={fetchMovies}
        />
      )}

    </div>
  );
};

export default Movies;