import { useEffect, useState } from "react";

import MenuPage from "./pages/MenuPage";
import WifiPage from "./pages/WifiPage";
import DomorePage from "./pages/DomorePage";
import TalkPage from "./pages/TalkPage";

export default function App() {
  const [page, setPage] = useState("menu");

  const [robotNickname, setRobotNickname] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#080907] text-white selection:bg-emerald-300/30 selection:text-white">
      {showIntro && (
        <div className="opening-overlay" aria-hidden="true">
          <div className="opening-grid" />
          <div className="opening-scan" />

          <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
            <div className="opening-mark">D</div>
            <div>
              <p className="text-xs font-medium uppercase text-emerald-100/60">
                Domore console
              </p>
              <h1 className="mt-2 text-4xl font-black leading-none text-white sm:text-6xl">
                ROBODESK
              </h1>
            </div>
            <div className="opening-progress">
              <span />
            </div>
          </div>
        </div>
      )}

      <main key={page} className="page-enter">
        {page === "menu" && (
          <MenuPage setPage={setPage} />
        )}

        {page === "wifi" && (
          <WifiPage setPage={setPage} />
        )}

        {page === "domore" && (
          <DomorePage
            setPage={setPage}
            setRobotNickname={setRobotNickname}
          />
        )}

        {page === "talk" && (
          <TalkPage
            setPage={setPage}
            robotNickname={robotNickname}
          />
        )}
      </main>
    </div>
  );
}
