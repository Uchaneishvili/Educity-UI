import React from "react";
import styles from "./ForgetPass.module.css";
import Input from "../../components/UI/Input/Input";
import { Button } from "../../components/UI/Button/Button";

function ForgetPass() {
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

            <form className={styles.form}>
              <Input name="email" placeholder={"ელ.ფოსტა"} />

              <div className={styles.recoveryBtnContainer}>
                <Button width="70%" type="primary">
                  პაროლის აღდგენა
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" alt="banner" />
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
