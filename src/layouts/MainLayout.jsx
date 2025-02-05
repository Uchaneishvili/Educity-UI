import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Messenger } from '../components/Messenger/Messenger'

export const MainLayout = () => {
  return (
    <div className="outerContainer">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <Messenger />
    </div>
  )
}
