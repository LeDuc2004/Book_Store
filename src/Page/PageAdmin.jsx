import { useEffect, useState } from "react";
import Admin from "../components/admin/Admin";
import Header from "../components/common/header/Header";

function PageAdmin() {
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/authenAdmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Beaer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setAdmin(res.status);
    });
  }, []);
  return (
    <>
      {admin == 200 ? (
        <>
          <Header ></Header>
          <Admin></Admin>
        </>
      ) : ""}
      {admin == 201 ? (
        <div className="gun">
            <h1>Cút ra ngoài ###</h1>
            <img src="/img/hinh-anh-ong-nguyen-huu-da-cam-sung-9c1b39df3c14226a6029392ffd1398ad.jpg" alt="" />
            <img src="/img/hinh-anh-ong-nguyen-huu-da-cam-sung-9c1b39df3c14226a6029392ffd1398ad.jpg" alt="" />

        </div>
      ): ""}
    </>
  );
}

export default PageAdmin;
