import React, { useEffect } from 'react'
import styles from './Messenger.module.css'

export function Messenger() {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      })
    }

    // Load the SDK asynchronously
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/ka_GE/sdk/xfbml.customerchat.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }, [])

  return (
    <div className={styles.messengerContainer}>
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id="100088498458265" // Replace with your Facebook Page ID
      ></div>
    </div>
  )
}
