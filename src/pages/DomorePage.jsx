import { useState } from "react";

import { ref, set, get } from "firebase/database";
import { db } from "../firebase";

export default function DomorePage({
  setPage,
  setRobotNickname,
}) {
  const [nickname, setNickname] = useState("");

  const saveNickname = async () => {
    if (!nickname.trim()) {
      alert("Enter nickname first");
      return;
    }

    try {
      await set(ref(db, `robots/${nickname}`), {
        nickname,
        status: "online",
      });

      alert("Robot nickname created!");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    if (!nickname.trim()) {
      alert("Enter nickname first");
      return;
    }

    try {
      const snapshot = await get(
        ref(db, `robots/${nickname}`)
      );

      if (snapshot.exists()) {
        setRobotNickname(nickname);

        setPage("talk");
      } else {
        alert("Nickname not found");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="
      min-h-screen
      bg-black
      text-white
      relative
      overflow-hidden
      flex
      items-center
      justify-center
      px-4
      py-10
    ">

      <div className="
        absolute
        w-[400px]
        h-[400px]
        bg-cyan-500/20
        blur-3xl
        rounded-full
        top-[-120px]
        left-[-120px]
      " />

      <div className="
        absolute
        w-[350px]
        h-[350px]
        bg-purple-500/20
        blur-3xl
        rounded-full
        bottom-[-100px]
        right-[-100px]
      " />

      <div className="
        relative
        z-10
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/10
        rounded-[32px]
        p-6
        sm:p-8
        shadow-2xl
      ">

      <button
        onClick={() => setPage("menu")}
        className="
        absolute
        top-5
        left-5
        px-4
        py-2
        rounded-full
        bg-white/10
        border border-white/10
        text-sm
        text-gray-300
        hover:bg-white/20
        hover:text-white
        transition
        z-20
      ">
        Back
      </button>

        <div className="mb-10 text-center">

          <h1 className="
            text-4xl
            sm:text-5xl
            font-black
            bg-gradient-to-r
            from-cyan-400
            to-purple-500
            bg-clip-text
            text-transparent
          ">
            DOMORE'S
          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Robot identity system
          </p>

        </div>

        <div>

          <label className="text-sm text-gray-400">
            Robot Nickname
          </label>

          <input
            type="text"
            placeholder="example: domore_nara"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="
              w-full
              mt-3
              px-5
              py-4
              rounded-2xl
              bg-black/40
              border
              border-white/10
              outline-none
              text-white
              placeholder-gray-500
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/40
              transition
            "
          />

        </div>

        <div className="mt-8 flex flex-col gap-4">

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
              hover:scale-[1.01]
              active:scale-[0.98]
              transition
            "
          >
            SAVE ROBOT
          </button>

          <button
            onClick={login}
            className="
              w-full
              py-4
              rounded-2xl
              font-bold
              text-lg
              border
              border-cyan-400/40
              bg-white/5
              hover:bg-cyan-400/10
              transition
            "
          >
            LOGIN
          </button>

        </div>

      </div>
    </div>
  );
}