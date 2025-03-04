import React, { useEffect, useState } from 'react';
import styles from './UserSettings.module.css';
import Input from '../../../../components/UI/Input/Input';
import { Button } from '../../../../components/UI/Button/Button';
import { useAuth } from '../../../../context/AuthContext';
import { uploadFile } from '../../../../services/upload.service';
import Select from '../../../../components/UI/Select/Select';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';
function UserSettings() {
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
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
        console.log('file', file);
        const response = await uploadFile(file);
        console.log('response', response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.uploadPhotoContainer}>
        <div className={styles.uploadPhotoImgContainer}>
          <img
            src={selectedImage || data?.photoURL || '/assets/userAvatar.png'}
            alt="user"
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
          Image size should be under 1MB and image ratio needs to be 1:1
        </div>
      </div>
      <div className={styles.formsContainer}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit}
          defaultValue={data}
        >
          <div className={styles.twoInputContainer}>
            <div className={styles.inputContainer}>
              <Input
                type="text"
                name="სახელი/გვარი"
                placeholder="სახელი/გვარი"
                id="firstName"
                defaultValue={data?.fullName}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="email"
              name="მეილი"
              placeholder="მეილი"
              id="email"
              defaultValue={data?.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="ნომერი"
              placeholder="ნომერი"
              id="phoneNumber"
              defaultValue={data?.phoneNumber}
            />
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
              id={'dob'}
              placeholder={'დაბადების თარიღი'}
              defaultValue={data?.birthDate}
            />
          </div>

          <Button type="primary" width="134px">
            შენახვა
          </Button>
        </form>

        <div className={styles.formTitle}>Change password</div>
        <form className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <Input
              name="Current Password"
              placeholder="Password"
              id="currentPassword"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              name="New Password"
              placeholder="Password"
              id="newPassword"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              name="Confirm Password"
              placeholder="Confirm new password"
              id="confirmPassword"
            />
          </div>
          <Button type="primary" width="223px">
            პაროლის შეცვლა
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
