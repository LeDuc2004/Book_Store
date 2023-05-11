import './_header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { bodySlide } from '../body/bodySlide';
import Menu from './MenuSearch';
function Header({ signin }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const [info, setInfor] = useState('');
  const [iduser, setIduser] = useState('');
  const [togle, setTogle] = useState(true);
  const [textsearch, setTextsearch] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      
      dispatch(
        bodySlide.actions.enter({
          search: textsearch.toLowerCase(),
        }),
      );
      setTextsearch('')
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Beaer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(true);
          setInfor(data.user.name);
          setIduser(data.user.id);
        });
    }
  }, []);

  function handleSearch(e) {
    setTextsearch(e.target.value.toLowerCase().replace(/\s/g, ''));
  }
  function idd(id) {
    localStorage.setItem('idd', id);
  }
  function logout() {
    setTogle(!togle);
    let token = localStorage.getItem('token');
    fetch(`http://localhost:5000/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Beaer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ token, iduser }),
    }).then((res) => {
      if (res.status == 200) {
        localStorage.setItem('token', null);
        setUser(false);
      }
    });
  }

  return (
    <>
      <div className="header">
        <a href="/" className="header__logo">
          <img src="https://thebookland.vn/resources/img/thebooklandNew.png" className="App-logo" alt="logo" />
        </a>

        <div className="search" style={signin == 'none' ? { display: 'none' } : {}}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input onChange={handleSearch} type="text" placeholder="Tìm kiếm..." onKeyDown={handleKeyDown} />
        </div>

        <div className="authen" style={signin == 'none' || user == true ? { display: 'none' } : {}}>
          <a href="/authen" onClick={() => idd(1)} className="sign-in">
            Đăng ký
          </a>
          <a href="/authen" onClick={() => idd(2)} className="sign-up">
            Đăng nhập
          </a>
        </div>
        <div className="authen" style={signin == 'none' || user == false ? { display: 'none' } : {}}>
          <a href="/cart" className="sign-in">
            Tủ Sách
          </a>
          <a className="sign-in">Xin chào: {info}</a>
          <a onClick={() => logout()} className="sign-in">
            Đăng xuất
          </a>
          <a
            href="/admin"
            style={signin == 'none' || user == false || iduser != 999999 ? { display: 'none' } : {}}
            className="sign-in"
          >
            Quản lí sách
          </a>
        </div>
      </div>
      <Menu text={textsearch}></Menu>
    </>
  );
}

export default Header;
