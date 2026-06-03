import StatusBox from "../components/StatusBox";

export default function DomorePage({ setPage }) {
  return (
    <div className="min-h-screen bg-black text-white p-6">

      <button
        className="text-blue-400 mb-6 hover:underline"
        onClick={() => setPage("menu")}
      >
        ← Back to Menu
      </button>

      <h1 className="text-3xl font-bold mb-6">
        SYSTEM STATUS
      </h1>

      <StatusBox />

    </div>
  );
}