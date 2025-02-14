import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Feedback } from '../UI/Feedback/Feedback'
import styles from './CourseGraduateSwiper.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const testimonials = [
  {
    id: 1,
    image: '/assets/courseGraduateGirlPhoto.png',
    name: 'Gloria Rose',
    text: "\"Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking.\"",
    rating: 3
  },
  {
    id: 2,
    image: '/assets/courseGraduateGirlPhoto.png',
    name: 'Gloria Rose',
    text: "\"Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking.\"",
    rating: 3
  },
  {
    id: 3,
    image: '/assets/courseGraduateGirlPhoto.png',
    name: 'Gloria Rose',
    text: "\"Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking.\"",
    rating: 3
  },
  {
    id: 4,
    image: '/assets/courseGraduateGirlPhoto.png',
    name: 'Gloria Rose',
    text: "\"Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking.\"",
    rating: 3
  }
]

export function CourseGraduateSwiper() {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      className={styles.swiper}
      spaceBetween={30}
      slidesPerView={1}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialLayout}>
              <div className={styles.imageWrapper}>
                <img src={testimonial.image} alt="testimonial" />
              </div>
              <div className={styles.testimonialContent}>
                <div className={styles.blueStripe}></div>
                <div className={styles.contentWrapper}>
                  <p className={styles.testimonialText}>{testimonial.text}</p>
                  <div className={styles.testimonialFooter}>
                    <span className={styles.name}>{testimonial.name}</span>
                    <Feedback starsAmount={testimonial.rating} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
