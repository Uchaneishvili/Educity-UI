import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Contact } from '../pages/Contact/Contact'
import { AboutUs } from '../pages/AboutUs/AboutUs'
import { Courses } from '../pages/Courses/Courses'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  )
}
