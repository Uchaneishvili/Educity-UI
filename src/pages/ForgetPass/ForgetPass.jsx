import React from 'react';
import styles from './ForgetPass.module.css';
import Input from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

function ForgetPass() {
  const authService = new AuthService();
  const [email, setEmail] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const { success, message } = await authService.forgotPassword(email);
    if (success) {
      setSuccessMessage(
        'პაროლის აღდგენის ბმული გამოგზავნილია თქვენს ელ.ფოსტაზე',
      );
    } else {
      setErrorMessage(message || 'პაროლის აღდგენა ვერ მოხერხდა');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.welcomeContainer}>
              <div className={styles.title}>დაგავიწყდა პაროლი?</div>
              <div className={styles.description}>
                გთხოვთ გაიაროთ ავტორიზაცია, თუ არ გაქვთ ანგარიში გაიარეთ
                რეგისრაცია, რათა ისარგებლოთ ჩვენი სერვისებით
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                name="email"
                placeholder={'ელ.ფოსტა'}
                value={email}
                onChange={handleEmailChange}
              />

              <div className={styles.recoveryBtnContainer}>
                <Button width="70%" type="primary">
                  პაროლის აღდგენა
                </Button>
              </div>
            </form>

            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}

            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" alt="banner" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
