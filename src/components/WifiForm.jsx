import { useState } from "react";

export default function WifiForm() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const send = () => {
    alert(`Sending to ROBOT:\n${ssid}`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl w-80 shadow-lg">

      <label className="text-sm opacity-70">WiFi Name</label>
      <input
        className="w-full p-2 mt-1 mb-4 text-black rounded"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
      />

      <label className="text-sm opacity-70">Password</label>
      <input
        className="w-full p-2 mt-1 mb-4 text-black rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={send}
        className="w-full bg-green-500 py-2 rounded hover:bg-green-400"
      >
        SEND TO ROBOT
      </button>

    </div>
  );
}