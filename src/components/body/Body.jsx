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

function Body() {
  const [scroll, setScroll] = useState(false);
  const [list, SetList] = useState('');
  const [loading, SetLoading] = useState('');
  const [item, setItem] = useState('');
  const [iduser, setIduser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoreTodos(list.length));
    dispatch(fetchDatabase());
  }, []);

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

  const ScrollMore = useEffect(() => {
    if (scroll == true) {
      if (loading != 'stop') {
        SetLoading(true);
      }

      dispatch(fetchMoreTodos(list[list.length - 1].id));
    }
  }, [scroll]);

  HandleScroll(setScroll);

  let listBook = useSelector((state) => state.listSp);
  useEffect(() => {
    SetList(listBook.datasp);
    setScroll(false);
    if (loading != 'stop') {
      SetLoading(false);
    }
    if (listBook.status == 'stop') {
      SetLoading('stop');
    }
  }, [listBook.datasp]);

  let listSearch = useSelector((state) => {
    const product = state.listSp.datasp.filter((item) => {
      return item.name.toLowerCase().replace(/\s/g, '').includes(state.listSp.search.replace(/\s/g, ''));
    });
    return product;
  });

  function borrow(item) {
    setItem(item);
  }
  function handleFavorite(item) {
    getData(`http://localhost:3000/users/${iduser}`).then((data) => addtym(data));
    function addtym(data) {
      let newitem = { ...item };
      data.tym.push(newitem);

      // putData(`http://localhost:3000/users/${iduser}`, data);
      // putData(`http://localhost:3000/database/${item.id}`, newitem);
    }
  }
  return (
    <>
      <Slide></Slide>

      <Calander item={item} setitem={setItem}></Calander>
      <div className="list-sp no">
        {listSearch.length > 0
          ? listSearch.map((item, index) => {
              return (
                <>
                  <div key={item.id} className="list-sp__sun">
                    <div style={item.hanmuon != '' ? {} : { display: 'none' }}>
                      <Flag></Flag>
                    </div>
                    <div onClick={() => handleFavorite(item)} className="tym">
                      <i className="fa-solid fa-heart"></i>
                    </div>

                    <a href={`http://localhost:3001/detail/${item.id}`} className="sun-img">
                      <img src={item.img} alt="" />
                    </a>
                    <div className="sun-name">{item.name}</div>
                    <div className="sun-price"></div>
                    <Star star={item.star} disabled={true}></Star>

                    <div className="btn-sp">
                      {item.hanmuon == '' ? (
                        <div onClick={() => borrow(item)} className="btn-detail">
                          Mượn sách
                        </div>
                      ) : (
                        <div>Hạn trả sách: {item.hanmuon}</div>
                      )}
                    </div>
                  </div>
                </>
              );
            })
          : ''}
        <div style={loading == 'stop' ? { display: 'none' } : { display: '' }} className="baonha">
          <div className="loadingio-spinner-dual-ring-jkhbsdgkl3m">
            <div className="ldio-gcx0fsyeir9">
              <div></div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={loading == 'stop' ? { display: '' } : { display: 'none' }}>
      </div>

      <Footsell></Footsell>
    </>
  );
}

export default Body;
