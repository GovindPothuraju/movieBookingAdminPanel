import { useEffect, useState } from "react";
import axios from "axios";

import { getTheaters } from "../../services/theaterService";
import { getScreensForTheater } from "../../services/screenService";
import { getSeatLayout } from "../../services/seatService";
import { getMovies } from "../../services/movieService";
import { createShow } from "../../services/showService";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

const ShowForm = ({ onClose, refreshShows }) => {
  const [theaters, setTheaters] = useState([]);
  const [screens, setScreens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);

  const [theaterId, setTheaterId] = useState("");
  const [screenId, setScreenId] = useState("");
  const [movieId, setMovieId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priceMap, setPriceMap] = useState({});

  const [loadingScreens, setLoadingScreens] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. Load theaters on mount
  useEffect(() => {
    const loadTheaters = async () => {
      try {
        const data = await getTheaters({ page: 1, limit: 50 });
        setTheaters(data.data);
      } catch (err) {
        console.log(err.response?.data);
      }
    };
    loadTheaters();
  }, []);

  // 2. Load screens when theater changes
  useEffect(() => {
    setScreenId("");
    setScreens([]);
    setCategories([]);
    setPriceMap({});

    if (!theaterId) return;

    const loadScreens = async () => {
      try {
        setLoadingScreens(true);
        const data = await getScreensForTheater(theaterId);
        setScreens(data.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoadingScreens(false);
      }
    };

    loadScreens();
  }, [theaterId]);

  // 3. Load seat categories when screen changes
  useEffect(() => {
    setCategories([]);
    setPriceMap({});

    if (!screenId) return;

    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getSeatLayout(screenId);

        const uniqueCategories = new Set();
        Object.values(data.data.seats).forEach((rowSeats) => {
          rowSeats.forEach((seat) => uniqueCategories.add(seat.category));
        });

        const categoryList = Array.from(uniqueCategories);
        setCategories(categoryList);

        const initialPrices = {};
        categoryList.forEach((cat) => {
          initialPrices[cat] = "";
        });
        setPriceMap(initialPrices);
      } catch (err) {
        console.log(err.response?.data);
        alert(err.response?.data?.message || "This screen has no seat layout yet. Create one before scheduling a show.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [screenId]);

  // 4. Load movies once (independent of theater/screen selection)
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoadingMovies(true);
        const response = await axios.get(`${BASE_URL}/movies`, {
          params: { page: 1, limit: 100, status: "NOW_SHOWING" },
          withCredentials: true,
        });
        setMovies(response.data.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoadingMovies(false);
      }
    };
    loadMovies();
  }, []);

  const handlePriceChange = (category, value) => {
    setPriceMap((prev) => ({ ...prev, [category]: value }));
  };

  const isPriceStepReady = Boolean(movieId) && categories.length > 0;
  const isSubmitReady =
    theaterId && screenId && movieId && date && time && categories.every((cat) => priceMap[cat] !== "" && Number(priceMap[cat]) > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSubmitReady) {
      alert("Please complete all steps before saving.");
      return;
    }

    try {
      setSubmitting(true);

      const showTime = new Date(`${date}T${time}`).toISOString();

      const numericPriceMap = {};
      Object.entries(priceMap).forEach(([cat, price]) => {
        numericPriceMap[cat] = Number(price);
      });

      const payload = {
        movieId,
        theaterId,
        screenId,
        showTime,
        priceMap: numericPriceMap,
      };

      const response = await createShow(payload);
      alert(response.message);

      if (refreshShows) refreshShows();
      if (onClose) onClose();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to create show");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading">Schedule Show</h1>

      {/* Step 1: Theater */}
      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-heading">1. Select Theater</label>
        <select
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
          className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        >
          <option value="">Choose a theater...</option>
          {theaters.map((t) => (
            <option key={t._id} value={t._id}>{t.name} — {t.city}</option>
          ))}
        </select>
      </div>

      {/* Step 2: Screen */}
      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-heading">2. Select Screen</label>
        <select
          value={screenId}
          onChange={(e) => setScreenId(e.target.value)}
          disabled={!theaterId || loadingScreens}
          className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-primary-light/40 disabled:text-text-gray"
        >
          <option value="">
            {loadingScreens ? "Loading screens..." : !theaterId ? "Select a theater first" : "Choose a screen..."}
          </option>
          {screens.map((s) => (
            <option key={s._id} value={s._id}>{s.name} ({s.screenType})</option>
          ))}
        </select>
      </div>

      {/* Step 3: Movie */}
      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-heading">3. Select Movie</label>
        <select
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          disabled={loadingMovies}
          className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        >
          <option value="">{loadingMovies ? "Loading movies..." : "Choose a movie..."}</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>{m.title}</option>
          ))}
        </select>
      </div>

      {/* Step 4: Date & Time */}
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border-light bg-white p-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">4. Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">5. Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

      </div>

      {/* Step 5: Prices (dynamic per category) */}
      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-heading">6. Seat Category Prices</label>

        {loadingCategories ? (
          <p className="text-sm text-text-gray">Loading seat categories...</p>
        ) : !screenId ? (
          <p className="text-sm text-text-gray">Select a screen to load its seat categories.</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-accent">This screen has no seat layout. Create one before scheduling a show here.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories.map((cat) => (
              <div key={cat}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-gray">{cat} Price</label>
                <input
                  type="number"
                  min="1"
                  placeholder="₹"
                  value={priceMap[cat] || ""}
                  onChange={(e) => handlePriceChange(cat, e.target.value)}
                  className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pb-4">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isSubmitReady || submitting}
          className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Create Show"}
        </button>
      </div>

    </form>
  );
};

export default ShowForm;