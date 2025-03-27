import React, { useState, useEffect } from 'react';
import styles from './RecoveryPass.module.css';
import Input from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import AuthService from '../../services/auth.service';
import { useNavigate, useLocation } from 'react-router-dom';

const RecoveryPass = () => {
  const authService = new AuthService();
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Get token from URL or localStorage
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');
    const storedToken = localStorage.getItem('reset_token');

    if (urlToken) {
      setToken(urlToken);
    } else if (storedToken) {
      setToken(storedToken);
    } else {
      // No token found, redirect to forget password page
      navigate('/forget-pass');
    }
  }, [location, navigate]);

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeUserPassword = async e => {
    e.preventDefault();
    const passwordValidation = validatePassword(passwordData);

    if (Object.keys(passwordValidation).length === 0) {
      try {
        const response = await authService.resetPassword({
          password: passwordData.password,
          confirmPassword: passwordData.confirmPassword,
          token: token,
        });

        if (response.success) {
          setSuccessMessage('პაროლი წარმატებით შეიცვალა');
          // Clear the reset token
          localStorage.removeItem('reset_token');
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setFormErrors({
            general: response.error || 'წარმოიშვა შეცდომა პაროლის აღდგენისას!',
          });
        }
      } catch (err) {
        console.log('Error while changing password', err);
        setFormErrors({
          general: 'წარმოიშვა შეცდომა პაროლის აღდგენისას!',
        });
      }
    } else {
      setFormErrors(passwordValidation);
    }
  };

  const validatePassword = passwordData => {
    let errors = {};

    if (!passwordData.password) {
      errors.password = 'ახალი პაროლის შეყვანა აუცილებელია!';
    } else if (passwordData.password.length < 6) {
      errors.password = 'ახალი პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს!';
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'განმეორებითი პაროლის შეყვანა აუცილებელია!';
    } else if (passwordData.confirmPassword !== passwordData.password) {
      errors.confirmPassword = 'განმეორებითი პაროლი არასწორია!';
    }

    return errors;
  };

  const ErrorMessage = ({ fieldName, formErrors }) => {
    return formErrors[fieldName] ? (
      <span className={styles.errorMessage}>{formErrors[fieldName]}</span>
    ) : (
      ''
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.welcomeContainer}>
              <div className={styles.title}>პაროლის აღდგენა</div>
              <div className={styles.description}>
                გთხოვთ შეიყვანოთ ახალი პაროლი
              </div>
            </div>

            <form className={styles.form} onSubmit={changeUserPassword}>
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder={'ახალი პაროლი'}
                  value={passwordData.password}
                  onChange={handlePasswordChange}
                  formErrors={formErrors}
                />
                <ErrorMessage fieldName="password" formErrors={formErrors} />
              </div>

              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="გაიმეორე პაროლი"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  formErrors={formErrors}
                />
                <ErrorMessage
                  fieldName="confirmPassword"
                  formErrors={formErrors}
                />
              </div>

              {successMessage && (
                <div className={styles.successMessage}>{successMessage}</div>
              )}

              <ErrorMessage fieldName="general" formErrors={formErrors} />

              <div className={styles.recoveryBtnContainer}>
                <Button width="70%" type="primary">
                  პაროლის აღდგენა
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" alt="banner" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default RecoveryPass;
