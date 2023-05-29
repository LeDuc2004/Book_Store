import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
 
app.get('/authenAdmin', authenToken, (req, res) => {
  const id = req.user.id;
  if (id == 108043588203461517800) {
    res.status(200).send('ok');
  } else {
    res.send(201).send('qq');
  }
}); 
app.post('/loadBook/:id', (req, res) => {
  let { id } = req.params;
  let search = req.body.search;
  let author = req.body.author
  if (search || author ) {
    if (search) {
      fetch('http://localhost:3000/database')
      .then((res) => res.json())
      .then((data) => {
        database(data);
      });
    function database(data) {
      const product = data.filter((item) => {
        return item.name.toLowerCase().replace(/\s/g, '').includes(search.replace(/\s/g, ''));
      });
      res.send(product);
      
    }
    }
    if (author) {
      console.log(author);
      fetch('http://localhost:3000/database')
      .then((res) => res.json())
      .then((data) => {
        database(data);
      });
    function database(data) {
      const product = data.filter((item) => {
        return item.author.toLowerCase().replace(/\s/g, '').includes(author.replace(/\s/g, ''));
      });
      res.send(product);
      
    }
    }
  }else{
      if (id) {
    fetch('http://localhost:3000/database')
      .then((res) => res.json())
      .then((data) => {
        database(data);
      });
    function database(data) {
      if (id == 'all') {
        res.send(data);
      }
      if (id == 'kids') {
        let kids = data.filter((item, index) => {
          if (index < 21) {
            return item;
          }
        }); 
        res.send(kids);
      } else if (id == 'young') {
        let kids = data.filter((item, index) => {
          if ( index >= 21 && index < 42) {
            return item;
          }
        });
        res.send(kids);
      } else if (id == 'manga') {
        let kids = data.filter((item, index) => {
          if (index >= 42 && index < 63) {
            return item;
          }
        });
        res.send(kids);
      } else if (id == 'action') {
        let kids = data.filter((item, index) => {
          if (index >= 63 && index < 84) {
            return item;
          }
        });
        res.send(kids);
      }
    }
  }
  }

});
app.post('/login', (req, res) => {
  if (req.headers.authorization == 'levanduc') {
    const accessToken = jwt.sign(req.body, 'levanduc');
    res.status(200).send({ accessToken });
  } else {
    res.status(404).send('ERROR');
  }
});
app.post('/borrow', authenToken, async (req, res) => {
  const id = req.user.id;
  let item = req.body.obj;
  try {
    const databaseResponse = await fetch(`http://localhost:3000/database/${item.id}`);
    const databaseData = await databaseResponse.json();
    await updateStatus(databaseData);

    const usersResponse = await fetch(`http://localhost:3000/users/${id}`);
    const usersData = await usersResponse.json();
    await updateUser(usersData);

    res.send({ id: 0 });
    async function updateStatus(data) {
      data.status = false;
      data.hanmuon = item.hanmuon;

      await fetch(`http://localhost:3000/database/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'levanduc',
        },
        body: JSON.stringify(data),
      });
    }

    async function updateUser(data) {
      const obj = {
        id: item.id,
        img: item.img,
        name: item.name,
        days: item.days,
      };
      data.borrow.push(obj);

      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'levanduc',
        },
        body: JSON.stringify(data),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cart', authenToken, (req, res) => {
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
app.get('/favor', authenToken, (req, res) => {
  const id = req.user.id;
  fetch(`http://localhost:3000/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      authen(data);
    });
  function authen(data) {
    res.json({ tym: data.tym });
  }
});
app.post('/updateCart/:id', authenToken, (req, res) => {
  const iduser = req.user.id;
  const { id } = req.params;
  fetch(`http://localhost:3000/users/${iduser}`)
    .then((res) => res.json())
    .then((data) => {
      authen(data);
    });
  function authen(data) {
    let arr = data.borrow.filter((item) => item.id != id);
    data.borrow = arr;
    fetch(`http://localhost:3000/users/${iduser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'levanduc',
      },
      body: JSON.stringify(data),
    });
  }
});
app.get('/user', authenToken, (req, res) => {
  const user = req.user;
  res.send({ user });
});
app.post('/logout', (req, res) => {
  let user = req.body;
  fetch(`http://localhost:3000/users/${user.iduser}`)
    .then((res) => res.json())
    .then((data) => { 
      data.token = data.token.filter((item) => item != user.token);

      fetch(`http://localhost:3000/users/${user.iduser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'levanduc',
        },
        body: JSON.stringify(data),
      });
    });
  res.send({ mess: 'success' });
});
function authenToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];
  if (!token) res.send(401);
  jwt.verify(token, 'levanduc', (err, data) => {
    if (data) {
      req.user = data;
      next();
    }
  });  
}

app.listen(5000, () => {
  console.log('http://localhost:5000');
});
