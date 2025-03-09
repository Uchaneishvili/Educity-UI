import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { Button } from '../../../../components/UI/Button/Button';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox';
import Input from '../../../../components/UI/Input/Input';
import { useAuth } from '../../../../context/AuthContext';

function LoginForm({ onSuccess }) {
  const [formErrors, setFormErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const data = { ...values, rememberMe: isChecked };

    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length === 0) {
      setFormErrors({});
      try {
        const result = await login(data);
        if (result.success) {
          // onSuccess();
        } else {
          setFormErrors({
            ...formErrors,
            general: 'არასწორი ელ.ფოსტა ან პაროლი!',
          });
          console.error('Login failed:', result.error);
        }
      } catch (err) {
        console.error('Error during loggining:', err);
        setFormErrors({
          ...formErrors,
          general: 'წარმოიშვა შეცდომა ავტორიზაციისას!',
        });
      }
    } else {
      setFormErrors(validationErrors);
    }
  };

  const validateForm = data => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.email.trim()) {
      errors.email = 'ელ.ფოსტის შეყვანა აუცილებელია!';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'გთხოვთ შეიყვანეთ სწორი ელ.ფოსტა!';
    }
    if (!data.password) {
      errors.password = 'პაროლის შეყვანა აუცილებელია!';
    } else if (data.password.length < 6) {
      errors.password = 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს!';
    }

    return errors;
  };

  const ErrorMessage = ({ fieldName, formErrors }) => {
    return formErrors[fieldName] ? <span>{formErrors[fieldName]}</span> : '';
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <Input name="email" placeholder={'ელ.ფოსტა'} formErrors={formErrors} />
      <ErrorMessage fieldName="email" formErrors={formErrors} />

      <Input
        name="password"
        type={'password'}
        placeholder={'პაროლი'}
        formErrors={formErrors}
      />
      <ErrorMessage fieldName="password" formErrors={formErrors} />

      <div className={styles.inputContainerFooter}>
        <div className={styles.saveUserContainer}>
          <Checkbox
            name="rememberMe"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className={styles.saveUser}> მომხმარებლის დამახსოვრება</span>
        </div>

        <div
          className={styles.forgotPassword}
          onClick={() => navigate('/forget-pass')}
        >
          დაგავიწყდათ პაროლი?
        </div>
      </div>
      <ErrorMessage fieldName="general" formErrors={formErrors} />

      <div className={styles.loginBtnContainer}>
        <Button width="40%" type="primary">
          ავტორიზაცია
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
