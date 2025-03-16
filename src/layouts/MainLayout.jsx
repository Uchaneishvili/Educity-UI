import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Messenger } from '../components/Messenger/Messenger';
import AdBanner from '../components/AdBanner/AdBanner';
export const MainLayout = () => {
  return (
    <div className="outerContainer">
      <AdBanner imageUrl="https://picsum.photos/1920/50" />
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <Messenger />
    </div>
  );
};
