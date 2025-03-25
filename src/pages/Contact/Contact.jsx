import React, { useState } from 'react';
import styles from './Contact.module.css';
import {
  PhoneIcon,
  MessageIcon,
  LocationIcon,
} from '../../components/UI/icons';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import { Button } from '../../components/UI/Button/Button';
import emailjs from '@emailjs/browser';
import GTMHelper from '../../utils/GTMHelper';

export function Contact() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    GTMHelper.event('contact_form_submit', {
      form_name: 'contact',
    });

    const serviceId = process.env.REACT_APP_EMAIL_CONTACTS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAIL_CONTACTS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_lastName: lastName,
      from_email: email,
      from_phoneNumber: phoneNumber,
      title: title,
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(response => {
        console.log('Email has been sent!', response);
        setName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setTitle('');
        setMessage('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.contactsContainer}>
          <div className={styles.contactsInfoContainer}>
            <div>
              <div className={styles.contactsTitle}>საკონტაქტო ინფორმაცია</div>

              <div className={styles.contactsInfo}>
                <div className={styles.contactInfo}>
                  <PhoneIcon /> +995 599 200 944
                </div>
                <div className={styles.contactInfo}>
                  <MessageIcon /> info@educity.ge
                </div>
                <div className={styles.contactInfo}>
                  <LocationIcon /> თბილისი, ვაჟა-ფშაველას 45
                </div>
              </div>
            </div>

            <SocialMedia />
          </div>

          <form
            className={styles.contactsFormContainer}
            onSubmit={handleSubmit}
          >
            <div className={styles.twoInputsContainer}>
              <div className={styles.nameInputContainer}>
                <Input
                  type="text"
                  id="name"
                  name="სახელი"
                  placeholder="სახელი"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.lastNameInputContainer}>
                <Input
                  type="text"
                  id="lastName"
                  name="გვარი"
                  placeholder="გვარი"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.twoInputsContainer}>
              <div className={styles.emailInputContainer}>
                <Input
                  type="text"
                  id="email"
                  name="ელ-ფოსტა"
                  placeholder="ელ-ფოსტა"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.phoneNumberInputContainer}>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="ტელეფონის ნომერი"
                  placeholder="5XX XXX XXX"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Input
                type="text"
                id="title"
                name="სათაური"
                placeholder="შეტყობინების სათაური"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Textarea
                id="message"
                name="შეტყობინება"
                placeholder="დაწერეთ თქვენი შეტყობინება.."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className={styles.contactsButtonContainer}>
              <Button type="primary">გაგზავნა</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
