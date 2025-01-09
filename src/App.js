import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import {
  HeaderBackground,
  HeaderMobileBackground,
} from "./components/UI/icons";
import { AppRoutes } from "./routes/AppRoutes";
function App() {
  return (
    <>
      <div className="header-background">
        <HeaderBackground />
      </div>

      <div className="header-mobile-background">
        <HeaderMobileBackground />
      </div>
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
