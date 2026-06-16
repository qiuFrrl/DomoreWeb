const colorClasses = {
  green: "border-emerald-300/25 bg-emerald-400/10 hover:border-emerald-200/60 focus-visible:ring-emerald-200/40",
  blue: "border-amber-300/25 bg-amber-400/10 hover:border-amber-200/60 focus-visible:ring-amber-200/40",
  red: "border-red-300/25 bg-red-400/10 hover:border-red-200/60 focus-visible:ring-red-200/40",
  yellow: "border-lime-300/25 bg-lime-400/10 hover:border-lime-200/60 focus-visible:ring-lime-200/40",
};

const accentClasses = {
  green: "bg-emerald-300",
  blue: "bg-amber-300",
  red: "bg-red-300",
  yellow: "bg-lime-300",
};

export default function MenuCard({ title, subtitle, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        signal-card group relative min-h-[150px] w-full overflow-hidden rounded-lg
        border p-5 text-left text-white shadow-[0_24px_70px_rgba(0,0,0,0.38)]
        transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2
        ${colorClasses[color] ?? colorClasses.green}
      `}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${accentClasses[color] ?? accentClasses.green}`} />
      <span className="absolute inset-x-5 top-0 h-px bg-white/20" />
      <span className="relative z-10 flex min-h-[110px] flex-col justify-between">
        <span className="text-xs font-semibold uppercase text-white/45">
          ROBODESK
        </span>
        <span>
          <h2 className="text-2xl font-black leading-tight">{title}</h2>
          <p className="mt-2 text-sm text-white/68">{subtitle}</p>
        </span>
      </span>
    </button>
  );
}
