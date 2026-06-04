import { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase";

export default function DomorePage({ setPage, setRobotNickname }) {
  const [nickname, setNickname] = useState("");
  const [pairCode, setPairCode] = useState("");

  const saveRobot = async () => {
    if (!nickname) return alert("Enter nickname first");

    await set(ref(db, `robots/${nickname}`), {
      nickname,
      status: "online",
    });

    alert("Robot saved");
  };

  const loginRobot = async () => {
    if (!nickname) return alert("Enter nickname first");

    const snap = await get(ref(db, `robots/${nickname}`));

    if (!snap.exists()) return alert("Robot not found");

    setRobotNickname(nickname);
    setPage("talk");
  };

  const pairRobot = async () => {
    if (!nickname || !pairCode) return alert("Fill all fields");

    const snap = await get(ref(db, `pairing/${pairCode}`));

    if (!snap.exists()) return alert("Invalid code");

    await set(ref(db, `robots/${nickname}`), {
      nickname,
      status: "online",
      pairedWith: pairCode,
    });

    setRobotNickname(nickname);
    setPage("talk");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          DOMORE'S
        </h1>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Robot nickname"
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none text-white mb-4"
        />

        <input
          value={pairCode}
          onChange={(e) => setPairCode(e.target.value)}
          placeholder="Your code"
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none text-white mb-6"
        />

        <button
          onClick={saveRobot}
          className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 mb-3"
        >
          SAVE ROBOT
        </button>

        <button
          onClick={loginRobot}
          className="w-full py-4 rounded-2xl font-bold border border-cyan-400/40 bg-white/5 mb-3"
        >
          LOGIN
        </button>

        <button
          onClick={pairRobot}
          className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500"
        >
          PAIR & ENTER
        </button>

      </div>
    </div>
  );
}