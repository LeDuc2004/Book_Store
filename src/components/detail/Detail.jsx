import './detail.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Star from '../rate/Rate';
import { Rate } from 'antd';
import { getData, putData } from '../../services';

function Detail() {
  const [item, setItem] = useState('');
  const [starr, setStarr] = useState(0);
  const [sostar, setSostar] = useState(0);
  const [starr1, setStar1] = useState(0);
  const [starr2, setStar2] = useState(0);
  const [starr3, setStar3] = useState(0);
  const [starr4, setStar4] = useState(0);
  const [starr5, setStar5] = useState(0);
  const [param, setParam] = useState(0);
  const [param1, setParam1] = useState(0);
  const [togle, setTogle] = useState(true);
  const [iduser, setIduser] = useState('');

  let { id } = useParams();
  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: 'GET',
      headers: {
        authorization: `Beaer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setIduser(data.user.id));
  }, []);
  useEffect(() => {
    setParam(id);

    getData(`http://localhost:3000/database/${id}`).then((data) => {
      getStar(data);
    });
    function getStar(data) {
      let number = 0;
      let numbervote = 0;
      let totalvote = 0;
      let star1 = 0;
      let star2 = 0;
      let star3 = 0;
      let star4 = 0;
      let star5 = 0;
      for (let i = 1; i < data.vote.length; i++) {
        totalvote = data.vote[i] + totalvote;
      }

      for (let i = 1; i < data.vote.length; i++) {
        if (totalvote == 0) {
          break;
        }
        if (i == 1) {
          star1 = (data.vote[i] / totalvote) * 100;
          numbervote = numbervote + data.vote[i];
          number = number + i * data.vote[i];
        }
        if (i == 2) {
          star2 = (data.vote[i] / totalvote) * 100;

          numbervote = numbervote + data.vote[i];

          number = number + i * data.vote[i];
        }
        if (i == 3) {
          star3 = (data.vote[i] / totalvote) * 100;

          numbervote = numbervote + data.vote[i];

          number = number + i * data.vote[i];
        }
        if (i == 4) {
          star4 = (data.vote[i] / totalvote) * 100;

          numbervote = numbervote + data.vote[i];

          number = number + i * data.vote[i];
        }
        if (i == 5) {
          star5 = (data.vote[i] / totalvote) * 100;

          numbervote = numbervote + data.vote[i];

          number = number + i * data.vote[i];
        }
      }

      let lamtron = (number) => {
        if (number > 1 && number <= 1.5) {
          return 1.5;
        } else if (number > 1.5 && number < 2) {
          return 2;
        } else {
          return Math.round(number); // Làm tròn số theo quy tắc mặc định
        }
      };
      let lamtron1 = (number) => {
        return Number(number.toFixed(1));
      };
      setStar1(star1);
      setStar2(star2);
      setStar3(star3);
      setStar4(star4);
      setStar5(star5);

      setItem(data);
      setStarr(number / numbervote);
      setSostar(lamtron1(numbervote == 0 ? 0 : number / numbervote));
      let data1 = {
        ...data,
        star: number / numbervote,
      };
      putData(`http://localhost:3000/database/${id}`, data1);
    }
  }, [togle]);
  function choose(star) {
    setParam1(star);
  }
  function comfirm() {
    let star = param1;
    getData(`http://localhost:3000/database/${id}`).then((data) => {
      let arr = data.vote.slice();
      arr[star] = Number(arr[star]) + 1;
      let arrvoted = data.voted.slice();
      arrvoted.push(iduser);
      let data1 = {
        ...data,
        vote: arr,
        voted: arrvoted,
      };
      putData(`http://localhost:3000/database/${id}`, data1).then((res) => setTogle(!togle));
    });
  }
  return (
    <>
      {item == '' ? (
        ''
      ) : (
        <>
          <div className="detail">
            <div className="detail__left">
              <div className="detail__img">
                <img src={item.img} alt="" />
              </div>
            </div>

            <div className="detail__right">
              <div className="detail__name">{item.name}</div>

              <div className="detail__text">{item.description}</div>
              <div className="detail__star">
                <Star className="star-custom-75" star={sostar} disabled={true}></Star>
              </div>
              <div className="detail__btn">
                <div className="detail__borrow btn">
                  <i className="fa-solid fa-credit-card"></i>Mượn Sách
                </div>
                <div className="detail__favorate btn">
                  <i className="fa-regular fa-bookmark"></i>Thêm vào yêu thích
                </div>
              </div>
            </div>
          </div>
          <div className="vote">
            <div className="vote__left">
              <div className="vote__number">{sostar}</div>
              <div className="vote__star">
                <Star star={sostar} disabled={true}></Star>
              </div>
            </div>
            <div className="vote__right">
              <div className="vote__baoresult">
                <div className="numberstar">5</div>
                <div style={{ width: `${starr5}%` }} className="vote__result"></div>
              </div>
              <div className="vote__baoresult">
                <div className="numberstar">4</div>
                <div style={{ width: `${starr4}%` }} className="vote__result"></div>
              </div>
              <div className="vote__baoresult">
                <div className="numberstar">3</div>
                <div style={{ width: `${starr3}%` }} className="vote__result"></div>
              </div>
              <div className="vote__baoresult">
                <div className="numberstar">2</div>
                <div style={{ width: `${starr2}%` }} className="vote__result"></div>
              </div>
              <div className="vote__baoresult">
                <div className="numberstar">1</div>
                <div style={{ width: `${starr1}%` }} className="vote__result"></div>
              </div>
            </div>
          </div>
          <div className="xephang">Xếp hạng sách này</div>
          <div className="xephang1">Cho chúng tôi biết suy nghĩ của bạn.</div>
          {item.voted.includes(iduser) ? (
            <div className="votereal" >Bạn đã đánh giá</div>
          ) : (
            <div className="votereal">
              <Rate onChange={(e) => choose(e)} />
              <div onClick={() => comfirm()} className="detail__borrow btn">
                Đánh giá
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Detail;
