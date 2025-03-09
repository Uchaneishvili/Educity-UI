import { Card } from '../../components/UI/Card/Card';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import styles from './Courses.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useEffect, useState, useCallback } from 'react';
import { getCourses } from '../../services/courses.service';
import { getCategories } from '../../services/categories.service';
import CategoriesList from './components/Categories/CategoriesList';
import Reviews from './components/Reviews/Reviews';
import { Loader } from '../../components/UI/Loader/Loader';
import { getWishlist } from '../../services/wishlist.service';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocation } from 'react-router-dom';
import Sorting from '../../components/UI/Sorting/Sorting';
import { CloseIcon } from '../../components/UI/icons';
import { Button } from '../../components/UI/Button/Button';
import { useAuth } from '../../context/AuthContext';

export function Courses() {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 10;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const [coursesLoading, setCoursesLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState({
    sortBy: '',
    value: '',
  });

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (location.state?.category && categories.length > 0) {
      // Find the category ID that matches the title from the state
      const categoryFromState = categories.find(
        cat => cat.name === location.state.category,
      );

      if (categoryFromState) {
        console.log('***', categoryFromState);
        setSelectedCategories([categoryFromState._id]);
      }
    }
  }, [location.state, categories]);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsFilterOpen(false);
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      isFilterOpen
        ? (document.documentElement.style.overflow = 'hidden')
        : (document.documentElement.style.overflow = 'auto');
    }
  }, [isFilterOpen]);

  const loadData = useCallback(
    async (page = 1) => {
      try {
        setCoursesLoading(true);

        const query = {
          page,
          pageSize,
          filters: {
            avgRating: selectedReviews,
            categoryId: selectedCategories,
            courseType: selectedFilter,
          },
          customSearch: searchQuery ? { search: searchQuery } : undefined,
          sortBy: selectedSort.sortBy,
          sortOrder: selectedSort.value,
        };

        const response = await getCourses(query);

        setCourses(response.data.data.courses);
        setTotalItems(response.data.data.totalCount);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setCoursesLoading(false);
      }
    },
    [
      selectedCategories,
      pageSize,
      selectedReviews,
      searchQuery,
      selectedFilter,
      selectedSort,
    ],
  );
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const categoriesRes = await getCategories();
        setCategories(categoriesRes.data.data.categories);
      } catch (err) {
        console.error(err, 'error while loading categories');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    loadData(currentPage);
  }, [
    selectedCategories,
    selectedReviews,
    currentPage,
    searchQuery,
    selectedSort,
    loadData,
  ]);

  const getWishlistData = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await getWishlist();
      setWishlist(response.data);
    } catch (err) {
      console.error(err, 'error while getting wishlist');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getWishlistData();
  }, [getWishlistData]);

  const handleCategoryChange = categories => {
    setSelectedCategories(categories);
  };

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
  };

  const handleReviewChange = reviews => {
    setSelectedReviews(reviews);
    setCurrentPage(1);
  };

  const debouncedSearch = useDebounce(value => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handleSearch = value => {
    debouncedSearch(value);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  const data = [
    {
      name: 'აუდიტორიული',
      _id: 'on-site',
    },
    {
      name: 'ონლაინი',
      _id: 'online',
    },
    {
      name: 'შერეული ფორმატი',
      _id: 'hybrid',
    },
    {
      name: 'ვიდეო ლექცია',
      _id: 'videoLecture',
    },
  ];

  const sortingOptions = [
    {
      label: 'სორტირება',
      value: '',
    },
    {
      label: 'ფასი ზრდადობით',
      sortBy: 'price',
      value: 'asc',
    },
    {
      label: 'ფასი კლებადობით',
      sortBy: 'price',
      value: 'desc',
    },
  ];

  const handleSortChange = option => {
    setSelectedSort(option);
    setCurrentPage(1);
  };
  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div
          className={styles.sidebarContainer}
          style={{ display: isFilterOpen ? 'block' : 'none' }}
        >
          <div className={styles.filterHeaderContainer}>
            <div className={styles.filterHeaderTitle}>ფილტრაცია</div>
            <div className={styles.filterHeaderButtons}>
              <div className={styles.filterHeaderResetAll}>Reset all</div>
              <div
                className={styles.filterHeaderCloseBtn}
                onClick={() => setIsFilterOpen(false)}
              >
                <CloseIcon />
              </div>
            </div>
          </div>
          <div className={styles.filterContainer}>
            <div className={styles.filterTitle}>მეცადინეობის ტიპი</div>
            <CategoriesList
              data={data}
              onCategoryChange={handleFilterChange}
              initialSelected={selectedFilter}
            />
            <div className={styles.filterTitle}>კატეგორიები</div>
            <CategoriesList
              data={categories}
              onCategoryChange={handleCategoryChange}
              initialSelected={selectedCategories}
            />

            <Reviews onReviewChange={handleReviewChange} />
          </div>
          <div className={styles.filterButtonContainer}>
            <Button
              type="primary"
              width="100%"
              onClick={() => setIsFilterOpen(false)}
            >
              გაფილტვრა
            </Button>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>ჩვენი კურსები</div>
            <div className={styles.headerSortContainer}>
              <div className={styles.searchContainer}>
                <SearchInput
                  onChange={handleSearch}
                  setIsFilterOpen={setIsFilterOpen}
                />
              </div>
              <div className={styles.sortContainer}>
                <Sorting
                  options={sortingOptions}
                  onSortChange={handleSortChange}
                  defaultOption={sortingOptions[0]}
                />
              </div>
            </div>
          </div>
          {coursesLoading ? (
            <div className={styles.loaderContent}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles.content}>
                {courses.map((course, index) => (
                  <Card
                    id={course._id}
                    key={course._id || index}
                    bordered={true}
                    thumbnail={course.thumbnail}
                    title={course.title}
                    totalDuration={course.totalDuration}
                    enrolledStudentsQuantity={course.enrollmentsCount}
                    totalReviews={course.averageRating}
                    price={course.price}
                    showWishlist={true}
                    isInWishlist={wishlist.some(
                      item => item._id === course._id,
                    )}
                    discountedPrice={course.discountedPrice}
                  />
                ))}
              </div>

              <div className={styles.paginationContainer}>
                {totalItems > pageSize && (
                  <Pagination
                    totalItems={totalItems}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    pathPrefix="/courses"
                    onPageChange={page => {
                      setCurrentPage(page);
                      loadData(page);
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
