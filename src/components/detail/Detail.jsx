import './detail.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Star from '../common/rate/Rate';
import { Rate } from 'antd';
import { getData, putData } from '../../services';
import Calander from '../calander/Calander';
import moment from 'moment';
import { ShowErrorToast, ShowInfoToast } from '../../hooks/toast/Tost';

function Detail() {
  const [item, setItem] = useState('');
  const [item1, setItem1] = useState('');
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
  const [nameuser, setNameuser] = useState('');
  const [commentuser, setCommentuser] = useState('');
  const [togleba, setTogleba] = useState([]);

  const currentDate = moment().format('DD-MM-YYYY');

  const [togletb, setTogletb] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    let arr = [];
    if (item.comment?.length > 0) {
      for (let i = 0; i < item.comment.length; i++) {
        arr.push(0);
      }
      setTogleba(arr);
    }
  }, [item]);
  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: 'GET',
      headers: {
        authorization: `Beaer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNameuser(data.user.name);
        setIduser(data.user.id);
      });
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
  function confirm() {
    if (param1 > 0) {
      let star = param1;
      let obj = {
        name: nameuser,
        id: iduser,
        comment: commentuser,
        star,
        date: currentDate,
      };
      getData(`http://localhost:3000/database/${id}`).then((data) => {
        let starold = data.comment.slice().find((item) => item.id == obj.id);
        let arr = data.vote.slice();
        if (starold) {
          arr[starold.star] = Number(arr[starold.star]) - 1;
        }
        arr[star] = Number(arr[star]) + 1;
        let arrvoted = data.voted.slice();
        if (arrvoted.includes(iduser)) {
        } else {
          arrvoted.push(iduser);
        }
        let arrcomment = data.comment.slice().filter((item) => item.id != obj.id);
        arrcomment.push(obj);
        let data1 = {
          ...data,
          vote: arr,
          voted: arrvoted,
          comment: arrcomment,
        };
        putData(`http://localhost:3000/database/${id}`, data1).then((res) => setTogle(!togle));
      });
    }
    setCommentuser('');
    setTogletb(false);
  }
  function tranleft() {
    setTogletb(true);
  }
  function borrow(item , hanmuon) {
    if (hanmuon) {
      ShowInfoToast("Sách đã có người mượn !")
    }else{
      
      setItem1(item);
    }
  }
  function togleOff() {
    setTogletb(false);
  }
  function bacham(id) {
    let newtg = togleba.slice();
    for (let i = 0; i < newtg.length; i++) {
      if (id == i && newtg[id] == 0) {
        newtg[id] = 1;
      } else if (id == i && newtg[id] == 1) {
        newtg[id] = 0;
      } else {
        newtg[i] = 0;
      }
    }

    setTogleba(newtg);
  }
  function deleteComment(idcm, comment) {
    getData(`http://localhost:3000/database/${id}`).then((data) => {
      let arr = data.vote.slice();
      arr[comment.star] = Number(arr[comment.star]) - 1;
      let arrvoted = data.voted.slice().filter((item) => item != comment.id);
      let arrcomment = data.comment.slice().filter((item, index) => index != idcm);
      let data1 = {
        ...data,
        vote: arr,
        voted: arrvoted,
        comment: arrcomment,
      };
      putData(`http://localhost:3000/database/${id}`, data1).then((res) => setTogle(!togle));
    });
    ShowErrorToast("Đã xóa thành công.")
  }
  return (
    <>
      {item == '' ? (
        ''
      ) : (
        <>
          {' '}
          <div className="tralate1">
            <div style={togletb == true ? { transform: 'translateX(0)' } : {}} className="tralate">
              <div
                onClick={() => togleOff()}
                style={togletb == true ? { opacity: '1' } : {}}
                className="tralate__wrap"
              ></div>
              <div
                className={togletb == true ? "tralate__tb trantb" : "tralate__tb"}
              >
                <div className="tralate__tb__left">
                  <div className="detail__img">
                    <img src={item.img} alt="" />
                  </div>
                </div>

                <div className="tralate__tb__right">
                  <div className="detail__name">{item.name}</div>

                  <div className="detail__text">{item.description}</div>
                  <div className="detail__star">
                    <Rate value={param1} onChange={(e) => choose(e)}></Rate>
                  </div>
                  <textarea
                    value={commentuser}
                    onChange={(e) => setCommentuser(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="1"
                    placeholder="Mô tả trải nghiệm của bạn (không bắt buộc)"
                  ></textarea>
                  <div className="detail__btn">
                    <button
                      onClick={() => confirm()}
                      style={param1 > 0 ? {} : { opacity: '0.5' }}
                      className="detail__borrow btn"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Calander item={item1} setitem={setItem1} setTogle1={setTogle} togle1={togle}></Calander>
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
                <div style={item.hanmuon ? {opacity:"0.5"} :{}}  onClick={() => borrow(item , item.hanmuon)} className="detail__borrow btn">
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
          <div className="comment">Bài đánh giá</div>
          <div className="comment__list">
            {item.comment.length > 0 ? (
              item.comment.map((comment, indexc) => {
                return (
                  <div key={comment.id}>
                    <div className="comment__sun">
                      <div className="comment__arow1">
                        <div>
                          <i className="fa-solid fa-circle-user"></i>
                          <div>{comment.name}</div>
                        </div>

                        <i onClick={() => bacham(indexc)} className="fa-solid fa-ellipsis-vertical">
                          {comment.id == iduser ? (
                            <div
                              onClick={() => deleteComment(indexc, comment)}
                              style={togleba[indexc] == 1 ? {} : { display: 'none' }}
                            >
                              Xóa bài
                            </div>
                          ) : (
                            <div
                              onClick={() => ShowInfoToast('Đã phản hồi cho Admin')}
                              style={togleba[indexc] == 1 ? {} : { display: 'none' }}
                            >
                              Báo cáo
                            </div>
                          )}
                        </i>
                      </div>
                      <div className="comment__arow2">
                        <Star star={comment.star} disabled={true}></Star>
                        <div>{comment.date}</div>
                      </div>
                      <div className="comment__arow3">{comment.comment}</div>
                    </div>
                    <div
                      onClick={() => setTogletb(true)}
                      style={comment.id == iduser ? {} : { display: 'none' }}
                      className="updatecomment"
                    >
                      Chỉnh sửa bài viết
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Chưa có bài đánh giá nào !</div>
            )}
          </div>
          <div className="xephang">Xếp hạng sách này</div>
          <div className="xephang1">Cho chúng tôi biết suy nghĩ của bạn.</div>
          {item.voted.includes(iduser) ? (
            <div className="votereal">Bạn đã đánh giá</div>
          ) : (
            <div onClick={() => tranleft()} className="votereal">
              <Rate value={param1} onChange={(e) => choose(e)} />
              <div onClick={() => tranleft()} className="detail__borrow btn">
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
