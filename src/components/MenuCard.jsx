export default function MenuCard({ title, subtitle, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-64 p-6 rounded-2xl text-left transition transform hover:scale-105
      bg-${color}-600 hover:bg-${color}-500 shadow-xl`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm opacity-80 mt-2">{subtitle}</p>
    </button>
  );
}