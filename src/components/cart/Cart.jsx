import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCarts } from './cartSlide';
import Countdown from './Countdown';
import "./cart.scss"

function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  let listCart = useSelector((state) => state.cart);

  return (
    <>
      <div className="list-sp">
        {listCart.status == 'idle'
          ? listCart.datasp.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price">
                    <Countdown ngay={item.days} id={item.id}></Countdown>
                  </div>
                </div>
              );
            })
          : ''}
      </div>
    </>
  );
}

export default Cart;
