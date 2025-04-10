import React, { useEffect, useState } from 'react';
import styles from './UserSettings.module.css';
import Input from '../../../../components/UI/Input/Input';
import { Button } from '../../../../components/UI/Button/Button';
import { useAuth } from '../../../../context/AuthContext';
import { uploadFile } from '../../../../services/upload.service';
import Select from '../../../../components/UI/Select/Select';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';
import { updateUser } from '../../../../services/user.service';
import AuthService from '../../../../services/auth.service';

const authService = new AuthService();

function UserSettings() {
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {
      ...Object.fromEntries(formData.entries()),
      image: data.image,
    };

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await updateUser(data._id, values);
      } catch (err) {
        setFormErrors({
          ...formErrors,
          general: 'წარმოიშვა შეცდომა მონაცემების შეცვლისას!',
        });
        console.log('Error while submitting form', err);
      }
    } else {
      setFormErrors(validationErrors);
    }
  };

  const handlePasswordChange = e => {
    setPasswordData({
      ...passwordData,
      [e.target.id]: e.target.value,
    });
  };

  const changeUserPassword = async e => {
    e.preventDefault();
    const passwordValidation = validatePassword(passwordData);
    if (Object.keys(passwordValidation).length === 0) {
      try {
        const response = await authService.changePassword(passwordData);
      } catch (err) {
        console.log('Error while changing password', err);
        setFormErrors({
          ...formErrors,
          general: 'წარმოიშვა შეცდომა პაროლის შეცვლისას!',
        });
      }
    } else {
      setFormErrors(passwordValidation);
    }
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        alert('File size should be under 1MB');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      try {
        const response = await uploadFile(file);
        setData({ ...data, image: response.data.url });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = data => {
    let errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = 'სახელი და გვარის შეყვანა აუცილებელია!';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email.trim()) {
      errors.email = 'ელ.ფოსტის შეყვანა აუცილებელია!';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'გთხოვთ შეიყვანეთ სწორი ელ.ფოსტა!';
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'ტელეფონის ნომრის შეყვანა აუცილებელია!';
    }

    return errors;
  };

  const validatePassword = passwordData => {
    let errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'მიმდინარე პაროლის შეყვანა აუცილებელია!';
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'ახალი პაროლის შეყვანა აუცილებელია!';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'ახალი პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს!';
    } else if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'ახალი პაროლი არ უნდა ემთხვეოდეს ძველს!';
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'განმეორებითი პაროლის შეყვანა აუცილებელია!';
    } else if (passwordData.confirmPassword !== passwordData.newPassword) {
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
      <div className={styles.uploadPhotoContainer}>
        <div className={styles.uploadPhotoImgContainer}>
          <img
            src={selectedImage || data?.image || '/assets/userAvatar.png'}
            alt="user"
            loading="lazy"
          />
          <label className={styles.uploadOverlay}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <span className={styles.uploadIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 16L12 8M12 8L15 11M12 8L9 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload Photo
            </span>
          </label>
        </div>
        <div className={styles.uploadPhotoText}>
          ფოტოს ზომა სავალდებულოა, რომ იყოს 1 MB-ზე ნაკლები, ხოლო გამოსახულება
          საჭიროა იყოს 1:1
        </div>
      </div>

      <div className={styles.formsContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.twoInputContainer}>
            <div className={styles.inputContainer}>
              <Input
                type="text"
                name="სახელი/გვარი"
                placeholder="სახელი/გვარი"
                id="fullName"
                defaultValue={data?.fullName}
                formErrors={formErrors}
              />
              <ErrorMessage fieldName="fullName" formErrors={formErrors} />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="ელ.ფოსტა"
              placeholder="ელ.ფოსტა"
              id="email"
              defaultValue={data?.email}
              formErrors={formErrors}
            />
            <ErrorMessage fieldName="email" formErrors={formErrors} />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="საკონტაქტო ნომერი"
              placeholder="საკონტაქტო ნომერი"
              id="phoneNumber"
              defaultValue={data?.phoneNumber}
              formErrors={formErrors}
            />
            <ErrorMessage fieldName="phoneNumber" formErrors={formErrors} />
          </div>
          <div className={styles.inputContainer}>
            <Select
              id="city"
              name="ქალაქი"
              placeholder={'ქალაქი'}
              options={[
                { id: 1, value: 'თბილისი' },
                { id: 2, value: 'ბათუმი' },
              ]}
            />
          </div>
          <div className={styles.inputContainer}>
            <DatePicker
              name="დაბადების თარიღი"
              id={'birthDate'}
              placeholder={'დაბადების თარიღი'}
              defaultValue={data?.birthDate}
            />
          </div>

          <ErrorMessage fieldName="general" formErrors={formErrors} />

          <Button type="primary" width="134px">
            შენახვა
          </Button>
        </form>

        <div className={styles.formTitle}>პაროლის შეცვლა</div>
        <form className={styles.formContainer} onSubmit={changeUserPassword}>
          <div className={styles.inputContainer}>
            <Input
              type="password"
              name="მიმდინარე პაროლი"
              placeholder="მიმდინარე პაროლი"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              formErrors={formErrors}
            />
            <ErrorMessage fieldName="currentPassword" formErrors={formErrors} />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="password"
              name="ახალი პაროლი"
              placeholder="ახალი პაროლი"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              formErrors={formErrors}
            />
            <ErrorMessage fieldName="newPassword" formErrors={formErrors} />
          </div>

          <div className={styles.inputContainer}>
            <Input
              type="password"
              name="ახალი პაროლის გამეორება"
              placeholder="ახალი პაროლი"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              formErrors={formErrors}
            />
            <ErrorMessage fieldName="confirmPassword" formErrors={formErrors} />
          </div>

          <ErrorMessage fieldName="general" formErrors={formErrors} />

          <Button type="primary" width="223px">
            პაროლის შეცვლა
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
