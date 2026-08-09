import ShowRow from "./ShowRow";

const ShowTable = ({ shows, onView, onEdit, onCancel }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-orange-50">

          <tr>

            <th className="px-4 py-4 text-left">Movie</th>
            <th className="px-4 py-4 text-left">Theater</th>
            <th className="px-4 py-4 text-left">Screen</th>
            <th className="px-4 py-4 text-left">Date</th>
            <th className="px-4 py-4 text-left">Time</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-4 py-4 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {shows.map((show) => (
            <ShowRow key={show._id} show={show} onView={onView} onEdit={onEdit} onCancel={onCancel} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ShowTable;
