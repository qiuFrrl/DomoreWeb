import MenuCard from "../components/MenuCard";
import DuckAnimation from "../components/DuckAnimation";

export default function MenuPage({ setPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center text-white relative overflow-hidden">

      <h1 className="text-4xl font-bold mb-10 tracking-widest z-10">
        ROBODESK
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4 z-10">
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

      <DuckAnimation />

    </div>
  );
}