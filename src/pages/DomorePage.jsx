import { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase";

export default function DomorePage({ setPage, setRobotNickname }) {
  const [nickname, setNickname] = useState("");
  const [pairCode, setPairCode] = useState("");

  const pairAndEnter = async () => {
    if (!nickname || !pairCode) return alert("Fill all fields");

    const cleanNick = nickname.trim();
    const cleanCode = pairCode.trim();

    const robotRef = ref(db, `robot/account/${cleanNick}`);
    const robotSnap = await get(robotRef);

    if (robotSnap.exists()) {
      const data = robotSnap.val();

      if (data.pairedWith !== cleanCode) {
        return alert("Pairing code salah untuk robot ini");
      }

      setRobotNickname(cleanNick);
      setPage("talk");
      return;
    }

    await set(robotRef, {
      nickname: cleanNick,
      status: "online",
      pairedWith: cleanCode,
    });

    setRobotNickname(cleanNick);
    setPage("talk");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative">
      <button
        onClick={() => setPage("menu")}
        className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition"
      >
        Back
      </button>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          DOMORE'S
        </h1>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Robot nickname"
          className="w-full mb-4 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <input
          value={pairCode}
          onChange={(e) => setPairCode(e.target.value)}
          placeholder="Pairing code"
          className="w-full mb-6 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <button
          onClick={pairAndEnter}
          className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-[1.02] transition"
        >
          PAIR & ENTER
        </button>
      </div>
    </div>
  );
}