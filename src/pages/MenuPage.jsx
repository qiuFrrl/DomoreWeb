import MenuCard from "../components/MenuCard";

export default function MenuPage({ setPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center text-white">
      
      <h1 className="text-4xl font-bold mb-10 tracking-widest">
        ROBODESK
      </h1>

      <div className="flex gap-6">
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
  );
}