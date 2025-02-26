import React from "react";
import styles from "./CourseContact.module.css";
import Input from "../../../../../../../components/UI/Input/Input";
import Textarea from "../../../../../../../components/UI/Textarea/Textarea";
import { Button } from "../../../../../../../components/UI/Button/Button";

function CourseContact() {
  return (
    <form className={styles.container}>
      <Input name="fullName" placeholder="სახელი/გვარი" />
      <Input name="phoneNumber" placeholder="ტელეფონის ნომერი" />
      <Input name="email" placeholder="ელ ფოსტა" />
      <Textarea name="comment" placeholder="კომენტარი" />
      <Button type="primary" width="145px">
        გაგზავნა
      </Button>
    </form>
  );
}

export default CourseContact;
