import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = ({ children }) => {
  return (
    <div className="outerContainer">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
