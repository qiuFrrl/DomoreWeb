import { useState } from "react";

import { ref, set } from "firebase/database";
import { db } from "../firebase";

export default function DomorePage({ setPage }) {
  const [nickname, setNickname] = useState("");

  const saveNickname = async () => {
    if (!nickname) {
      alert("Please enter robot nickname");
      return;
    }

    try {
      await set(ref(db, `robots/${nickname}`), {
        nickname,
        status: "online",
      });

      alert("Robot nickname saved!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-[-150px] left-[-150px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* BACK BUTTON */}
      <button
        onClick={() => setPage("menu")}
        className="absolute top-5 left-5 text-sm text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-black tracking-wide bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            DOMORE'S
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Create your robot identity
          </p>

        </div>

        {/* INPUT SECTION */}
        <div className="mb-6">

          <label className="text-sm text-gray-300">
            Robot Nickname
          </label>

          <input
            type="text"
            placeholder="example: domore_nara"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="
              w-full mt-3
              px-4 py-4
              rounded-2xl
              bg-black/40
              border border-white/10
              text-white
              placeholder-gray-500
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/40
              transition
            "
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={saveNickname}
          className="
            w-full
            py-4
            rounded-2xl
            font-bold
            text-lg
            bg-gradient-to-r
            from-cyan-500
            to-purple-500
            hover:scale-[1.02]
            active:scale-[0.98]
            transition
            shadow-lg
            shadow-cyan-500/20
          "
        >
          SAVE ROBOT
        </button>

        {/* INFO */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Your robot nickname will be stored in realtime cloud database.
        </div>

      </div>
    </div>
  );
}