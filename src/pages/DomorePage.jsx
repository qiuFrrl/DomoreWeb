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

    const snap = await get(ref(db, `robot/account`));
    if (snap.exists()) {
      const allAccounts = Object.values(snap.val());

      const duplikat = allAccounts.find(
        (a) => a.nickname === cleanNick && a.pairedWith === cleanCode
      );
      if (duplikat) {
        setRobotNickname(cleanNick);
        setPage("talk");
        return;
      }

      const nickTaken = allAccounts.find(
        (a) => a.nickname === cleanNick && a.pairedWith !== cleanCode
      );
      if (nickTaken) return alert("Nickname sudah dipakai dengan pairing code berbeda");

      const codeTaken = allAccounts.find(
        (a) => a.pairedWith === cleanCode && a.nickname !== cleanNick
      );
      if (codeTaken) return alert("Pairing code sudah dipakai oleh robot lain");
    }

    await set(ref(db, `robot/account/${cleanNick}`), {
      nickname: cleanNick,
      status: "offline",
      pairedWith: cleanCode,
      updatedAt: Date.now(),
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
        
      <div className="mb-10 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            DOMORE'S
          </h1>
          <svg
            className="absolute"
            style={{ left: "38%", transform: "translateX(-50%)", top: "100%" }}
            width="40"
            height="20"
            viewBox="0 0 40 20"
          >
          <path d="M5 5 Q20 18 35 5" stroke="url(#mouth)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <defs>
          <linearGradient id="mouth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
</div>

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