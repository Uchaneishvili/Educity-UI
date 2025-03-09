import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Button } from '../UI/Button/Button';
import { BurgerMenuIcon } from '../UI/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { useAuth } from '../../context/AuthContext';
import Dropdown from '../UI/Dropdown/Dropdown';
import { DropdownCourseIcon } from '../UI/icons';
import React from 'react';
import { ProgressBar } from '../UI/ProgressBar/ProgressBar';
import IconUser from '../UI/IconUser';
import { getMyCourses } from '../../services/courses.service';
import { Loader } from '../UI/Loader/Loader';

export function Header() {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const getCourses = async () => {
    try {
      setIsLoading(true);
      const { data } = await getMyCourses({ type: 'video-lectures' });

      setCourses(data.data.courses);
    } catch (err) {
      console.log('Error while loading courses', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      getCourses();
    }
  }, [isDropdownOpen]);

  const getActiveButtons = value => {
    return location.pathname === value ? styles.navListLiActive : '';
  };

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

          <div className={styles.userDropdownWrapper}>
            <div
              className={styles.userLoggedIcon}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img src={user?.image || '/assets/userAvatar.png'} alt="user" />
            </div>

            <Dropdown
              isOpen={isDropdownOpen}
              width="430px"
              onClose={() => setIsDropdownOpen(false)}
            >
              <div className={styles.dropdownHeaderContainer}>
                <div className={styles.dropdownHeaderTitle}>ჩემი კურსები</div>
                <div
                  className={styles.dropdownHeaderBtn}
                  onClick={() => navigate('/me/courses')}
                >
                  ყველას ნახვა
                </div>
              </div>

              <div className={styles.dropdownCoursesContainer}>
                {isLoading ? (
                  <Loader />
                ) : (
                  courses.map(course => (
                    <div
                      key={course.id}
                      className={styles.dropdownCourseContainer}
                      onClick={() => navigate(`/courses/${course._id}/videos`)}
                    >
                      <div className={styles.dropdownCourseIcon}>
                        <DropdownCourseIcon />
                      </div>
                      <div className={styles.dropdownCourseInfo}>
                        <div className={styles.dropdownCourseName}>
                          {course.title}
                        </div>
                        <div className={styles.dropdownCourseProgress}>
                          <div className={styles.dropdownCourseProgressTitle}>
                            2/5 COMPLETED
                          </div>
                          <ProgressBar percentage={40} totalBars={5} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Dropdown>

            <Dropdown
              isOpen={showUserMenu}
              width="200px"
              className={styles.desktopOnly}
              onClose={() => setShowUserMenu(false)}
            >
              <div className={styles.userMenuDropdown}>
                <div
                  className={styles.userMenuDropdownItem}
                  onClick={() => navigate('/me')}
                >
                  პროფილი
                </div>
                <div
                  className={styles.userMenuDropdownItem}
                  onClick={() => navigate('/me/courses')}
                >
                  კურსები
                </div>
                <div
                  className={styles.userMenuDropdownItem}
                  onClick={() => navigate('/me/wishlist')}
                >
                  ფავორიტები
                </div>
                <div
                  className={styles.userMenuDropdownItem}
                  onClick={() => navigate('/me/purchase-history')}
                >
                  გადახდების ისტორია
                </div>
                <div
                  className={styles.userMenuDropdownItem}
                  onClick={() => navigate('/me/settings')}
                >
                  პარამეტრები
                </div>
                <div
                  className={styles.userMenuDropdownItem}
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  გასვლა
                </div>
              </div>
            </Dropdown>
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
            <li onClick={() => navigate('/')} className={getActiveButtons('/')}>
              მთავარი
            </li>
            <li
              onClick={() => navigate('/courses')}
              className={getActiveButtons('/courses')}
            >
              კურსები
            </li>
            <li
              onClick={() => navigate('/aboutus')}
              className={getActiveButtons('/aboutus')}
            >
              ჩვენს შესახებ
            </li>
            <li
              onClick={() => navigate('/contacts')}
              className={getActiveButtons('/contacts')}
            >
              კონტაქტი
            </li>
            <li
              onClick={() => navigate('/become-partner')}
              className={getActiveButtons('/become-partner')}
            >
              გახდი პარტნიორი
            </li>
            <li
              onClick={() => navigate('/subscriptions')}
              className={getActiveButtons('/subscriptions')}
            >
              პაკეტები
            </li>
          </ul>
          <div
            className={styles.burgerMenu}
            onClick={() => setSideBarActive(true)}
          >
            <BurgerMenuIcon />
          </div>
        </nav>

        {renderAuthButtons()}
      </div>
    </header>
  );
}
