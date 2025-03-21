import React, { useEffect, useState, useRef } from 'react';
import styles from './MarqueeEffect.module.css';

const MarqueeEffect = ({ children, speed = 40, shouldAnimate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    setIsVisible(false);

    const calculateTotalWidth = () => {
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
    };

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);

      // Wait for the DOM to update with the children
      setTimeout(() => {
        const width = calculateTotalWidth();
        setTotalWidth(width);
        setIsVisible(true);
      }, 50);
    };

    // Initial calculation
    const timer = setTimeout(handleResize, 100);

    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldAnimate, children, childrenArray.length]);

  if (!shouldAnimate) {
    return children;
  }

  const mobileSpeedFactor = isMobile ? 0.1 : 1; // 30% faster on mobile
  const calculatedSpeed = totalWidth
    ? Math.max(totalWidth / 35, speed) * mobileSpeedFactor
    : speed;

  const displayChildren = [...childrenArray, ...childrenArray];

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
      </div>
    </div>
  );
};

export default MarqueeEffect;
