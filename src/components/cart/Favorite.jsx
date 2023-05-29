import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { cartSlide, fetchCarts, fetchFavor } from './cartSlide';
import Countdown from './Countdown';
import "./cart.scss"
import Confirm from '../confirm/Confirm';
import Empty1 from '../common/empty/Empty';
import { bodySlide } from '../body/bodySlide';
import { getData, putData } from '../../services';


function Favorite() {
  const [confirm , setConfirm] = useState(false)
  const [iduser, setIduser] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavor());
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: 'GET',
      headers: {
        authorization: `Beaer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIduser(data.user.id);
      });
  }, []);

  let listCart = useSelector((state) => state.cart);
function bolike(item) {

    getData(`http://localhost:3000/database/${item.id}`).then((data) => addtym1(data));
    function addtym1(data) {
      let obj = { ...data };
      obj.tym = data.tym.filter((item) => item != iduser);
      dispatch(bodySlide.actions.updatetym1({ id: item.id, iduser }));
      putData(`http://localhost:3000/database/${item.id}`, obj).then((res) =>
        dispatch(cartSlide.actions.deleteFav(item.id)),
      );
    }
    getData(`http://localhost:3000/users/${iduser}`).then((data) => addtym(data));
    function addtym(data) {
      let obj = { ...data };

      obj.tym = data.tym.filter((item1) => item1.id != item.id);

      putData(`http://localhost:3000/users/${iduser}`, obj);
    }
  
}
  return (
    <>
      <div className="list-sp cart">
        {listCart.status == 'idle'
          ? listCart.datafavor.map((item, index) => {
              return (
                <div  key={index} className="list-sp__sun">
                  <a href={`detail/${item.id}`} className="sun-img">
                    <img src={item.img} alt="" />
                  </a>
                  <div className="sun-name">{item.name}</div>
                  <div onClick={()=>bolike(item)} className='boyeuthich'>Bỏ yêu thích</div>
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
