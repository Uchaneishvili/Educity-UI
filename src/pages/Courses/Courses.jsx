import { Card } from "../../components/UI/Card/Card";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import styles from "./Courses.module.css";
import Pagination from "../../components/UI/Pagination/Pagination";
import { useEffect } from "react";
import { getCourses } from "../../services/courses.service";

export function Courses() {
  const cards = [
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
    {
      title: "UI/UX დიზაინის კურსი",
      review: 9.8,
      studentsQuantity: 20,
      duration: 2,
    },
  ];

  const loadData = async () => {
    try {
      const res = await getCourses();

      console.log("ress", res);
    } catch (err) {
      console.log(err, "error while load courses");
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.sidebarContainer}></div>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>ჩვენი კურსები</div>
            <div className={styles.searchContainer}>
              <SearchInput />
            </div>
          </div>
          <div className={styles.content}>
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                review={card.review}
                studentsQuantity={card.studentsQuantity}
                duration={card.duration}
                bordered={true}
              />
            ))}
          </div>

          <div className={styles.paginationContainer}>
            <Pagination
              totalItems={100}
              pageSize={10}
              currentPage={1}
              pathPrefix="/courses"
              onPageChange={(page, url) => {
                // getCourses();
                // Fetch data or update state
                console.log(url);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
