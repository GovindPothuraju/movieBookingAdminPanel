import ScreenRow from "./ScreenRow";

const ScreenTable = ({ screens, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-orange-50">

          <tr>

            <th className="px-4 py-4 text-left">
              Screen
            </th>

            <th className="px-4 py-4 text-left">
              Seats / Layout
            </th>

            <th className="px-4 py-4 text-left">
              Screen Type
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

          {screens.map((screen) => (
            <ScreenRow key={screen._id} screen={screen} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ScreenTable;