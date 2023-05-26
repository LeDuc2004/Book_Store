import React, { useEffect, useState, useRef } from 'react';
import './slide.scss';

function Slide() {
  let arr = [
    {
      id: 100,
      sliderBackground: '/slider/26562_Gateway_Quote_A4_05-15.jpg',
      img: '/kids/kids (70).jpg',
    },
    {
      id: 111,

      sliderBackground: '/slider/26562_Gateway_Quote_A2_05-15.jpg',
      img: '/kids/kids (69).jpg',
    },
    {
      id: 211,

      sliderBackground: '/slider/26562_Gateway_Quote_A3_05-15.jpg',
      img: '/kids/kids (70).jpg',
    },
    {
      id: 1111,

      sliderBackground: '/slider/26562_Gateway_Quote_A1_05-15.jpg',
      img: '/kids/kids (67).jpg',
    },
  ];
  const [data, setData] = useState(arr);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [togle, setTogle] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startOffset, setStartOffset] = useState(0);
  const [tive, setTive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleRight(true);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  function handleMouseDown(event) {
    setIsDragging(true);
    setStartOffset(event.clientX);
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const deltaX = (event.clientX - startOffset) * -1;
      if (deltaX > 0) {
        handleRight();
      } else if (deltaX < 0) {
        handleLeft();
      }
      setIsDragging(false);
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleLeft() {
    if (togle) {
      let lists = document.querySelectorAll('.item');
      document.getElementById('slider').prepend(lists[lists.length - 1]);
      if (tive == 0) {
        setTive(arr.length - 1);
      } else if (tive < 0) {
        setTive(arr.length - 2);
      } else {
        setTive(tive - 1);
      }
      setCurrentIdx(currentIdx + 1);
      setTogle(false);
      setTimeout(() => {
        setTogle(true);
      }, 400);
    }
  }

  function handleRight(boolen) {
    if (boolen == true) {
      let lists = document.querySelectorAll('.item');
      document.getElementById('slider').appendChild(lists[0]);
      if (tive > arr.length - 2) {
        setTive(0);
      } else {
        setTive(tive + 1);
      }
      setCurrentIdx(currentIdx + 1);
      setTogle(false);
      setTimeout(() => {
        setTogle(true);
      }, 400);
    } else if (togle) {
      let lists = document.querySelectorAll('.item');
      document.getElementById('slider').appendChild(lists[0]);

      if (tive > arr.length - 2) {
        setTive(0);
      } else {
        setTive(tive + 1);
      }
      setCurrentIdx(currentIdx + 1);
      setTogle(false);
      setTimeout(() => {
        setTogle(true);
      }, 400);
    }
  }

  function handleactive(id) {
    let local = tive - id;
    if (local < 0) {
      for (let i = 0; i < -local; i++) {
        handleRight();
      }
    }
    if (local > 0) {
      for (let i = 0; i < local; i++) {
        handleLeft();
      }
    }
    setTive(id);
  }

  return (
    <>
      <div
        key={1}
        id="slide-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div onClick={() => handleLeft()} className="slide-btn left">
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        <div onClick={() => handleRight()} className="slide-btn right">
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div id="slider">
          {data.map((item, index) => {
            return (
              <a href={`http://localhost:3001/detail/${index}`} key={item.id} className="item">
                <img src={item.sliderBackground} alt="" />
              </a>
            );
          })}
        </div>
        <ul className="dots">
          {arr.map((item, index) => {
            return (
              
                <li key={item.id} onClick={() => handleactive(index)} className={index == tive ? 'active' : ''}></li>
              
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default React.memo(Slide);
