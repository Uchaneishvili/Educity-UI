import React, { useEffect } from 'react';
import styles from './SideBar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
import { CloseIcon, UserIcon } from '../UI/icons';
import AuthService from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
const authService = new AuthService();

function SideBar({
  type,
  sideBarActive,
  setSideBarActive,
  hiddenLocation,
  shownLocation,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const refreshSideBar = () => {
      if (sideBarActive) {
        setSideBarActive(false);
      }
    };

    refreshSideBar();
  }, [navigate]);

  const isActive = path => location.pathname === path;

  const isAuthenticated = () => {
    return !!authService.getToken();
  };

  const burgerBarLinks = [
    {
      name: 'მთავარი',
      link: '/',
    },
    {
      name: 'კურსები',
      link: '/courses',
    },
    {
      name: 'ჩვენს შესახებ',
      link: '/aboutus',
    },
    {
      name: 'კონტაქტი',
      link: '/contacts',
    },
    {
      name: 'გახდი პარტნიორი',
      link: '/become-partner',
    },
    // {
    //   name: 'პაკეტები',
    //   link: '/subscriptions',
    // },
  ];

  const userMenuLinks = [
    {
      name: 'პროფილი',
      link: '/me',
    },
    {
      name: 'კურსები',
      link: '/me/courses',
    },
    {
      name: 'ფავორიტები',
      link: '/me/wishlist',
    },
    {
      name: 'გადახდების ისტორია',
      link: '/me/purchase-history',
    },
    {
      name: 'პარამეტრები',
      link: '/me/settings',
    },
  ];

  return (
    <div
      className={styles.sideBarContainer}
      style={{
        transform: sideBarActive ? shownLocation : hiddenLocation,
      }}
    >
      <div className={styles.sideBarInnerContainer}>
        <div className={styles.sideBarLogo} onClick={() => navigate('/')}>
          Educity
        </div>

        <div
          className={styles.closeIcon}
          onClick={() => setSideBarActive(false)}
        >
          <CloseIcon />
        </div>
      </div>

      {type === 'burger' && (
        <div className={styles.sideBarLinksContainer}>
          {burgerBarLinks.map((page, index) => (
            <div
              className={`${styles.sideBarLink} ${
                isActive(page.link) ? styles.active : ''
              }`}
              onClick={() => navigate(page.link)}
              key={index}
            >
              {page.name}
            </div>
          ))}
        </div>
      )}

      {type === 'user' && (
        <>
          {isAuthenticated() && (
            <div className={styles.authenticatedUserContainer}>
              <div className={styles.userIcon}>
                <UserIcon />
              </div>
              <div className={styles.userName}>Sophia Rose</div>
            </div>
          )}
          <div className={styles.sideBarLinksContainer}>
            {userMenuLinks.map((page, index) => (
              <div
                className={`${styles.sideBarLink} ${
                  isActive(page.link) ? styles.active : ''
                }`}
                onClick={() => navigate(page.link)}
                key={index}
              >
                {page.name}
              </div>
            ))}
          </div>

          <div className={styles.logOutButton}>
            <Button
              type="secondary"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              LOG OUT
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBar;
