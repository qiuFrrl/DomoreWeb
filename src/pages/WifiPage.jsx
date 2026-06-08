import WifiForm from "../components/WifiForm";

export default function WifiPage({ setPage }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080907] px-4 text-white">
      <div className="animated-grid absolute inset-0 opacity-70" />
      <div className="signal-sweep" />

      <button
        onClick={() => setPage("menu")}
        className="absolute left-5 top-5 z-20 rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/72 backdrop-blur transition hover:border-lime-200/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/40"
      >
        Back
      </button>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center py-20">
        <div className="rise-in mb-7 text-center">
          <p className="mb-2 text-xs font-semibold uppercase text-emerald-100/55">
            ROBODESK LINK
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            WiFi Configuration
          </h1>
        </div>

        <WifiForm />
      </div>

    </div>
  );
}
