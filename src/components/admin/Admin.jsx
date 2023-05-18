import './admin.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchUser } from './adminSlide';
import Table1 from '../table/Table';
import { fetchDatabase } from '../body/bodySlide';
import Table2 from '../table2/Table2';
import { postData } from '../../services';
import Confirm from '../confirm/Confirm';

function Admin() {
  const [stateChoose, setStateChoose] = useState([true, false, false, false]);
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchDatabase());
  }, []);
  const users = useSelector((state) => state.user);

  let listSearch = useSelector((state) => {
    let product = state.listSp.database.slice().map((item) => {
      if (item.status == false) {
        return { ...item, status: 'Đang mượn' };
      } else if (item.status == true) {
        return { ...item, status: 'Chưa mượn' };
      }
    });

    return product;
  });

  function managerUsers() {
    setStateChoose([true, false, false, false]);
  }
  function managerBooks() {
    setStateChoose([false, true, false, false]);
  }
  function addBooks() {
    setStateChoose([false, false, true, false]);
  }
  function handleAdd() {
    let obj =    {
      "status": true,
      "img": img,
      "name": name,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatem?"
    }
    postData("http://localhost:3000/database", obj )
    alert("Thêm thành công")
  }

  return (
    <>
    <div className="admin-path">
      <div className="sidebar">
        <div
          onClick={() => managerUsers()}
          style={stateChoose[0] == true ? { backgroundColor: 'gray' } : {}}
          className="sidebar__user lable"
        >
          <i className="fa-regular fa-user"></i>Quản lý Users
        </div>
        <div
          onClick={() => managerBooks()}
          style={stateChoose[1] == true ? { backgroundColor: 'gray' } : {}}
          className="sidebar__book lable"
        >
          <i className="fa-solid fa-book"></i>Quản lý sách
        </div>
        <div
          onClick={() => addBooks()}
          style={stateChoose[2] == true ? { backgroundColor: 'gray' } : {}}
          className="sidebar__book lable"
        >
          <i className="fa-solid fa-square-plus"></i>Thêm sách
        </div>
      </div>

      <div style={stateChoose[0] == true ? { display: '' } : { display: 'none' }} className="admin">
        {users.status == 'idle' ? <Table1 data={users.user}></Table1> : ''}
      </div>

      <div style={stateChoose[1] == true ? { display: '' } : { display: 'none' }} className="admin">
        <Table2 data={listSearch}></Table2>
      </div>
      <div style={stateChoose[2] == true ? { display: '' } : { display: 'none' }} className="admin1">
        <input onChange={(e)=>setImg(e.target.value)} type="text" placeholder="img" />
        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
        <button onClick={() => handleAdd()}>Thêm</button>
      </div>
    </div>
    </>
  );
}

export default Admin;
