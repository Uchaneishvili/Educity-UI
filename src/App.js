import { useLocation } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import {
  HeaderBackground,
  HeaderMobileBackground,
} from "./components/UI/icons";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  // write here page names to disappear header bg
  const hideHeaderBgOnRoutes = ["/contacts"];
  const shouldHideHeaderBg = hideHeaderBgOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderBg && (
        <>
          <div className="header-background">
            <HeaderBackground />
          </div>
          <div className="header-mobile-background">
            <HeaderMobileBackground />
          </div>
        </>
      )}

      <div className="innerContainer">
        <Header />
        <div className="container">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
