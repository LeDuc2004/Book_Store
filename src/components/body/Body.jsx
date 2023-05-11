import './_body.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { bodySlide, fetchDatabase, fetchMoreTodos, fetchTodos } from './bodySlide';
import dayjs from 'dayjs';
import { HandleScroll } from '../../handleScroll/HandleScroll';
import Footsell from '../footer/Footsell';
import { getData, postData } from '../../services';

function Body() {
  const [scroll, setScroll] = useState(false);
  const [list, SetList] = useState('');
  const [loading, SetLoading] = useState('');
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchMoreTodos(list.length));
  }, []);

  const ScrollMore = useEffect(() => {
    if (scroll == true) {
      if (loading != 'stop') {
        SetLoading(true);
      }
      setTimeout(() => {
        dispatch(fetchMoreTodos(list[list.length - 1].id));
      }, 1000);
    }
  }, [scroll]);

  HandleScroll(setScroll);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchDatabase())
  }, []);
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
    const products = state.listSp.datasp
    const product = state.listSp.datasp.filter((item) => {
      if (item.status != false) {
        return item.name.toLowerCase().replace(/\s/g, '').includes(state.listSp.search.replace(/\s/g, ''));
      }
    });
    return product;
  });

  function borrow(item) {
  if (localStorage.getItem("token") != "null") {
    
    let days = prompt('Số ngày mượn');
    const countdownDate = dayjs().add(days, 'day').toDate().getTime();
    dispatch(
      bodySlide.actions.status({
        id: item.id,
      }),
    );
    dispatch(
      bodySlide.actions.status1({
        id: item.id,
      })
    )
    dispatch(fetchMoreTodos(list[list.length - 1].id));
    let obj = {
      ...item,
      days: countdownDate,
    };
    postData('http://localhost:5000/borrow', { obj }, `Beaer ${localStorage.getItem('token')}`);
  }else{
    alert("vui lòng đăng nhập")
  }

  }

  return (
    <>
      <div className="list-sp no">
        {listSearch.length > 0
          ? listSearch.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price"></div>
                  <div className="btn-sp">
                    <div onClick={() => borrow(item)} className="btn-detail">
                      Mượn sách
                    </div>
                  </div>
                </div>
              );
            })
          : ''}
      </div>
      <div className="list-sp">
        {list != "" && listSearch.length == 0
          ? list.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price">130$</div>
                  <div className="btn-sp">
                    <div onClick={() => borrow(item)} className="btn-detail">
                      Mượn sách
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div style={loading == true ? { display: '' } : { display: 'none' }} className="loading">
        Loading.....
      </div>
      <div style={loading == 'stop' ? { display: '' } : { display: 'none' }}>
        <Footsell></Footsell>
      </div>
    </>
  );
}

export default Body;
