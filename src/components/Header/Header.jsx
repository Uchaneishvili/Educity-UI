import { useState } from 'react'
import styles from './Header.module.css'
import { Button } from '../UI/Button/Button'
import { BurgerMenuIcon, UserIcon } from '../UI/icons'
import { useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import AuthService from '../../services/auth.service'

const authService = new AuthService()

export function Header() {
  const [sideBarActive, setSideBarActive] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const isAuthenticated = () => {
    return !!authService.getToken()
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/auth')
  }

  const renderAuthButtons = () => {
    if (isAuthenticated()) {
      return (
        <div className={styles.userMenuContainer}>
          <div className={styles.userIcon} onClick={() => setShowUserMenu(!showUserMenu)}>
            <UserIcon />
          </div>
        </div>
      )
    } else {
      return (
        <div className={styles.authButtons}>
          <Button type="secondary" onClick={() => navigate('/register')}>
            რეგისტრაცია
          </Button>
          <Button type="primary" onClick={() => navigate('/login')}>
            ავტორიზაცია
          </Button>
        </div>
      )
    }
  }

  return (
    <header className={styles.header}>
      <SideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
        isAuthenticated={isAuthenticated()}
      />
      <div className={styles.container}>
        <div>
          <div className={styles.logo} onClick={() => navigate('/')}>
            Educity
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li onClick={() => navigate('/')}>მთავარი</li>
            <li onClick={() => navigate('/courses')}>კურსები</li>
            <li onClick={() => navigate('/aboutus')}>ჩვენს შესახებ</li>
            <li onClick={() => navigate('/contacts')}>კონტაქტი</li>
            <li onClick={() => navigate('/become-partner')}>გახდი პარტნიორი</li>
          </ul>
          <div className={styles.burgerMenu} onClick={() => setSideBarActive(true)}>
            <BurgerMenuIcon />
          </div>
        </nav>

        <div className={styles.authButtons}>{renderAuthButtons()}</div>
      </div>
    </header>
  )
}
