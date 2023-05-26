import './manga.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flag from '../flag/Flag';
import { getData, putData } from '../../services';
import { bodySlide } from '../body/bodySlide';
import { ShowInfoToast } from '../../hooks/toast/Tost';
function Manga({ kids, text, iduser }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [togle, setTogle] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startOffset, setStartOffset] = useState(0);
  const [tive, setTive] = useState(0);
  const dispatch = useDispatch();

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
      let lists = document.querySelectorAll('.Product__item4');
      document.getElementById('slider4').prepend(lists[lists.length - 1]);
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
      let lists = document.querySelectorAll('.Product__item4');
      document.getElementById('slider4').appendChild(lists[0]);
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
      let lists = document.querySelectorAll('.Product__item4');
      document.getElementById('slider4').appendChild(lists[0]);

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

  const [arr, setArr] = useState([4, 5, 6]);
  const [arr0, setArr0] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);

  useEffect(() => {
    let arr0 = [];
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    for (let i = 0; i < kids.length; i++) {
      if (i < 7) {
        arr0.push(kids[i]);
      } else if (i >= 7 && i < 14) {
        arr1.push(kids[i]);
      } else if (i >= 14 && i < 21) {
        arr2.push(kids[i]);
      } else if (i >= 21 && i < 28) {
        arr3.push(kids[i]);
      }
    }
    setArr0(arr0);
    setArr1(arr1);
    setArr2(arr2);
    setArr3(arr3);
  }, [kids]);
  function addlike(item) {
    if (item.tym.includes(iduser)) {
      getData(`http://localhost:3000/database/${item.id}`).then((data) => addtym1(data));
      function addtym1(data) {
        let obj = { ...data };
        obj.tym = data.tym.filter((item) => item != iduser);
        dispatch(bodySlide.actions.updatetym1({ id: item.id, iduser }));
        putData(`http://localhost:3000/database/${item.id}`, obj).then((res) =>
          dispatch(bodySlide.actions.updatetym1({ id: item.id, iduser })),
        );
      }
      getData(`http://localhost:3000/users/${iduser}`).then((data) => addtym(data));
      function addtym(data) {
        let obj = { ...data };

        obj.tym = data.tym.filter((item1) => item1.id != item.id);

        putData(`http://localhost:3000/users/${iduser}`, obj);
      }
    } else {
      getData(`http://localhost:3000/database/${item.id}`).then((data) => addtym1(data));
      function addtym1(data) {
        let obj = { ...data };
        obj.tym.push(iduser);
        console.log(obj);
        putData(`http://localhost:3000/database/${item.id}`, obj).then((res) =>
          dispatch(bodySlide.actions.updatetym({ id: item.id, iduser })),
        );
      }
      getData(`http://localhost:3000/users/${iduser}`).then((data) => addtym(data));
      function addtym(data) {
        let obj = { ...data };
        obj.tym.push(item);
        putData(`http://localhost:3000/users/${iduser}`, obj);
      }
    }
  }

  return (
    <div className="Product">
      <div className="Product__top">
        <div className="Product__text">{text}</div>
        <a href="" className="Product__seeall">
          See All
        </a>
      </div>

      <div
        className="Product__center"
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
        <div id="slider4">
          <div className="Product__item4">
            {arr1.map((item, index) => {
              return (
                <div className="item1" key={item.id}>
                  <div
                    style={item.tym.includes(iduser) ? { color: 'red' } : {}}
                    onClick={() => addlike(item)}
                    className="addhopy"
                  >
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <a href={`http://localhost:3001/detail/${item.id}`}>
                    <div style={item.hanmuon ? {} : { display: 'none' }}>
                      <Flag></Flag>
                    </div>
                    <img src={item.img} alt="" />
                    <p>{item.name}</p>
                    <div className="item1-text">
                      <div className="author">{item.author}</div>
                      <div className="authorstar">
                        {item.star ?? 0}

                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="Product__item4">
            {arr2.map((item, index) => {
              return (
                <div className="item1" key={item.id}>
                  <div
                    style={item.tym.includes(iduser) ? { color: 'red' } : {}}
                    onClick={() => addlike(item)}
                    className="addhopy"
                  >
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <a href={`http://localhost:3001/detail/${item.id}`}>
                    <div style={item.hanmuon ? {} : { display: 'none' }}>
                      <Flag></Flag>
                    </div>
                    <img src={item.img} alt="" />
                    <p>{item.name}</p>
                    <div className="item1-text">
                      <div className="author">{item.author}</div>
                      <div className="authorstar">
                        {item.star ?? 0}

                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="Product__item4">
            {arr0.map((item, index) => {
              return (
                <div className="item1" key={item.id}>
                  <div
                    style={item.tym.includes(iduser) ? { color: 'red' } : {}}
                    onClick={() => addlike(item)}
                    className="addhopy"
                  >
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <a href={`http://localhost:3001/detail/${item.id}`}>
                    <div style={item.hanmuon ? {} : { display: 'none' }}>
                      <Flag></Flag>
                    </div>
                    <img src={item.img} alt="" />
                    <p>{item.name}</p>
                    <div className="item1-text">
                      <div className="author">{item.author}</div>
                      <div className="authorstar">
                        {item.star ?? 0}

                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <ul className="dots">
          {arr.map((item, index) => {
            return <li key={item} onClick={() => handleactive(index)} className={index == tive ? 'active' : ''}></li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(Manga);
