import React from 'react'
import styles from './Subscription.module.css'
import { CheckIcon } from '../../components/UI/icons'
import { Button } from '../../components/UI/Button/Button'

function SubscriptionPack() {
  const subscriptions = [
    {
      name: 'Basic Pack',
      price: 'Free',
      duration: 'FOREVER',
      lists: [
        'Components-driven system',
        'Sales-boosting landing pages',
        'Awesome Feather icons pack'
      ],
      listColor: '#C2C2C2'
    },
    {
      name: 'Standard Pack',
      price: '$24',
      duration: 'MONTH',
      lists: [
        'Components-driven system',
        'Sales-boosting landing pages',
        'Awesome Feather icons pack',
        'Themed into 3 different styles',
        'Will help to learn Figma'
      ],
      listColor: '#3561FE',
      showBestText: true,
      select: true
    },
    {
      name: 'Premium Pack',
      price: '$12',
      duration: 'EDITOR',
      lists: [
        'Components-driven system',
        'Sales-boosting landing pages',
        'Awesome Feather icons pack',
        'Themed into 3 different styles'
      ],
      listColor: '#00DF76'
    }
  ]

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.subscriptionPackTextsContainer}>
          <div className={styles.subscriptionPackTitle}>
            We create a monthly pricing package for all standard students
          </div>
          <div className={styles.subscriptionPackDescription}>
            Basically we create this package for those who are really interested and get benifited
            from our courses or books. We want to make a low cost package for them. So that they can
            purchase any courses with the package they buy from us. Also will get free books from
            every packages.
          </div>
        </div>

        <div className={styles.subscriptionPackCardsContainer}>
          {subscriptions.map((subscription, index) => (
            <div
              className={`${styles.subscriptionPackCardContainer} ${
                subscription.select && styles.active
              }`}
              key={index}
            >
              <div>
                <div className={styles.subscriptionCardTitleContainer}>
                  <div className={styles.subscriptionPackCardName}>{subscription.name}</div>
                  {subscription.showBestText && (
                    <div className={styles.subscriptionPackCardBestText}>BEST!</div>
                  )}
                </div>
                <div className={styles.subscriptionPackCardPrice}>
                  {subscription.price}
                  <div className={styles.subscriptionPackCardDuration}>
                    / {subscription.duration}
                  </div>
                </div>

                <div className={styles.subscriptionPackCardListsContainer}>
                  {subscription.lists.map((list, index1) => (
                    <div className={styles.subscriptionPackCardListContainer} key={index1}>
                      <div
                        className={styles.subscriptionPackCardCheckIcon}
                        style={{ backgroundColor: subscription.listColor }}
                      >
                        <CheckIcon />
                      </div>
                      <div className={styles.subscriptionPackCardListText}>{list}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="primary" width="100%">
                შეძენა
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPack
