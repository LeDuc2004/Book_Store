import '../body/_body.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { fetchDatabase, fetchMoreTodos } from '../body/bodySlide';
import dayjs from 'dayjs';
import { HandleScroll } from '../../hooks/handleScroll/HandleScroll';
import Footsell from '../common/footer/Footsell';
import { getData, postData } from '../../services';
import Star from '../common/rate/Rate';
import Calander from '../calander/Calander';

function Search() {
  const [list, SetList] = useState('');
  const [item, setItem] = useState('');
  const dispatch = useDispatch();
  



  let listSearch = useSelector((state) => {
      const product = state.listSp.searcharr.filter((item) => {

      return item
    });
    return product;
  });
  function borrow(item) {
    setItem(item);
  }
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
                    {item.hanmuon == '' ? (
                      <div onClick={() => borrow(item)} className="btn-detail">
                        Mượn sách
                      </div>
                    ) : (
                      <div>{item.hanmuon}</div>
                    )}
                  </div>
                </div>
              );
            })
          : ''}
      </div>
      <Footsell></Footsell>
    </>
  );
}

export default Search;
