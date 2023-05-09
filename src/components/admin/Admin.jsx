import "./admin.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUser } from "./adminSlide";
import Countdown from "../cart/Countdown";
import Table1 from "../table/Table";

function Admin() {
  const [stateChoose, setStateChoose]= useState([true, false, false])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const users = useSelector((state) => state.user);

  function managerUsers() {
    setStateChoose([true, false, false])
    
  }
  function managerBooks() {
    setStateChoose([false, true, false])

    
  }
  function addBooks() {
    setStateChoose([false, false, true])

    
  }

  return (
    <div className="admin-path">
      <div className="sidebar">
        <div onClick={()=>managerUsers()} style={stateChoose[0] == true ? {backgroundColor:"gray"} : {}} className="sidebar__user lable"><i className="fa-regular fa-user"></i>Quản lý Users</div>
        <div onClick={()=>managerBooks()} style={stateChoose[1] == true ? {backgroundColor:"gray"} : {}} className="sidebar__book lable"><i className="fa-solid fa-book"></i>Quản lý sách</div>
        <div onClick={()=>addBooks()} style={stateChoose[2] == true ? {backgroundColor:"gray"} : {}} className="sidebar__book lable"><i className="fa-solid fa-square-plus"></i>Thêm sách</div>

        
        
      </div>
     
      <div className="admin">
        {users.status == "idle"
          ? <Table1 data={users.user}></Table1>
          : ""}
      </div>
    </div>
  );
}

export default Admin;
