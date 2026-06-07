export default function StatusBox() {
  return (
    <div className="grid grid-cols-1 gap-4 w-80">

      <div className="bg-gray-800 p-4 rounded-xl">
        Robot: OFFLINE
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        Talk: READY
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        Mode: IDLE
      </div>

    </div>
  );
}