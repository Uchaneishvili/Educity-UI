import React, { useState, useMemo } from 'react';
import styles from './RegisterForm.module.css';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox';
import { Button } from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import AuthService from '../../../../services/auth.service';
import Select from '../../../../components/UI/Select/Select';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';

const authService = new AuthService();

function RegisterForm({ setActiveTab }) {
  const [formErrors, setFormErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    delete values.checked;

    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length === 0) {
      setFormErrors({});
      try {
        const res = await authService.register(values);
        if (res.success) {
          setActiveTab(0);
        }
      } catch (err) {
        console.error('Error during registration:', err);
      }
    } else {
      setFormErrors(validationErrors);
    }
  };

  const validateForm = useMemo(() => {
    return data => {
      let errors = {};
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!data.fullName) {
        errors.fullName = 'სახელი და გვარის შეყვანა აუცილებელია!';
      }
      if (!data.email.trim()) {
        errors.email = 'ელ.ფოსტის შეყვანა აუცილებელია!';
      } else if (!emailRegex.test(data.email.trim())) {
        errors.email = 'გთხოვთ შეიყვანეთ სწორი ელ.ფოსტა!';
      }
      if (!data.phoneNumber.trim()) {
        errors.phoneNumber = 'ტელეფონის ნომრის შეყვანა აუცილებელია!';
      }
      if (!data.password) {
        errors.password = 'პაროლის შეყვანა აუცილებელია!';
      } else if (data.password.length < 6) {
        errors.password = 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს!';
      }
      if (!data.confirmPassword) {
        errors.confirmPassword = 'განმეორებითი პაროლის შეყვანა აუცილებელია!';
      } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = 'განმეორებითი პაროლი არასწორია!';
      }
      if (!isChecked) {
        errors.checked = 'გთხოვთ დაეთანხმოთ წესებს და პირობებს!';
      }
      return errors;
    };
  }, [isChecked]);

  const ErrorMessage = ({ fieldName, formErrors }) => {
    return formErrors[fieldName] ? <span>{formErrors[fieldName]}</span> : '';
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <Input
        name="fullName"
        placeholder={'სახელი/გვარი'}
        formErrors={formErrors}
      />
      <ErrorMessage fieldName="fullName" formErrors={formErrors} />

      <Input name="email" placeholder={'ელ.ფოსტა'} formErrors={formErrors} />
      <ErrorMessage fieldName="email" formErrors={formErrors} />

      <Input
        name="phoneNumber"
        placeholder={'ტელეფონის ნომერი'}
        formErrors={formErrors}
      />
      <ErrorMessage fieldName="phoneNumber" formErrors={formErrors} />

      <Select
        name="city"
        placeholder={'ქალაქი'}
        options={[
          { id: 'tbilisi', value: 'თბილისი' },
          { id: 'batumi', value: 'ბათუმი' },
          { id: 'kutaisi', value: 'ქუთაისი' },
          { id: 'rustavi', value: 'რუსთავი' },
          { id: 'gori', value: 'გორი' },
          { id: 'zugdidi', value: 'ზუგდიდი' },
          { id: 'poti', value: 'ფოთი' },
          { id: 'telavi', value: 'თელავი' },
          { id: 'akhaltsikhe', value: 'ახალციხე' },
          { id: 'borjomi', value: 'ბორჯომი' },
          { id: 'mtskheta', value: 'მცხეთა' },
          { id: 'kobuleti', value: 'ქობულეთი' },
          { id: 'khashuri', value: 'ხაშური' },
          { id: 'samtredia', value: 'სამტრედია' },
          { id: 'senaki', value: 'სენაკი' },
          { id: 'akhalkalaki', value: 'ახალქალაქი' },
          { id: 'tskhaltubo', value: 'წყალტუბო' },
          { id: 'chiatura', value: 'ჭიათურა' },
          { id: 'ozurgeti', value: 'ოზურგეთი' },
          { id: 'kaspi', value: 'კასპი' },
          { id: 'sachkhere', value: 'საჩხერე' },
          { id: 'lagodekhi', value: 'ლაგოდეხი' },
          { id: 'signagi', value: 'სიღნაღი' },
          { id: 'ambrolauri', value: 'ამბროლაური' },
          { id: 'marneuli', value: 'მარნეული' },
        ]}
      />

      <DatePicker name="birthDate" placeholder={'დაბადების თარიღი'} />

      <Input
        name="password"
        type={'password'}
        placeholder={'პაროლი'}
        formErrors={formErrors}
      />
      <ErrorMessage fieldName="password" formErrors={formErrors} />

      <Input
        name="confirmPassword"
        type={'password'}
        placeholder={'გაიმეორე პაროლი'}
        formErrors={formErrors}
      />
      <ErrorMessage fieldName="confirmPassword" formErrors={formErrors} />

      <div className={styles.termsAndConditionsContainer}>
        <div className={styles.acceptRulesContainer}>
          <Checkbox
            name="checked"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            formErrors={formErrors}
          />
          <span className={styles.acceptRules}>
            გავეცანი და ვეთანხმები წესებსა და პირობებს
          </span>
        </div>
      </div>
      <div className={styles.registerBtnContainer}>
        <Button width="70%" type="primary">
          რეგისტრაცია
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
