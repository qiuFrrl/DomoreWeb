import { ref, set, get } from "firebase/database";
import { db } from "../firebase";
import { useState } from "react";
import WifiBmo from "./WifiBmo";

export default function WifiForm() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const send = async () => {
    if (!ssid || !password) return alert("Isi WiFi dulu yea ok!");

    try {
      const snap = await get(ref(db, `robot/wifi`));
      if (snap.exists()) {
        const allWifi = Object.values(snap.val());
        const duplikat = allWifi.find(
          (w) => w.ssid === ssid && w.password === password
        );
        if (duplikat) return alert("WiFi ini sudah tersimpan");
      }

      await set(ref(db, `robot/wifi/${ssid}`), {
        ssid,
        password,
        updatedAt: Date.now(),
      });

      alert("WiFi berhasil disimpan");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="console-panel rise-in-delay w-full max-w-md rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
      <h2 className="mb-6 text-center text-xl font-black">Connect Robot WiFi</h2>

      <div className="mb-4">
        <div className="relative flex items-center justify-between">
          <label className="text-sm font-medium text-white/65">WiFi Name</label>
          <div className="absolute bottom-0 right-2 pointer-events-none translate-y-[6px]">
            <WifiBmo />
          </div>
        </div>
        <input
          className="mt-2 w-full rounded-md border border-white/10 bg-black/45 p-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25"
          placeholder="Enter SSID"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-white/65">Password</label>
        <input
          type="password"
          className="mt-2 w-full rounded-md border border-white/10 bg-black/45 p-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={send}
        className="w-full rounded-md bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 py-3 font-black text-black shadow-[0_14px_34px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/50"
      >
        SEND TO DOMORE
      </button>
    </div>
  );
}
