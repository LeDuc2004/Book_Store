import React from 'react';
import './flag.scss'; // Import file CSS cho component Book

const Flag = () => {
  return (
    <>
      <div className="flag">Đã mượn</div>
      <div className="book-details">
        {/* Hiển thị thông tin khác về quyển sách */}
      </div>
    </>
  );
};

export default Flag;
