import "./admin.scss"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUser } from "./adminSlide";
import Countdown from "../cart/Countdown";

function Admin() {
    const dispatch = useDispatch()
    useEffect(()=>{
     dispatch(fetchUser())
    }, [])
    const users = useSelector(state => state.user)
    console.log(users);
    return ( <>
      <div className="admin">
      {users.status == "idle"
          ? users.user.map((item , index) => {
              return (
               <div key={index} className="admin-sun">
                 <div className="admin-text">{item.tk}</div>
                 <div className="list-sp">
                                     {
                    item.borrow.map((item , index) => {
                        return (
                          <div key={index} className="list-sp__sun">
                            <div className="sun-img">
                              <img src={item.img} alt="" />
                            </div>
                            <div className="sun-name">{item.name}</div>
                            <div className="sun-price">
                              <Countdown ngay={item.days}></Countdown>
                            </div>
                          </div>
                        );
                      })
                 }
                 </div>

               </div>
              )
            })
          : ""}
      </div>
       
    </> );
}

export default Admin;