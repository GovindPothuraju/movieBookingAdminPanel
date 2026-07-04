import MovieRow from "./MovieRow";

const MovieTable = ({ movies, onView, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-orange-50">

          <tr>

            <th className="px-4 py-4 text-left">
              Title
            </th>

            <th className="px-4 py-4 text-left">
              Release
            </th>

            <th className="px-4 py-4 text-left">
              Status
            </th>

            <th className="px-4 py-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {movies.map((movie) => (
            <MovieRow key={movie._id} movie={movie} onView={onView} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default MovieTable;