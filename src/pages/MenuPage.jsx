import MenuCard from "../components/MenuCard";
import DuckAnimation from "../components/DuckAnimation";

export default function MenuPage({ setPage }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080907] text-white">
      <div className="animated-grid absolute inset-0 opacity-80" />
      <div className="signal-sweep" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-400/10 to-transparent" />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-5 pb-28 pt-16 sm:pb-20">
        <div className="rise-in flex flex-col items-center text-center">
          <div className="soft-float mb-6 grid h-14 w-14 place-items-center rounded-lg border border-lime-200/30 bg-white/[0.06] text-2xl font-black text-lime-200 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            D
          </div>
          <p className="mb-3 text-xs font-semibold uppercase text-lime-100/55">
            Domore robot console
          </p>
          <h1 className="text-5xl font-black leading-none text-white sm:text-7xl">
            ROBODESK
          </h1>
        </div>

        <div className="rise-in-delay mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <MenuCard
            title="INPUT WIFI"
            subtitle="Configure robot connection"
            color="green"
            onClick={() => setPage("wifi")}
          />

          <MenuCard
            title="DOMORE'S"
            subtitle="System dashboard"
            color="blue"
            onClick={() => setPage("domore")}
          />
        </div>
      </div>

      <DuckAnimation />
    </div>
  );
}
