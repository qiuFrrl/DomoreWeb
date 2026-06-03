import WifiForm from "../components/WifiForm";

export default function WifiPage({ setPage }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => setPage("menu")}
        className="absolute top-5 left-5 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        WiFi Configuration
      </h1>

      {/* FORM WRAPPER */}
      <WifiForm />

    </div>
  );
}