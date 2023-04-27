import Header from "../header/Header";
import React, { useState } from "react";
import "./signin.scss";

function Signin() {
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
        <input
          onChange={(e) => setCfmk(e.target.value)}
          type="password"
          placeholder="Xác nhận mật khẩu..."
        />
        <span className="check">{spanCheck[2]}</span>
        <div className="btn-dk" onClick={() => handleSubmit()}>
          Đăng ký
        </div>
        {/* <div className="text-or">hoặc</div> */}
      </div>
    </>
  );
}

export default Signin;
