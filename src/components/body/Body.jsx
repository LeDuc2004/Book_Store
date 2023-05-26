import './_body.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { bodySlide, fetchDatabase, fetchMoreTodos, fetchTodos } from './bodySlide';
import dayjs from 'dayjs';
import { HandleScroll } from '../../hooks/handleScroll/HandleScroll';
import Footsell from '../common/footer/Footsell';
import { getData, postData, putData } from '../../services';
import Star from '../common/rate/Rate';
import Calander from '../calander/Calander';
import Confirm from '../confirm/Confirm';
import Flag from '../flag/Flag';
import Slide from '../slideShow/Slide';
import { Empty } from 'antd';
import { productRemain } from '../catalog/selector';

function Body() {
  const [scroll, setScroll] = useState(false);
  const [list, SetList] = useState('');
  const [loading, SetLoading] = useState('');
  const [item, setItem] = useState('');
  const [iduser, setIduser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Beaer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIduser(data.user.id);
        });
    }
  }, []);
  // useEffect(() => {
  //   dispatch(fetchMoreTodos(list.length));
  //   dispatch(fetchDatabase());
  // }, []);


  // const ScrollMore = useEffect(() => {
  //   if (scroll == true) {
  //     if (loading != 'stop') {
  //       SetLoading(true);
  //     }

  //     dispatch(fetchMoreTodos(list[list.length - 1].id));
  //   }
  // }, [scroll]);

  // HandleScroll(setScroll);

  // let listBook = useSelector((state) => state.listSp);
  // useEffect(() => {
  //   SetList(listBook.datasp);
  //   setScroll(false);
  //   if (loading != 'stop') {
  //     SetLoading(false);
  //   }
  //   if (listBook.status == 'stop') {
  //     SetLoading('stop');
  //   }
  // }, [listBook.datasp]);

  let listSearch = useSelector(productRemain);


  // function borrow(item) {
  //   setItem(item);
  // }
  function addlike(item) {
    console.log(1);
    if (item.tym.includes(iduser)) {
      getData(`http://localhost:3000/database/${item.id}`).then((data) => addtym1(data));
      function addtym1(data) {
        let obj = { ...data };
        obj.tym = data.tym.filter((item) => item != iduser);
        dispatch(bodySlide.actions.updatetymsp1({ id: item.id, iduser }));
        putData(`http://localhost:3000/database/${item.id}`, obj).then((res) =>
          dispatch(bodySlide.actions.updatetymsp1({ id: item.id, iduser }))
          
        );
      }
      getData(`http://localhost:3000/users/${iduser}`).then((data) => addtym(data))
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
        putData(`http://localhost:3000/database/${item.id}`, obj).then((res) =>
          dispatch(bodySlide.actions.updatetymsp({ id: item.id, iduser })),
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
    <>
      <div className="list-sp no">
        {listSearch.length > 0
          ? listSearch.map((item, index) => {
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
            })
          : <Empty></Empty>}
        {/* <div style={loading == 'stop' ? { display: 'none' } : { display: '' }} className="baonha">
          <div className="loadingio-spinner-dual-ring-jkhbsdgkl3m">
            <div className="ldio-gcx0fsyeir9">
              <div></div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Body;
