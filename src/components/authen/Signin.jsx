import Header from "../header/Header";
import React, { useState , useEffect} from "react";
import "./signin.scss";

function Signin() {
  const [spanCheck, setSpanCheck] = useState([".", ".", "."]);
  const [tk, setTk] = useState("");
  const [mk, setMk] = useState("");
  const [cfmk, setCfmk] = useState("");
  const [togle , setTogle] = useState(true)
  const [common , setCommon] = useState(true)
  let useAuthen = {
    id: Math.random(),
    tk: tk,
    mk: mk,
    token:[]
  };
  useEffect(()=>{
    setCommon(localStorage.getItem("idd"))
  } , [localStorage.getItem("idd")])
  function handleSubmitdk() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        authen(data);
      });
    function authen(data) {
      for (let i = 0; i < data.length; i++) {
        if (tk != data[i].tk) {
          if (mk == cfmk) {
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(useAuthen),
            });
          } else {
            console.log("cf sai");
          }
        } else {
          console.log("tk tồn tại");
        }
      }
    }

  }
  function handleSubmitdn() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        authen(data);
      });
    function authen(data) {
      let flag = true;
      for (let i = 0; i < data.length; i++) {
        if (tk != data[i].tk) {
          flag = false;
          continue;
        } else {
          if (mk == data[i].mk) {
            flag = true;
            fetch("http://localhost:5000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "authorization":"levanduc"
              },
              body: JSON.stringify(useAuthen),
            })
              .then((res) => res.json())
              .then((data1) => {
                console.log(data[i].id);
                fetch(`http://localhost:3000/users/${data[i].id}`)
                .then((res) => res.json())
                .then((data) => {
                  pushtoken(data)
                });
                function pushtoken(data2) {
                  data2.token.push(data1.accessToken)
                  fetch(`http://localhost:3000/users/${data[i].id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "authorization":"levanduc"
                    },
                    body: JSON.stringify(data2),
                  })
                }
                localStorage.setItem("token", data1.accessToken);

                window.location.href = "/"
              });
              
            break;
          } else {
            flag = true;
            console.log("mk sai");
          }
        }
      }
      if (flag == false) {
        console.log("tk sai");
      }
    }
  }
function idd(id) {
  setTogle(!togle)
  localStorage.setItem("idd" , id)
}
  return (
    <>
      <Header signin={"none"} />
      <div className="tbl-dn">
        <div className="common-cha">
          <div onClick={()=>idd(1)} className={common == 2 ? "common" : "common in"}>Đăng ký</div>
          <div onClick={()=>idd(2)} className={common == 1 ? "common" : "common in"}>Đăng nhập</div>
          <div className={common == 2 ? "cuon" : "cuon1"}></div>
        </div>

        <input
          onChange={(e) => setTk(e.target.value)}
          type="text"
          placeholder="Tài khoản..."
        />
        <span className="check">{spanCheck[0]}</span>
        <input
          onChange={(e) => setMk(e.target.value)}
          type="password"
          placeholder="Mật khẩu..."
        />
        <span className="check">{spanCheck[1]}</span>
        <input
          onChange={(e) => setCfmk(e.target.value)}
          type="password"
          placeholder="Xác nhận mật khẩu..."
          style={common == 2 ? {display:"none"} : {display:""}}
  
        />
        <span style={common == 2 ? {display:"none"} : {display:""}}  className="check">{spanCheck[2]}</span>
        <div style={common == 2 ? {display:"none"} : {display:""}} className="btn-dk" onClick={() => handleSubmitdk()}>
          Đăng ký
        </div>
        <div style={common == 1 ? {display:"none"} : {display:""}} className="btn-dk" onClick={() => handleSubmitdn()}>
          Đăng nhập
        </div>
        {/* <div className="text-or">hoặc</div> */}
      </div>
    </>
  );
}

export default Signin;
