import AllScreensRow from "./AllScreensRow";

const AllScreensTable = ({ screens }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white">

      <table className="min-w-full">

        <thead className="bg-orange-50">

          <tr>

            <th className="px-4 py-4 text-left">
              Screen
            </th>

            <th className="px-4 py-4 text-left">
              Theater
            </th>

            <th className="px-4 py-4 text-left">
              Format
            </th>

            <th className="px-4 py-4 text-left">
              Layout
            </th>

            <th className="px-4 py-4 text-left">
              Capacity
            </th>

            <th className="px-4 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {screens.map((screen) => (
            <AllScreensRow key={screen._id} screen={screen} />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AllScreensTable;