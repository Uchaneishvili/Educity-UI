import "./App.css";
import { Header } from "./components/Header/Header";
import {
  HeaderBackground,
  HeaderMobileBackground,
} from "./components/UI/icons";
import { Home } from "./pages/Home/Home";
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
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
