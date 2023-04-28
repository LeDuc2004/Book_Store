import "./_header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { bodySlide } from "../body/bodySlide";
function Header({ signin }) {
  const dispatch = useDispatch();
  const [user , setUser] = useState(false)
  const [info , setInfor] = useState("")

  useEffect(()=>{
    if (localStorage.getItem("token") != null) {
          fetch("http://localhost:5000/user", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization":`Beaer ${localStorage.getItem("token")}`
              }
              
            }).then(res => res.json() )
            .then((data)=>{
              setUser(true)
              setInfor(data.user.tk)

            })
    }

  }, [])

  function handleSearch(e) {
    dispatch(
      bodySlide.actions.searchSp({
        search: e.target.value.toLowerCase(),
      })
    );
    console.log(e.target.value.trim());
  }
  function idd(id) {
    localStorage.setItem("idd", id);
  }
  function logout() {
    
  }


  return (
    <>
      <div className="header">
        <a href="/" className="header__logo">
          <img
            src="https://thebookland.vn/resources/img/thebooklandNew.png"
            className="App-logo"
            alt="logo"
          />
        </a>

        <div
          className="search"
          style={signin == "none"  ? { display: "none" } : {}}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Tìm kiếm..."
          />
        </div>

        <div
          className="authen"
          style={signin == "none" || user == true ? { display: "none" } : {}}
        >
          <a href="/authen" onClick={() => idd(1)} className="sign-in">
            Đăng ký
          </a>
          <a href="/authen" onClick={() => idd(2)} className="sign-up">
            Đăng nhập
          </a>
        </div>
        <div className="authen" style={signin == "none" || user == true ?  {}:{ display: "none" } }>
        <a   className="sign-in">
            Xin chào: {info}
          </a>
          <a href="/authen" onClick={()=>logout()}  className="sign-up">
            Đăng xuất
          </a>
          </div>

      </div>
    </>
  );
}

export default Header;
