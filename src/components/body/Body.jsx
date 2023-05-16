import './_body.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { bodySlide, fetchDatabase, fetchMoreTodos, fetchTodos } from './bodySlide';
import dayjs from 'dayjs';
import { HandleScroll } from '../../handleScroll/HandleScroll';
import Footsell from '../footer/Footsell';
import { getData, postData } from '../../services';
import Star from '../rate/Rate';
import Calander from '../calander/Calander';

function Body() {
  const [scroll, setScroll] = useState(false);
  const [list, SetList] = useState('');
  const [loading, SetLoading] = useState('');
  const [item, setItem] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoreTodos(list.length));
    dispatch(fetchDatabase());
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
  console.log(listSearch);
  return (
    <>
      <Calander item={item} setitem={setItem}></Calander>
      <div className="list-sp no">
        {listSearch.length > 0
          ? listSearch.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <a href={`http://localhost:3001/detail/${item.id}`} className="sun-img">
                    <img src={item.img} alt="" />
                  </a>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price"></div>
                  <Star star={item.star} disabled={true}></Star>

                  <div className="btn-sp">
                    {item.hanmuon == "" ?                     <div onClick={() => borrow(item)} className="btn-detail">
                      Mượn sách
                    </div>:<div>{item.hanmuon}</div>}

                  </div>
                </div>
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
        <Footsell></Footsell>
      </div>
    </>
  );
}

export default Body;
