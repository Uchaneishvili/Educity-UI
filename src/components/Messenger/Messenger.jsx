import React, { useEffect } from 'react';
import styles from './Messenger.module.css';

export function Messenger() {
  useEffect(() => {
    // Facebook SDK-ის ჩატვირთვა
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1794676524647863', // თქვენი APP ID
        xfbml: true,
        version: 'v18.0',
      });
    };

    // SDK-ის ასინქრონულად ჩატვირთვა
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/ka_GE/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <div className={styles.messengerContainer}>
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id="552099707988229" // თქვენი PAGE ID
      ></div>
    </div>
  );
}
