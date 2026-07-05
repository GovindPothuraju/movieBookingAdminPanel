const LEGEND = [
  { label: "Regular", className: "bg-border-light" },
  { label: "VIP", className: "bg-blue-400" },
  { label: "Premium", className: "bg-purple-400" },
  { label: "Recliner", className: "bg-primary" },
];

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {LEGEND.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`h-4 w-4 rounded ${item.className}`} />
          <span className="text-sm text-text-gray">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;