import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* TODO: You should change element for /contacts. Instead of <Home />, you should have the name of your new page (contacts) */}
      <Route path="/contacts" element={<Home />} />
    </Routes>
  );
};
