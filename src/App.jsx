import { useState } from "react";
import MenuPage from "./pages/MenuPage";
import WifiPage from "./pages/WifiPage";
import DomorePage from "./pages/DomorePage";

export default function App() {
  const [page, setPage] = useState("menu");

  if (page === "menu") return <MenuPage setPage={setPage} />;
  if (page === "wifi") return <WifiPage setPage={setPage} />;
  if (page === "domore") return <DomorePage setPage={setPage} />;

  return <div>Loading...</div>;
}