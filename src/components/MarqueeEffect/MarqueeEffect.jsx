import React, { useEffect, useState, useRef, useMemo } from 'react';
import styles from './MarqueeEffect.module.css';

const MarqueeEffect = ({ children, speed = 40, shouldAnimate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const displayChildren = useMemo(
    () => [...childrenArray, ...childrenArray],
    [childrenArray],
  );

  const calculateTotalWidth = useMemo(
    () => () => {
      if (contentRef.current) {
        const childElements = contentRef.current.children;
        let width = 0;

        Array.from(childElements).forEach(child => {
          const childWidth = child.scrollWidth;
          const computedStyle = window.getComputedStyle(child);
          const marginLeft = parseInt(computedStyle.marginLeft);
          const marginRight = parseInt(computedStyle.marginRight);

          width += childWidth + marginLeft + marginRight;
        });

        return width;
      }
      return 0;
    },
    [],
  );

  useEffect(() => {
    setIsVisible(false);

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);

      setTimeout(() => {
        const width = calculateTotalWidth();
        setTotalWidth(width);
        setIsVisible(true);
      }, 50);
    };

    const timer = setTimeout(handleResize, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldAnimate, calculateTotalWidth]);

  if (!shouldAnimate) {
    return children;
  }

  const mobileSpeedFactor = isMobile ? 0.1 : 1; // 30% faster on  mobile
  const calculatedSpeed = totalWidth
    ? Math.max(totalWidth / 50, speed) * mobileSpeedFactor
    : speed;

  return (
    <div className={styles.marqueeContainer}>
      <div
        ref={contentRef}
        className={`${styles.marqueeContent} ${
          isVisible ? styles.animate : ''
        }`}
        style={{
          '--scroll-speed': `${calculatedSpeed}s`,
          '--content-width': `${totalWidth}px`,
        }}
      >
        {displayChildren}
        {displayChildren}x
      </div>
    </div>
  );
};

export default React.memo(MarqueeEffect);
