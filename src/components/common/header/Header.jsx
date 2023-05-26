import './_header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { bodySlide, fetchMoreTodos } from '../../body/bodySlide';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Menu from './MenuSearch';
function Header({ signin, setSearchPage }) {
  const dispatch = useDispatch();
  const [imguser, setImg] = useState(
    '/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.webp',
  );
  const [user, setUser] = useState(false);
  const [info, setInfor] = useState('');
  const [iduser, setIduser] = useState('');
  const [togle, setTogle] = useState(true);
  const [textsearch, setTextsearch] = useState('');
  const countTime = useRef(null);
  const [handlenone, setHandlenone] = useState(false);
  const [valuetk, setValuetk] = useState('');
  const [password, setPassword] = useState('');
  const [cfpassword, setCfpassword] = useState('');
  const [listvalidate, setListvalidate] = useState([true, true, true, true]);
  const [eyemk, setEyemk] = useState(true);
  const [eyecfmk, setCfeyemk] = useState(true);
  const [mangbocdn, setMangbocdn] = useState([110, '']);
  const [valuetkdn, setValuetkdn] = useState('');
  const [passworddn, setPassworddn] = useState('');
  const [nameuser, setNameuser] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [listvalidatedn, setListvalidatedn] = useState([true, true, true, true]);
  const [theloai , setTheloai] = useState('')
  const { id } = useParams();
  useEffect(()=>{
   setTheloai(id)
  }, [id])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(fetchMoreTodos('stop'));
      dispatch(
        bodySlide.actions.enter({
          search: textsearch.toLowerCase(),
        }),
      );
      setTextsearch('');
      setSearchPage(true);
    }
  };
  // iduser
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
          if (data.user.img) {
            setImg(data.user.img);
          }
        });
    }
  }, []);

  function navpa() {
    setTogle(!togle);
  }
  function handleSearch(e) {
    if (countTime.current) {
      clearTimeout(countTime.current);
    }
    countTime.current = setTimeout(() => {
      setTextsearch(e.target.value.toLowerCase().replace(/\s/g, ''));
    }, 300);
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
        window.location.href = 'http://localhost:3001/authen';
      }
    });
  }

  return (
    <>
      <div className="header">
        <div className='chungbed1'>
          <a href="/" className="header__logo">
            <img src="https://thebookland.vn/resources/img/thebooklandNew.png" className="App-logo" alt="logo" />
          </a>

          <div className="list-theloai">
            <a  href='/catalog/kids' style={{ color: '#f6891e' }} className={`list-theloai__sun one ${theloai == "kids" ? "kids" : ''}`}>
              Sách Cho Bé
            </a>
            <a href='/catalog/young' style={{ color: '#234d84' }} className={`list-theloai__sun two ${theloai == "young" ? "kids" : ''}`}>
              Thanh Thiếu Niên
            </a>
            <a href='/catalog/manga' style={{ color: '#36bfbc' }} className={`list-theloai__sun three ${theloai == "manga" ? "kids" : ''}`}>
              Manga
            </a>
            <a href='/catalog/action' style={{ color: '#df393a' }} className={`list-theloai__sun four ${theloai == "action" ? "kids" : ''}`}>
              Trinh Thám
            </a>
          </div>
        </div>
        <div className="chungbed">
          <div className={`search ${signin === 'none' ? 'hidden' : ''}`}>
            <div className={isSearchExpanded ? 'expanded' : ''}>
              <i className="fa-solid fa-magnifying-glass" onClick={() => setIsSearchExpanded(!isSearchExpanded)}></i>
              <input
                id="search"
                onChange={handleSearch}
                type="text"
                placeholder={isSearchExpanded ? 'Tìm kiếm sách và tên tác giả...' : ''}
                onKeyDown={handleKeyDown}
                className={isSearchExpanded ? 'expanded' : ''}
              />
            </div>
          </div>

          <div
            style={signin == 'none' ? { display: 'none' } : {}}
            className="wrapper-user"
            onClick={() => setHandlenone(!handlenone)}
          >
            <div className="icon-menu">
              <i className="fa-solid fa-bars" />
            </div>
            <div className="icon-user">
              {localStorage.getItem('token') == 'null' || imguser == '' ? (
                <i className="fa-solid fa-circle-user" />
              ) : (
                <img src={imguser} alt="" />
              )}
            </div>

            <div style={localStorage.getItem('token') == 'null' ? { display: '' } : { display: 'none' }}>
              <div
                onClick={() => setHandlenone(false)}
                style={handlenone === true ? { display: '' } : { display: 'none' }}
                className="mangboc"
              >
                <div style={handlenone === true ? { display: '' } : { display: 'none' }} className="form-btndk">
                  <div className="form-ul">
                    <Link
                      to={`/authen`}
                      onClick={() => {
                        setHandlenone(false);
                        idd(2);
                      }}
                      style={{ fontWeight: '550', color: 'black' }}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={`/authen`}
                      onClick={() => {
                        setHandlenone(false);
                        idd(1);
                      }}
                    >
                      Đăng ký
                    </Link>
                    <span
                      style={{
                        background: 'lightgray',
                        height: '1px',
                        marginTop: '5px',
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            <div style={localStorage.getItem('token') == 'null' ? { display: 'none' } : { display: '' }}>
              <div
                onClick={() => setHandlenone(false)}
                style={handlenone === true ? { display: '' } : { display: 'none' }}
                className="mangboc"
              >
                <div style={handlenone === true ? { display: '' } : { display: 'none' }} className="form-btndk">
                  <div className="form-ul">
                    <Link
                      to={'/cart'}
                      onClick={() => setMangbocdn([0, true])}
                      style={{ fontWeight: '550', color: 'black' }}
                    >
                      {info}
                    </Link>
                    <span
                      style={{
                        background: 'lightgray',
                        height: '1px',
                        marginTop: '5px',
                      }}
                    ></span>
                    <Link
                      to={'/cart'}
                      onClick={() => setMangbocdn([0, true])}
                      style={{ fontWeight: '550', color: 'black' }}
                    >
                      Sách đang mượn
                    </Link>
                    <Link
                      to={'/favorite'}
                      onClick={() => setMangbocdn([0, true])}
                      style={{ fontWeight: '550', color: 'black' }}
                    >
                      Trang yêu thích
                    </Link>
                    <Link style={iduser != 108043588203461517800 ? { display: 'none' } : {}} to={'/admin'}>
                      Trang quản lý
                    </Link>
                    <span
                      style={{
                        background: 'lightgray',
                        height: '1px',
                        marginTop: '5px',
                      }}
                    ></span>
                    <Link onClick={() => logout()} style={{ marginBottom: '10px', marginTop: '5px' }}>
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu text={textsearch}></Menu>
    </>
  );
}

export default Header;
