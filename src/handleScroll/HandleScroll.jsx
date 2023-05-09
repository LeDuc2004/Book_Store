import { useEffect } from 'react';

export function HandleScroll(setScroll) {
  useEffect(() => {
    function handleScroll() {
        const scrollY = window.scrollY;
        const visibleHeight = window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomThreshold = pageHeight - visibleHeight;
      if (scrollY+1 >= bottomThreshold) {
        setScroll(true)
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScroll]);
}



