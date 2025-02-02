import React from "react";
import styles from "./UserSettings.module.css";
import Input from "../../../../components/UI/Input/Input";
import { Button } from "../../../../components/UI/Button/Button";

function UserSettings() {
  return (
    <div className={styles.container}>
      <div className={styles.uploadPhotoContainer}>
        <div className={styles.uploadPhotoImgContainer}>
          <img src="/assets/userAvatar.png" alt="user" />
        </div>
        <div className={styles.uploadPhotoText}>
          Image size should be under 1MB and image ration needs to be 1:1
        </div>
      </div>
      <div className={styles.formsContainer}>
        <form className={styles.formContainer}>
          <div className={styles.twoInputContainer}>
            <div className={styles.inputContainer}>
              <Input
                type="text"
                name="Full name"
                placeholder="First name"
                id="firstName"
              />
            </div>
            <div className={styles.inputContainer}>
              <Input type="text" placeholder="Last name" />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="Username"
              placeholder="Enter your username"
              id="username"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="email"
              name="Email"
              placeholder="Email address"
              id="email"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              name="Title"
              placeholder="Your tittle, proffesion or small biography"
              id="title"
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
