import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="outerContainer">
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
