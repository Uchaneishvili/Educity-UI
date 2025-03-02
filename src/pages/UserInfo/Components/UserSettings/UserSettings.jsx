import React, { useEffect, useState } from 'react'
import styles from './UserSettings.module.css'
import Input from '../../../../components/UI/Input/Input'
import { Button } from '../../../../components/UI/Button/Button'
import { useAuth } from '../../../../context/AuthContext'
import { uploadFile } from '../../../../services/upload.service'
function UserSettings() {
  const [data, setData] = useState()
  const [selectedImage, setSelectedImage] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    setData(user)
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    console.log(formData)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        alert('File size should be under 1MB')
        return
      }
      setSelectedImage(URL.createObjectURL(file))
      try {
        console.log('file', file)
        const response = await uploadFile(file)
        console.log('response', response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.uploadPhotoContainer}>
        <div className={styles.uploadPhotoImgContainer}>
          <img src={selectedImage || data?.photoURL || '/assets/userAvatar.png'} alt="user" />
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
        <form className={styles.formContainer} onSubmit={handleSubmit} defaultValue={data}>
          <div className={styles.twoInputContainer}>
            <div className={styles.inputContainer}>
              <Input
                type="text"
                name="Full name"
                placeholder="  name"
                id="firstName"
                defaultValue={data?.fullName}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="email"
              name="Email"
              placeholder="Email address"
              id="email"
              defaultValue={data?.email}
            />
          </div>

          <Button type="primary" width="134px">
            შენახვა
          </Button>
        </form>

        <div className={styles.formTitle}>Change password</div>
        <form className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <Input name="Current Password" placeholder="Password" id="currentPassword" />
          </div>
          <div className={styles.inputContainer}>
            <Input name="New Password" placeholder="Password" id="newPassword" />
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
  )
}

export default UserSettings
