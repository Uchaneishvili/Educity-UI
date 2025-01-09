import React from "react";
import styles from "./Contact.module.css";
import {
  PhoneIcon,
  MessageIcon,
  LocationIcon,
} from "../../components/UI/icons";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import ContactsInput from "../../components/UI/ContactsInput/ContactsInput";
import { Button } from "../../components/UI/Button/Button";

function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.contactsContainer}>
        <div className={styles.contactsInfoContainer}>
          <div>
            <div className={styles.contactsTitle}>საკონტაქტო ინფორმაცია</div>

            <div className={styles.contactsInfo}>
              <div className={styles.contactInfo}>
                <PhoneIcon /> 995 (032) 2 12 09 90
              </div>
              <div className={styles.contactInfo}>
                <MessageIcon /> customerservice@spacecargo.ge
              </div>
              <div className={styles.contactInfo}>
                <LocationIcon /> თბილისი ალ. ყაზბეგის გამზ. 30ა / კ. ქუთათელაძის
                კვეთა
              </div>
            </div>
          </div>

          <SocialMedia />
        </div>

        <form className={styles.contactsFormContainer}>
          <div className={styles.twoInputsContainer}>
            <div className={styles.nameInputContainer}>
              <ContactsInput
                type="text"
                id="name"
                name="სახელი"
                placeholder="სახელი"
              />
            </div>
            <div className={styles.lastNameInputContainer}>
              <ContactsInput
                type="text"
                id="lastName"
                name="გვარი"
                placeholder="გვარი"
              />
            </div>
          </div>
          <div className={styles.twoInputsContainer}>
            <div className={styles.emailInputContainer}>
              <ContactsInput
                type="text"
                id="email"
                name="ელ-ფოსტა"
                placeholder="ელ-ფოსტა"
              />
            </div>
            <div className={styles.phoneNumberInputContainer}>
              <ContactsInput
                type="text"
                id="phoneNumber"
                name="ტელეფონის ნომერი"
                placeholder="5XX XXX XXX"
              />
            </div>
          </div>
          <div>
            <ContactsInput
              type="text"
              id="title"
              name="სათაური"
              placeholder="შეტყობინების სათაური"
            />
          </div>
          <div>
            <ContactsInput
              input="textarea"
              id="message"
              name="შეტყობინება"
              placeholder="დაწერეთ თქვენი შეტყობინება.."
            />
          </div>

          <div className={styles.contactsButtonContainer}>
            <Button type="primary" children="გაგზავნა" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
