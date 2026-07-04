import { useState } from "react";
import axios from "axios";

const GENRE_OPTIONS = ["ACTION", "DRAMA", "COMEDY", "THRILLER", "ROMANCE", "HORROR", "SCI_FI", "ANIMATION"];
const LANGUAGE_OPTIONS = ["TELUGU", "HINDI", "TAMIL", "MALAYALAM", "KANNADA", "ENGLISH"];
const STATUS_OPTIONS = ["UPCOMING", "NOW_SHOWING", "ARCHIVED"];

const MovieForm = ({ onClose, refreshMovies, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    genres: initialData?.genres || [],
    languages: initialData?.languages || [],
    duration: initialData?.duration || "",
    releaseDate: initialData?.releaseDate?.slice(0, 10) || "",
    rating: initialData?.rating || "",
    status: initialData?.status || "UPCOMING",
  });

  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cast, setCast] = useState(initialData?.cast || []);
  const [crew, setCrew] = useState(initialData?.crew || []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const toggleLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const addCast = () => {
    setCast((prev) => [
      ...prev,
      {
        name: "",
        image: null,
      },
    ]);
  };

  const updateCastName = (index, value) => {
    const updated = [...cast];
    updated[index].name = value;
    setCast(updated);
  };

  const updateCastImage = (index, file) => {
    const updated = [...cast];
    updated[index].image = file;
    setCast(updated);
  };

  const removeCast = (index) => {
    setCast(cast.filter((_, i) => i !== index));
  };

  const addCrew = () => {
    setCrew((prev) => [
      ...prev,
      {
        name: "",
        image: null,
      },
    ]);
  };

  const updateCrewName = (index, value) => {
    const updated = [...crew];
    updated[index].name = value;
    setCrew(updated);
  };

  const updateCrewImage = (index, file) => {
    const updated = [...crew];
    updated[index].image = file;
    setCrew(updated);
  };

  const removeCrew = (index) => {
    setCrew(crew.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // --------------------------
      // Basic Fields
      // --------------------------

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("releaseDate", formData.releaseDate);
      data.append("rating", formData.rating);
      data.append("status", formData.status);

      // --------------------------
      // Genres & Languages
      // --------------------------

      data.append("genres", JSON.stringify(formData.genres));
      data.append("languages", JSON.stringify(formData.languages));

      // --------------------------
      // Poster
      // --------------------------

      if (poster) {
        data.append("poster", poster);
      }

      // --------------------------
      // Cast
      // --------------------------

      cast.forEach((member) => {
        data.append(
          "cast",
          JSON.stringify({
            name: member.name,
          })
        );

        if (member.image) {
          data.append("castImages", member.image);
        }
      });

      // --------------------------
      // Crew
      // --------------------------

      crew.forEach((member) => {
        data.append(
          "crew",
          JSON.stringify({
            name: member.name,
          })
        );

        if (member.image) {
          data.append("crewImages", member.image);
        }
      });

      // --------------------------
      // API
      // --------------------------

      if (initialData) {
        const response = await axios.patch(
          `https://moviebookingbackend-icoh.onrender.com/movies/${initialData._id}`,
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(response.data.message);
      } else {
        const response = await axios.post(
          "https://moviebookingbackend-icoh.onrender.com/movies",
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(response.data.message);
      }

      if (refreshMovies) refreshMovies();
      if (onClose) onClose();
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Failed to save movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading sm:text-3xl">
        {initialData ? "Edit Movie" : "Create Movie"}
      </h1>

      {/* Poster */}
      <div className="rounded-2xl border border-border-light bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-heading">Poster</label>

        <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files[0])} className="block w-full text-sm text-text-gray file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/10" />

        {poster ? (
          <img src={URL.createObjectURL(poster)} alt="poster" className="mt-4 h-48 w-full rounded-xl object-cover sm:w-64" />
        ) : initialData?.poster ? (
          <img src={initialData.poster} alt="poster" className="mt-4 h-48 w-full rounded-xl object-cover sm:w-64" />
        ) : null}
      </div>

      {/* Basic Fields */}
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border-light bg-white p-5 sm:grid-cols-2">

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Movie Title</label>
          <input type="text" name="title" placeholder="Movie Title" value={formData.title} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Description</label>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={4} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        {/* Genres */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Genres</label>
          <div className="flex flex-wrap gap-2">
            {GENRE_OPTIONS.map((genre) => {
              const active = formData.genres.includes(genre);
              return (
                <button key={genre} type="button" onClick={() => toggleGenre(genre)} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-white" : "border-border-light bg-white text-text-gray hover:border-primary hover:text-primary"}`}>
                  {genre.replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Languages */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-heading">Languages</label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map((language) => {
              const active = formData.languages.includes(language);
              return (
                <button key={language} type="button" onClick={() => toggleLanguage(language)} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-white" : "border-border-light bg-white text-text-gray hover:border-primary hover:text-primary"}`}>
                  {language}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Duration (mins)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Release Date</label>
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Rating</label>
          <input type="number" name="rating" step="0.1" min="0" max="10" placeholder="9.1" value={formData.rating} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15">
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Cast Section */}
      <div className="rounded-2xl border border-border-light bg-white p-5">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-heading">Cast</h2>
          <button type="button" onClick={addCast} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">+ Add Cast</button>
        </div>

        <div className="mt-4 space-y-4">
          {cast.map((member, index) => (
            <div key={index} className="rounded-xl border border-border-light p-4">

              <input type="text" placeholder="Actor Name" value={member.name} onChange={(e) => updateCastName(index, e.target.value)} className="mb-3 w-full rounded-lg border border-border-light p-2 text-heading outline-none focus:border-primary" />

              <input type="file" accept="image/*" onChange={(e) => updateCastImage(index, e.target.files[0])} className="block w-full text-sm text-text-gray file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/10" />

              {member.image && (
                <img src={URL.createObjectURL(member.image)} alt="" className="mt-3 h-24 w-24 rounded-lg object-cover" />
              )}

              <button type="button" onClick={() => removeCast(index)} className="mt-3 text-sm font-medium text-accent hover:underline">Remove</button>

            </div>
          ))}
        </div>

      </div>

      {/* Crew Section */}
      <div className="rounded-2xl border border-border-light bg-white p-5">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-heading">Crew</h2>
          <button type="button" onClick={addCrew} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">+ Add Crew</button>
        </div>

        <div className="mt-4 space-y-4">
          {crew.map((member, index) => (
            <div key={index} className="rounded-xl border border-border-light p-4">

              <input type="text" placeholder="Crew Name" value={member.name} onChange={(e) => updateCrewName(index, e.target.value)} className="mb-3 w-full rounded-lg border border-border-light p-2 text-heading outline-none focus:border-primary" />

              <input type="file" accept="image/*" onChange={(e) => updateCrewImage(index, e.target.files[0])} className="block w-full text-sm text-text-gray file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/10" />

              {member.image && (
                <img src={URL.createObjectURL(member.image)} alt="" className="mt-3 h-24 w-24 rounded-lg object-cover" />
              )}

              <button type="button" onClick={() => removeCrew(index)} className="mt-3 text-sm font-medium text-accent hover:underline">Remove</button>

            </div>
          ))}
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pb-4">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Saving..." : initialData ? "Update Movie" : "Create Movie"}
        </button>
      </div>

    </form>
  );
};

export default MovieForm;