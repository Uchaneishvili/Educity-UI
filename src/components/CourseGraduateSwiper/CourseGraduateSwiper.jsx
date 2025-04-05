import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Feedback } from '../UI/Feedback/Feedback';
import styles from './CourseGraduateSwiper.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    image: '/assets/courseGraduates/Ana-Kartozia.jpg',
    name: 'ანა კარტოზია',
    text: 'ვგრძნობ როგორ განვითარდი და უდიდეს მოტივაციას მაძლევს მენტორი, რაც ძალიან ბედნიერს მხდის!',
    rating: 5,
  },
  {
    id: 2,
    image: '/assets/courseGraduates/Vako-Kobulashvili.jpg',
    name: 'ვაკო ქობულაშვილი',
    text: 'მადლობას ვუხდი ჩემს მენტორებს, რომლებმაც უმოკლეს ვადაში შემასწავლეს ვებ პროგრამირება. ახლა თავისუფლად ვქმნი ფუნქციონალით სავსე ვებსაიტებს.',
    rating: 5,
  },
  {
    id: 3,
    image: '/assets/courseGraduates/Lizi-Aminashvili.jpg',
    name: 'ლიზი ამინაშვილი',
    text: 'მენტორი არაჩვეულებრივია – მუდამ დადებითი, ენერგიული და მოტივაციის მომცემი. მიხარია რომ გავიცანი!',
    rating: 5,
  },
  {
    id: 4,
    image: '/assets/courseGraduates/Medea-Tandashvili.jpg',
    name: 'მედეა თანდაშვილი',
    text: 'დიდი მადლობა ედუსითის გუნდს, იაკოსა და ლევანს სტუდენტებზე მუდმივი ზრუნვისა და მხარდაჭერისთვის!',
    rating: 5,
  },
  {
    id: 5,
    image: '/assets/courseGraduates/Lana-Witelashvili.jpg',
    name: 'ლანა წითელაშვილი',
    text: 'მენტორი ქეთი პროფესიონალი და გულისხმიერია – დიდი მოტივაცია მაქვს მისი წყალობით და კურსმა მოლოდინებს გადააჭარბა!',
    rating: 5,
  },
  {
    id: 6,
    image: '/assets/courseGraduates/Lika-Bedianidze.jpeg',
    name: 'ლიკა ბედიანიძე',
    text: 'მენტორი იაკო – სასწაული ლექტორია. ყოველთვის ყურადღებიანია, გულწრფელად ზრუნავს თითოეულ სტუდენტზე და ნებისმიერი სირთულის დროს გვერდში გვიდგას.',
    rating: 5,
  },
];

export function CourseGraduateSwiper() {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      className={styles.swiper}
      spaceBetween={30}
      slidesPerView={1}
    >
      {testimonials.map(testimonial => (
        <SwiperSlide key={testimonial.id}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialLayout}>
              <div className={styles.imageWrapper}>
                <img src={testimonial.image} loading="lazy" alt="testimonial" />
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
  );
}
