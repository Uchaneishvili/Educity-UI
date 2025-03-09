import React, { useState } from 'react';
import styles from './RecoveryPass.module.css';
import Input from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import AuthService from '../../services/auth.service';

const authService = new AuthService();

const RecoveryPass = () => {
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    repeatPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

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
        const response = await authService.changePassword(passwordData);
        console.log('response', response);
      } catch (err) {
        console.log('Error while changing password', err);
        setFormErrors({
          ...formErrors,
          general: 'წარმოიშვა შეცდომა პაროლის აღდგენისას!',
        });
      }
    } else {
      setFormErrors(passwordValidation);
    }
  };

  const validatePassword = passwordData => {
    let errors = {};

    if (!passwordData.newPassword) {
      errors.newPassword = 'ახალი პაროლის შეყვანა აუცილებელია!';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'ახალი პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს!';
    }

    if (!passwordData.repeatPassword) {
      errors.repeatPassword = 'განმეორებითი პაროლის შეყვანა აუცილებელია!';
    } else if (passwordData.repeatPassword !== passwordData.newPassword) {
      errors.repeatPassword = 'განმეორებითი პაროლი არასწორია!';
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
                გთხოვთ გაიაროთ ავტორიზაცია, თუ არ გაქვთ ანგარიში გაიარეთ
                რეგისრაცია, რათა ისარგებლოთ ჩვენი სერვისებით
              </div>
            </div>

            <form className={styles.form} onSubmit={changeUserPassword}>
              <div>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder={'ახალი პაროლი'}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  formErrors={formErrors}
                />
                <ErrorMessage fieldName="newPassword" formErrors={formErrors} />
              </div>

              <div>
                <Input
                  type="password"
                  name="repeatPassword"
                  placeholder="გაიმეორე პაროლი"
                  value={passwordData.repeatPassword}
                  onChange={handlePasswordChange}
                  formErrors={formErrors}
                />
                <ErrorMessage
                  fieldName="repeatPassword"
                  formErrors={formErrors}
                />
              </div>

              <div className={styles.recoveryBtnContainer}>
                <Button width="70%" type="primary">
                  პაროლის აღდგენა
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default RecoveryPass;
