import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());


app.get("/authenAdmin", authenToken,(req , res)=>{
  const id = req.user.id;
  if (id == 999999) {
    res.status(200).send("ok")
  }else{
    res.send(201).send("qq")
  }
})
app.get("/loadBook/:id", (req, res)=>{
  let {id} = req.params
  let index = Number(id) - 1
  if (index) {
    let trave = index + 8
    let arr = []
    fetch("http://localhost:3000/database")
      .then((res) => res.json())
      .then((data) => {
          database(data)
      });
    function database(data) {
          for (let i = 0; i < data.length; i++) {
      if (i > index && i <= trave) {
        arr.push(data[i])
      }
      
    }
    res.send(arr)
    }

  }
})
app.post("/login", (req, res) => {
  if (req.headers.authorization == "levanduc") {
    const accessToken = jwt.sign(req.body, "levanduc");

    res.status(200).send({ accessToken });
  } else {
    res.status(404).send("ERROR");
  }
});
app.post("/borrow", authenToken, (req, res) => {
  const id = req.user.id;
  const item = req.body.obj;
  fetch(`http://localhost:3000/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      authen(data);
    });
  function authen(data) {
    const obj = {
      id: data.borrow.length,
      img: item.img,
      name: item.name,
      days: item.days,
    };
    data.borrow.push(obj);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "levanduc",
      },
      body: JSON.stringify(data),
    });
  }
});
app.get("/cart", authenToken, (req, res) => {
  const id = req.user.id; 
  fetch(`http://localhost:3000/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      authen(data);
    });
  function authen(data) {
    res.json({ cart: data.borrow });
  }
});
app.get("/user", authenToken, (req, res) => {
  const user = req.user;
  res.send({ user });
});
function authenToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  if (!token) res.send(401);
  jwt.verify(token, "levanduc", (err, data) => {
    if (data) {
      req.user = data;
      next();
    }
  });
}
app.post("/logout", (req, res) => {
  let user = req.body;
  fetch(`http://localhost:3000/users/${user.iduser}`)
    .then((res) => res.json())
    .then((data) => {
      data.token = data.token.filter((item) => item != user.token);

      fetch(`http://localhost:3000/users/${user.iduser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "levanduc",
        },
        body: JSON.stringify(data),
      });
    });
  res.send({ mess: "success" });
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
