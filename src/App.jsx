import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import MenuPage from "./pages/MenuPage";
import WifiPage from "./pages/WifiPage";
import DomorePage from "./pages/DomorePage";

export default function App() {
  const [page, setPage] = useState("menu");

  return (
    <>
      {page === "menu" && <MenuPage setPage={setPage} />}
      {page === "wifi" && <WifiPage setPage={setPage} />}
      {page === "domore" && <DomorePage setPage={setPage} />}
      {page !== "menu" && page !== "wifi" && page !== "domore" && <div>Loading...</div>}
      <Analytics />
    </>
  );
}