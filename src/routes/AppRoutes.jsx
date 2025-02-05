import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Contact } from '../pages/Contact/Contact'
import { AboutUs } from '../pages/AboutUs/AboutUs'
import { Courses } from '../pages/Courses/Courses'
import { Auth } from '../pages/Auth/Auth'
import { MainLayout } from '../layouts/MainLayout'
import { CourseDetails } from '../pages/Courses/Details/CourseDetails'
import ForgetPass from '../pages/ForgetPass/ForgetPass'
import UserInfo from '../pages/UserInfo/UserInfo'
import SubscriptionPack from '../pages/SubscriptionPack/SubscriptionPack'
import BecomePartner from '../pages/BecomePartner/BecomePartner'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/me" element={<UserInfo />} />
        <Route path="/subscriptions" element={<SubscriptionPack />} />
        <Route path="/become-partner" element={<BecomePartner />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route path="/auth" element={<Auth />} />
      <Route path="/forget-pass" element={<ForgetPass />} />
    </Routes>
  )
}
