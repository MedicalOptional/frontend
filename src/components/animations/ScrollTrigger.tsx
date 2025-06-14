import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollTriggerProps {
  children: React.ReactNode;
  resetOnScroll?: boolean;
}

const ScrollTrigger: React.FC<ScrollTriggerProps> = ({ children, resetOnScroll = true }) => {
  const [ref, inView, entry] = useInView({
    threshold: 0.1,
    triggerOnce: !resetOnScroll,
  });

  useEffect(() => {
    if (entry?.target && resetOnScroll) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(entry.target);

      return () => {
        observer.disconnect();
      };
    }
  }, [entry, resetOnScroll]);

  return (
    <div ref={ref} className={`scroll-trigger ${inView ? 'animate' : ''}`}>
      {children}
    </div>
  );
};

export default ScrollTrigger;