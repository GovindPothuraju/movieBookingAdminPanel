import TheaterRow from "./TheaterRow";

const TheaterTable = ({ theaters, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-orange-50">

          <tr>

            <th className="px-4 py-4 text-left">
              Name
            </th>

            <th className="px-4 py-4 text-left">
              City
            </th>

            <th className="px-4 py-4 text-left">
              Address
            </th>

            <th className="px-4 py-4 text-left">
              Amenities
            </th>

            <th className="px-4 py-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {theaters.map((theater) => (
            <TheaterRow key={theater._id} theater={theater} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TheaterTable;