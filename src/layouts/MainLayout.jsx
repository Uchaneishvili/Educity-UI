import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Messenger } from '../components/Messenger/Messenger';
import AdBanner from '../components/AdBanner/AdBanner';
import { getCurrentBanner } from '../services/banner.service';
import { useEffect, useState } from 'react';
export const MainLayout = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    getCurrentBanner().then(res => {
      setBanner(res.data);
    });
  }, []);
  return (
    <div className="outerContainer">
      {banner && <AdBanner imageUrl={banner?.url} />}
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <Messenger />
    </div>
  );
};
