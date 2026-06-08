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
    <div className="relative min-h-screen overflow-hidden bg-[#080907] px-4 text-white">
      <div className="animated-grid absolute inset-0 opacity-70" />
      <div className="signal-sweep" />

      <button
        onClick={() => setPage("menu")}
        className="absolute left-5 top-5 z-20 rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/72 backdrop-blur transition hover:border-lime-200/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/40"
      >
        Back
      </button>

      <div className="relative z-10 flex min-h-screen items-center justify-center py-20">
        <div className="console-panel rise-in w-full max-w-md rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-10 text-center">
            <div className="relative inline-block">
              <p className="mb-2 text-xs font-semibold uppercase text-emerald-100/55">
                Pairing room
              </p>
              <h1 className="bg-gradient-to-r from-emerald-300 via-lime-200 to-amber-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
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
                    <stop offset="0%" stopColor="#6ee7b7"/>
                    <stop offset="100%" stopColor="#fbbf24"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Robot nickname"
            className="mb-4 w-full rounded-md border border-white/10 bg-black/45 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25"
          />

          <input
            value={pairCode}
            onChange={(e) => setPairCode(e.target.value)}
            placeholder="Pairing code"
            className="mb-6 w-full rounded-md border border-white/10 bg-black/45 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25"
          />

          <button
            onClick={pairAndEnter}
            className="w-full rounded-md bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 py-4 text-lg font-black text-black shadow-[0_14px_34px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/50"
          >
            PAIR & ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
