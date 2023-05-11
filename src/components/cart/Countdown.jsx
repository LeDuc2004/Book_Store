import './countdown.scss';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { cartSlide } from './cartSlide';
import { getData, postData, putData } from '../../services';

function Countdown({ ngay, id }) {
  const [timerD, setTimerD] = useState('00');
  const [timerH, setTimerH] = useState('00');
  const [timerM, setTimerM] = useState('00');
  const [timerS, setTimerS] = useState('00');
  const dispatch = useDispatch();
  function returnBooks(id) {
    postData(`http://localhost:5000/updateCart/${id}`, { id: 0 }, `Beaer ${localStorage.getItem('token')}`);
    getData(`http://localhost:3000/database/${id}`).then(data => updateStatus(data));
    function updateStatus(data) {
      data.status = true;
      putData(`http://localhost:3000/database/${id}`, data, 'levanduc');
    }
    dispatch(
      cartSlide.actions.deleteCart({
        id: id,
      }),
    );
  }

  let interval = useRef();
  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = ngay - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerD(days);
        setTimerH(hours);
        setTimerM(minutes);
        setTimerS(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      <div className="count-down">
        <div className="count-down__khung">
          <div className="count-down__hours">{timerD}</div>
          <div className="count-down__text">Days</div>
        </div>
        <div className="count-down__khung">
          <div className="count-down__hours">{timerH}</div>
          <div className="count-down__text">Hrs</div>
        </div>
        <div className="count-down__khung">
          <div className="count-down__hours">{timerM}</div>
          <div className="count-down__text">Min</div>
        </div>
        <div className="count-down__khung">
          <div className="count-down__hours">{timerS}</div>
          <div className="count-down__text">Sec</div>
        </div>
      </div>
      <div className="btn-sp">
        <div className="btn-add" onClick={() => returnBooks(id)}>
          Trả sách
        </div>
      </div>
    </>
  );
}

export default Countdown;
