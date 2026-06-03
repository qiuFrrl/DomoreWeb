const colorClasses = {
  green: "bg-green-600 hover:bg-green-500",
  blue: "bg-blue-600 hover:bg-blue-500",
  red: "bg-red-600 hover:bg-red-500",
  yellow: "bg-yellow-600 hover:bg-yellow-500",
};

export default function MenuCard({ title, subtitle, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full sm:w-64 p-6 rounded-2xl text-left
        transition transform hover:scale-105
        shadow-xl text-white
        ${colorClasses[color] ?? colorClasses.green}
      `}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm opacity-80 mt-2">{subtitle}</p>
    </button>
  );
}