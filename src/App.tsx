import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/home";
import Apply from "./pages/apply";
import Customize from "./pages/customize";
import Race from "./pages/race";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/race" element={<Race />} />
      </Routes>
    </>
  );
}
