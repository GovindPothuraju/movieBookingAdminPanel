import { useState, useEffect } from "react";

const CATEGORY_OPTIONS = ["REGULAR", "VIP", "PREMIUM", "RECLINER"];

const SeatLayoutForm = ({ onClose, onSubmit, mode = "create" }) => {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(false);

  const rowsCount = Math.min(Math.max(parseInt(rows) || 0, 0), 26);
  const rowLetters = Array.from({ length: rowsCount }, (_, i) => String.fromCharCode(65 + i));

  useEffect(() => {
    setLayout((prev) => {
      const next = {};
      rowLetters.forEach((letter) => {
        next[letter] = prev[letter] || "REGULAR";
      });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsCount]);

  const handleCategoryChange = (letter, value) => {
    setLayout((prev) => ({ ...prev, [letter]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedRows = parseInt(rows);
    const parsedColumns = parseInt(columns);

    if (!parsedRows || !parsedColumns || parsedRows < 1 || parsedColumns < 1 || parsedRows > 26 || parsedRows * parsedColumns > 500) {
      alert("Please enter valid rows (1–26) and columns (rows × columns ≤ 500)");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ rows: parsedRows, columns: parsedColumns, layout });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:px-6">

      <h1 className="text-2xl font-bold text-heading">
        {mode === "edit" ? "Edit Seat Layout" : "Create Seat Layout"}
      </h1>

      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border-light bg-white p-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Rows</label>
          <input type="number" min="1" max="26" placeholder="e.g. 10" value={rows} onChange={(e) => setRows(e.target.value)} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-heading">Columns</label>
          <input type="number" min="1" placeholder="e.g. 15" value={columns} onChange={(e) => setColumns(e.target.value)} className="w-full rounded-xl border border-border-light px-4 py-2.5 text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15" />
        </div>

      </div>

      {rowLetters.length > 0 && (
        <div className="rounded-2xl border border-border-light bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-gray">Row Configuration</h2>

          <div className="space-y-3">
            {rowLetters.map((letter) => (
              <div key={letter} className="flex items-center justify-between gap-4 rounded-xl border border-border-light px-4 py-3">
                <span className="text-lg font-bold text-heading">{letter}</span>

                <select value={layout[letter] || "REGULAR"} onChange={(e) => handleCategoryChange(letter, e.target.value)} className="rounded-lg border border-border-light px-3 py-2 text-sm text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pb-2">
        <button type="button" onClick={onClose} className="rounded-xl border border-border-light px-6 py-3 font-semibold text-text-gray transition hover:bg-primary-light">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Saving..." : mode === "edit" ? "Update Layout" : "Create Layout"}
        </button>
      </div>

    </form>
  );
};

export default SeatLayoutForm;