import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCarts, fetchFavor } from './cartSlide';
import Countdown from './Countdown';
import "./cart.scss"
import Confirm from '../confirm/Confirm';
import Empty1 from '../common/empty/Empty';


function Favorite() {
  const [confirm , setConfirm] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavor());
  }, []);

  let listCart = useSelector((state) => state.cart);
console.log(listCart);
  return (
    <>
      <div className="list-sp">
        {listCart.status == 'idle'
          ? listCart.datafavor.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div>Bỏ yêu thích</div>
                </div>
              );
            })
          : ''}
      </div>
      {listCart.status == 'idle' && listCart.datafavor.length < 1 ? <Empty1></Empty1> : ""}
      <div style={confirm == true ? {}: {display:"none"}}>
      <Confirm onCancel={setConfirm} onConfirm={""} ></Confirm>
    </div>
    </>
  );
}

export default Favorite;
