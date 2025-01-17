import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Contact } from '../pages/Contact/Contact'
import { AboutUs } from '../pages/AboutUs/AboutUs'
import { Courses } from '../pages/Courses/Courses'
import { Login } from '../pages/Login/Login'
import { MainLayout } from '../layouts/MainLayout'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Route>

      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  )
}
