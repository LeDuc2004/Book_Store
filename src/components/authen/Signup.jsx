import Header from "../header/Header";
import React, { useState } from "react";
import "./signin.scss";

function Signup() {
  const [spanCheck, setSpanCheck] = useState([".", ".", "."]);
  const [tk, setTk] = useState("");
  const [mk, setMk] = useState("");
  const [cfmk, setCfmk] = useState("");
  let useAuthen = {
    id: Math.random(),
    tk: tk,
    mk: mk,
  };
  function handleSubmit() {
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
              },
              body: JSON.stringify(useAuthen),
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("token", data.accessToken);
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

  return (
    <>
      <Header signin={"none"} />
      <div className="tbl-dn">
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

        <div className="btn-dk" onClick={() => handleSubmit()}>
          Đăng nhập
        </div>
        {/* <div className="text-or">hoặc</div> */}
      </div>
    </>
  );
}

export default Signup;
