import React, { useState } from "react";
import styles from "./Auth.module.css";
import { Button } from "../../components/UI/Button/Button";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import Input from "../../components/UI/Input/Input";
import AuthService from "../../services/auth.service";

const authService = new AuthService();

function LoginForm() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const res = await authService.login(values);
    if (res.success) {
      console.log("Login successful:", res.data);
      // Redirect or update UI as needed
    } else {
      console.error("Login failed:", res.error);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <Input name="email" placeholder={"ელ.ფოსტა"} />
      <Input name="password" placeholder={"პაროლი"} />

      <div className={styles.inputContainerFooter}>
        <div className={styles.saveUserContainer}>
          <Checkbox
            name="rememberMe"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className={styles.saveUser}> მომხმარებლის დამახსოვრება</span>
        </div>

        <div className={styles.forgotPassword}>დაგავიწყდათ პაროლი?</div>
      </div>
      <div className={styles.loginBtnContainer}>
        <Button width="40%" type="primary">
          ავტორიზაცია
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
