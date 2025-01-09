import React from "react";
import styles from "./SocialMedia.module.css";
import { LinkedinIcon, FacebookIcon, InstagramIcon } from "../UI/icons";

function SocialMedia() {
  return (
    <div className={styles.SocialMediaIcons}>
      <a>
        <LinkedinIcon />
      </a>
      <a>
        <FacebookIcon />
      </a>
      <a>
        <InstagramIcon />
      </a>
    </div>
  );
}

export default SocialMedia;
