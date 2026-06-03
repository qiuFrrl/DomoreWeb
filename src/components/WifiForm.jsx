import { useState } from "react";

export default function WifiForm() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const send = () => {
    if (!ssid || !password) {
      alert("Isi WiFi dulu!");
      return;
    }

    alert(`Sending to ROBOT:\nSSID: ${ssid}\nPASSWORD: ${password}`);
  };

  return (
    <div className="w-full max-w-sm bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700">

      {/* HEADER */}
      <h2 className="text-xl font-bold text-center mb-6">
        Connect Robot WiFi
      </h2>

      {/* SSID */}
      <div className="mb-4">
        <label className="text-sm text-gray-300">WiFi Name</label>
        <input
          className="w-full mt-1 p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter SSID"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="mb-6">
        <label className="text-sm text-gray-300">Password</label>
        <input
          type="password"
          className="w-full mt-1 p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={send}
        className="w-full bg-green-500 hover:bg-green-400 transition py-3 rounded-lg font-semibold"
      >
        SEND TO ROBOT
      </button>

    </div>
  );
}