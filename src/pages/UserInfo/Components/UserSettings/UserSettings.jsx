import React, { useEffect, useState } from 'react';
import styles from './UserSettings.module.css';
import Input from '../../../../components/UI/Input/Input';
import { Button } from '../../../../components/UI/Button/Button';
import { useAuth } from '../../../../context/AuthContext';
import { uploadFile } from '../../../../services/upload.service';
import Select from '../../../../components/UI/Select/Select';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';
import { updateUser as updateUserAPI } from '../../../../services/user.service';
import AuthService from '../../../../services/auth.service';

const authService = new AuthService();

function UserSettings() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    birthDate: '',
    image: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [photoUploadSuccess, setPhotoUploadSuccess] = useState(false);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Initialize formData when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        city: user.city || '',
        birthDate: user.birthDate || '',
        image: user.image || '',
      });
    }
  }, [user]);

  // Handle text input changes
  const handleInputChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // Format Date
  const formatDateForInput = isoString => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${mm}/${dd}/${yyyy}`;
  };

  // Handle date picker changes
  const handleDateChange = (key, value) => {
    if (!value) return;

    const date = new Date(value);

    const result = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    setFormData(prev => ({
      ...prev,
      [key]: result,
    }));
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await updateUserAPI(user._id, formData);

        if (response?.data) {
          updateUser(response.data);
          setFormSubmitSuccess(true);
          setFormErrors({});
        }
      } catch (err) {
        console.log(err);
        setFormErrors({
          ...formErrors,
          general: 'წარმოიშვა შეცდომა მონაცემების შეცვლისას!',
        });
      }
    } else {
      setFormErrors(validationErrors);
      setFormSubmitSuccess(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1048576) {
      alert('File size should be under 1MB');
      return;
    }

    try {
      const response = await uploadFile(file);

      setFormData(prev => ({ ...prev, image: response.data.url }));
      setSelectedImage(response.data.url);

      updateUser({ ...user, image: response.data.url });
      setPhotoUploadSuccess(true);
    } catch (err) {
      console.log(err);
      setFormErrors(prev => ({
        ...prev,
        general: 'შეცდომა ფოტოს ატვირთვისას!',
      }));
      setPhotoUploadSuccess(false);
    }
  };

  // Password form handlers
  const handlePasswordChange = e => {
    const { id, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const changeUserPassword = async e => {
    e.preventDefault();
    const passwordValidation = validatePassword(passwordData);
    if (Object.keys(passwordValidation).length === 0) {
      try {
        await authService.changePassword(passwordData);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setPasswordChangeSuccess(true);
        setFormErrors({});
      } catch (err) {
        console.log(err);
        setFormErrors({
          ...formErrors,
          general: 'წარმოიშვა შეცდომა პაროლის შეცვლისას!',
        });
      }
    } else {
      setFormErrors(passwordValidation);
      setPasswordChangeSuccess(false);
    }
  };

  // Form validations
  const validateForm = data => {
    const errors = {};
    if (!data.fullName.trim())
      errors.fullName = 'სახელი და გვარის შეყვანა აუცილებელია!';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.email.trim()) errors.email = 'ელ.ფოსტის შეყვანა აუცილებელია!';
    else if (!emailRegex.test(data.email.trim()))
      errors.email = 'გთხოვთ შეიყვანეთ სწორი ელ.ფოსტა!';

    if (!data.phoneNumber.trim())
      errors.phoneNumber = 'ტელეფონის ნომრის შეყვანა აუცილებელია!';
    return errors;
  };

  const validatePassword = data => {
    const errors = {};
    if (!data.currentPassword)
      errors.currentPassword = 'მიმდინარე პაროლის შეყვანა აუცილებელია!';
    if (!data.newPassword)
      errors.newPassword = 'ახალი პაროლის შეყვანა აუცილებელია!';
    else if (data.newPassword.length < 6)
      errors.newPassword = 'ახალი პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს!';
    else if (data.currentPassword === data.newPassword)
      errors.newPassword = 'ახალი პაროლი არ უნდა ემთხვეოდეს ძველს!';
    if (!data.confirmPassword)
      errors.confirmPassword = 'განმეორებითი პაროლის შეყვანა აუცილებელია!';
    else if (data.confirmPassword !== data.newPassword)
      errors.confirmPassword = 'განმეორებითი პაროლი არასწორია!';
    return errors;
  };

  const ErrorMessage = ({ fieldName }) =>
    formErrors[fieldName] ? (
      <span className={styles.errorMessage}>{formErrors[fieldName]}</span>
    ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.uploadPhotoContainer}>
        <div className={styles.uploadPhotoImgContainer}>
          <img
            src={selectedImage || formData.image || '/assets/userAvatar.png'}
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
          საჭირო არის 1:1
        </div>
        {photoUploadSuccess && (
          <div className={styles.successMessage}>ფოტო წარმატებით შეიცვალა!</div>
        )}
      </div>

      <div className={styles.formsContainer}>
        {/* User info form */}
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="სახელი/გვარი"
              placeholder="სახელი/გვარი"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <ErrorMessage fieldName="fullName" />
          </div>

          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="ელ.ფოსტა"
              placeholder="ელ.ფოსტა"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <ErrorMessage fieldName="email" />
          </div>

          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="საკონტაქტო ნომერი"
              placeholder="საკონტაქტო ნომერი"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <ErrorMessage fieldName="phoneNumber" />
          </div>

          <div className={styles.inputContainer}>
            {formData.city && (
              <Select
                id="city"
                name="ქალაქი"
                placeholder="ქალაქი"
                defaultValue={formData.city}
                onChange={value => handleSelectChange('city', value)}
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
            )}
          </div>

          <div className={styles.inputContainer}>
            {formData.birthDate && (
              <DatePicker
                id="birthDate"
                name="დაბადების თარიღი"
                placeholder="დაბადების თარიღი"
                defaultValue={formatDateForInput(formData.birthDate)}
                onChange={value => handleDateChange('birthDate', value)}
              />
            )}

            {formSubmitSuccess && (
              <div className={styles.successMessage}>
                მონაცემები წარმატებით შეიცვალა!
              </div>
            )}
          </div>

          <ErrorMessage fieldName="general" />
          <Button type="primary" width="134px">
            შენახვა
          </Button>
        </form>

        {/* Password change form */}
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
            />
            <ErrorMessage fieldName="currentPassword" />
          </div>

          <div className={styles.inputContainer}>
            <Input
              type="password"
              name="ახალი პაროლი"
              placeholder="ახალი პაროლი"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <ErrorMessage fieldName="newPassword" />
          </div>

          <div className={styles.inputContainer}>
            <Input
              type="password"
              name="ახალი პაროლის გამეორება"
              placeholder="ახალი პაროლი"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
            <ErrorMessage fieldName="confirmPassword" />
            {passwordChangeSuccess && (
              <div className={styles.successMessage}>
                პაროლი წარმატებით შეიცვალა!
              </div>
            )}
          </div>

          <ErrorMessage fieldName="general" />
          <Button type="primary" width="223px">
            პაროლის შეცვლა
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
