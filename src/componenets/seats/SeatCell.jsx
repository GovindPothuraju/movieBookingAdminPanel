const CATEGORY_STYLES = {
  REGULAR: "bg-border-light text-text-gray",
  VIP: "bg-blue-400 text-white",
  PREMIUM: "bg-purple-400 text-white",
  RECLINER: "bg-primary text-white",
};

const SeatCell = ({ label, category }) => {
  return (
    <div
      title={`${label} · ${category}`}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold transition hover:scale-110 ${CATEGORY_STYLES[category] || "bg-border-light text-text-gray"}`}
    >
      {label.replace(/[A-Z]/, "")}
    </div>
  );
};

export default SeatCell;