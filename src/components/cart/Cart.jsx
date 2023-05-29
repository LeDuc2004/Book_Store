import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCarts } from './cartSlide';
import Countdown from './Countdown';
import "./cart.scss"
import Confirm from '../confirm/Confirm';
import Empty1 from '../common/empty/Empty';


function Cart() {
  const [confirm , setConfirm] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  let listCart = useSelector((state) => state.cart);

  return (
    <>
      <div className="list-sp cart">
        {listCart.status == 'idle'
          ? listCart.datasp.map((item, index) => {
              return (
                <div  key={index} className="list-sp__sun">
                  <a href={`detail/${item.id}`} className="sun-img">
                    <img src={item.img} alt="" />
                  </a>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price">
                    <Countdown setConfirm={setConfirm} ngay={item.days} id={item.id}></Countdown>
                  </div>
                </div>
              );
            })
          : ''}
      </div>
      {listCart.status == 'idle' && listCart.datasp.length < 1 ? <Empty1></Empty1> : ""}
      <div style={confirm == true ? {}: {display:"none"}}>
      <Confirm onCancel={setConfirm} onConfirm={""} ></Confirm>
    </div>
    </>
  );
}

export default Cart;
