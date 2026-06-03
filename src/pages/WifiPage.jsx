import WifiForm from "../components/WifiForm";

export default function WifiPage({ setPage }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      
      <button
        className="text-blue-400 mb-6 hover:underline"
        onClick={() => setPage("menu")}
      >
        ← Back to Menu
      </button>

      <h1 className="text-3xl font-bold mb-6">
        WiFi Configuration
      </h1>

      <WifiForm />

    </div>
  );
}