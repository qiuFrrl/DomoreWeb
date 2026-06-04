import { useState } from "react";

import MenuPage from "./pages/MenuPage";
import WifiPage from "./pages/WifiPage";
import DomorePage from "./pages/DomorePage";
import TalkPage from "./pages/TalkPage";

export default function App() {
  const [page, setPage] = useState("menu");

  const [robotNickname, setRobotNickname] = useState("");

  return (
    <>
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
    </>
  );
}