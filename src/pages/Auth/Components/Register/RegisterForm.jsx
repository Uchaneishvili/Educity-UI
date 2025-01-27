import React from "react";
import styles from "./RegisterForm.module.css";
import Checkbox from "../../../../components/UI/Checkbox/Checkbox";
import { Button } from "../../../../components/UI/Button/Button";
import Input from "../../../../components/UI/Input/Input";

function RegisterForm() {
  return (
    <form className={styles.inputContainer}>
      <Input name="fullName" placeholder={"სახელი/გვარი"} />
      <Input name="email" placeholder={"ელ.ფოსტა"} />
      <Input name="phoneNumber" placeholder={"ტელეფონის ნომერი"} />
      <Input name="city" placeholder={"ქალაქი"} />
      <Input name="birthDate" placeholder={"დაბადების თარიღი"} />
      <Input name="password" placeholder={"პაროლი"} />
      <Input name="repeatPassword" placeholder={"გაიმეორე პაროლი"} />

      <div className={styles.inputContainerFooter}>
        <div className={styles.acceptRulesContainer}>
          <Checkbox
            name="rememberMe"
            // checked={isChecked}
            // onChange={() => setIsChecked(!isChecked)}
          />
          <span className={styles.acceptRules}>
            {" "}
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
