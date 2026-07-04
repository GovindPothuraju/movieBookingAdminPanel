import DeletedTheaterRow from "./DeletedTheaterRow";

const DeletedTheaterTable = ({ theaters, onReactivate }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-red-50">

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
              Contact Email
            </th>

            <th className="px-4 py-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {theaters.map((theater) => (
            <DeletedTheaterRow key={theater._id} theater={theater} onReactivate={onReactivate} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default DeletedTheaterTable;