import React, { useState, useEffect } from 'react';
import "./index.scss"
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Thêm một event listener để lắng nghe sự kiện cuộn trang
    window.addEventListener('scroll', handleScroll);

    // Xóa event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Kiểm tra vị trí cuộn của trang
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Nếu vị trí cuộn vượt quá một ngưỡng xác định, hiển thị nút cuộn lên
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Cuộn trang lên đầu khi nút được bấm
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up-from-bracket"></i>
    </div>
  );
};

export default ScrollToTopButton;
