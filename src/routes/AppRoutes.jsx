import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts" element={<Contact />} />
    </Routes>
  );
};
