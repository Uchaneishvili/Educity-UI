import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Button } from '../UI/Button/Button';
import { BurgerMenuIcon, UserIcon } from '../UI/icons';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { useAuth } from '../../context/AuthContext';
import Dropdown from '../UI/Dropdown/Dropdown';
import { DropdownCourseIcon } from '../UI/icons';
import React from 'react';
import { ProgressBar } from '../UI/ProgressBar/ProgressBar';
import IconUser from '../UI/IconUser';

export function Header() {
  const courses = [
    {
      id: 1,
      name: '2025 UI/UX design with figma',
    },
    {
      id: 2,
      name: '2025 UI/UX design with figma',
    },
    {
      id: 3,
      name: '2025 UI/UX design with figma',
    },
    {
      id: 4,
      name: '2025 UI/UX design with figma',
    },
  ];

  const [sideBarActive, setSideBarActive] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const refreshDropdown = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    refreshDropdown();
  }, [navigate]);

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className={styles.userMenuContainer}>
          <Button
            type="secondary"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            ჩემი კურსები
          </Button>

          <div
            className={styles.userLoggedIcon}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <UserIcon />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.userIcon} onClick={() => navigate('/login')}>
            <IconUser />
          </div>

          <div className={styles.authButtons}>
            <Button type="secondary" onClick={() => navigate('/register')}>
              რეგისტრაცია
            </Button>
            <Button type="primary" onClick={() => navigate('/login')}>
              ავტორიზაცია
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <header className={styles.header}>
      <SideBar
        type={'burger'}
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
        shownLocation={'translateX(0)'}
        hiddenLocation={'translateX(-100%)'}
      />
      <SideBar
        type={'user'}
        sideBarActive={showUserMenu}
        setSideBarActive={setShowUserMenu}
        shownLocation={'translateX(0)'}
        hiddenLocation={'translateX(100%)'}
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
            <li onClick={() => navigate('/subscriptions')}>პაკეტები</li>
          </ul>
          <div
            className={styles.burgerMenu}
            onClick={() => setSideBarActive(true)}
          >
            <BurgerMenuIcon />
          </div>
        </nav>

        {renderAuthButtons()}
        <Dropdown isOpen={isDropdownOpen} width="430px">
          <div className={styles.dropdownHeaderContainer}>
            <div className={styles.dropdownHeaderTitle}>ჩემი კურსები</div>
            <div
              className={styles.dropdownHeaderBtn}
              onClick={() => navigate('/me')}
            >
              ყველას ნახვა
            </div>
          </div>

          <div className={styles.dropdownCoursesContainer}>
            {courses.map(course => (
              <div key={course.id} className={styles.dropdownCourseContainer}>
                <div className={styles.dropdownCourseIcon}>
                  <DropdownCourseIcon />
                </div>
                <div className={styles.dropdownCourseInfo}>
                  <div className={styles.dropdownCourseName}>{course.name}</div>
                  <div className={styles.dropdownCourseProgress}>
                    <div className={styles.dropdownCourseProgressTitle}>
                      2/5 COMPLETED
                    </div>
                    <ProgressBar percentage={40} totalBars={5} />
                  </div>
                  <div className={styles.dropdownCourseTime}>5 mins ago</div>
                </div>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
