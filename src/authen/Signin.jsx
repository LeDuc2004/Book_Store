import Header from '../components/header/Header';
import React, { useState, useEffect } from 'react';
import './signin.scss';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

function Signin() {
  const [spanCheck, setSpanCheck] = useState(['.', '.', '.']);
  const [tk, setTk] = useState('');
  const [mk, setMk] = useState('');
  const [cfmk, setCfmk] = useState('');
  const [togle, setTogle] = useState(true);
  const [common, setCommon] = useState(true);
  const clientId = '118219306920-94c7uh6uggg3b1jifmbuul0gkhbkl15g.apps.googleusercontent.com';
  const responseGoogle = (response) => {
    if (response.provider == 'facebook') {
      const user = {  
        email: response.data.email,
        name: response.data.name,
        id: response.data.userID,
      };
      handleSubmitdk(user);
    } else {
      const user = {
        email: response.profileObj.email,
        name: response.profileObj.name,
        image: response.profileObj.imageUrl,
        accessToken: response.accessToken,
        id: response.profileObj.googleId,
      };
      handleSubmitdk(user);
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };
  let useAuthen = {
    id: Math.random(),
    tk: tk,
    mk: mk,
    token: [],
    borrow: [],
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });
  useEffect(() => {
    setCommon(localStorage.getItem('idd'));
  }, [localStorage.getItem('idd')]);

  function handleSubmitdk(fborgg) {
    if (fborgg) {
      let user = {
        id: fborgg.id,
        tk: fborgg.name,
        token: [],
        borrow: [],
      };
      fetch('http://localhost:3000/users')
        .then((res) => res.json())
        .then((data) => {
          authengg(data);
        });
      function authengg(data) {
        let flag = true;
        for (let i = 0; i < data.length; i++) {
          if (fborgg.name != data[i].tk) {
            flag = false;
            continue;
          } else {
            flag = true;
            break;
          }
        }
        if (flag == false) {
          fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          handleSubmitdn(user);
        } else if (flag == true) {
          console.log(fborgg.id);
          fetch(`http://localhost:3000/users/${fborgg.id}`)
            .then((res) => res.json())
            .then((data) => {
              handleSubmitdn(data);
            });
        }
      }
    } else {
      fetch('http://localhost:3000/users')
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
            flag = true;
            break;
          }
        }
        if (flag == false) {
          fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(useAuthen),
          });
        } else if (flag == true) {
          console.log('tồn tại');
        }
      }
    }
  }
  function handleSubmitdn(fborgg) {
    if (fborgg) {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'levanduc',
        },
        body: JSON.stringify({ id: fborgg.id, name: fborgg.tk }),
      })
        .then((res) => res.json())
        .then((data1) => {
          fetch(`http://localhost:3000/users/${fborgg.id}`)
            .then((res) => res.json())
            .then((data) => {
              pushtoken(data);
            });
          function pushtoken(data2) {
            data2.token.push(data1.accessToken);
            fetch(`http://localhost:3000/users/${fborgg.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                authorization: 'levanduc',
              },
              body: JSON.stringify(data2),
            }).then((res) => {
              if (res.status == 200) {
                localStorage.setItem('token', data1.accessToken);

                window.location.href = '/';
              }
            });
          }
        });
    } else {
      fetch('http://localhost:3000/users')
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

              fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: 'levanduc',
                },
                body: JSON.stringify({ id: data[i].id, name: data[i].tk }),
              })
                .then((res) => res.json())
                .then((data1) => {
                  fetch(`http://localhost:3000/users/${data[i].id}`)
                    .then((res) => res.json())
                    .then((data) => {
                      pushtoken(data);
                    });
                  function pushtoken(data2) {
                    data2.token.push(data1.accessToken);
                    fetch(`http://localhost:3000/users/${data[i].id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        authorization: 'levanduc',
                      },
                      body: JSON.stringify(data2),
                    }).then((res) => {
                      if (res.status == 200) {
                        localStorage.setItem('token', data1.accessToken);

                        window.location.href = '/';
                      }
                    });
                  }
                });

              break;
            } else {
              flag = true;
              console.log('mk sai');
            }
          }
        }
        if (flag == false) {
          console.log('tk sai');
        }
      }
    }
  }

  function idd(id) {
    setTogle(!togle);
    localStorage.setItem('idd', id);
  }
  return (
    <>
      <Header signin={'none'} />
      <div className="tbl-dn">
        <div className="common-cha">
          <div onClick={() => idd(1)} className={common == 2 ? 'common' : 'common in'}>
            Đăng ký
          </div>
          <div onClick={() => idd(2)} className={common == 1 ? 'common' : 'common in'}>
            Đăng nhập
          </div>
          <div className={common == 2 ? 'cuon' : 'cuon1'}></div>
        </div>

        <input onChange={(e) => setTk(e.target.value)} type="text" placeholder="Tài khoản..." />
        <p className="check">{spanCheck[0]}</p>
        <input onChange={(e) => setMk(e.target.value)} type="password" placeholder="Mật khẩu..." />
        <p className="check">{spanCheck[1]}</p>
        <input
          onChange={(e) => setCfmk(e.target.value)}
          type="password"
          placeholder="Xác nhận mật khẩu..."
          style={common == 2 ? { display: 'none' } : { display: '' }}
        />
        <p style={common == 2 ? { display: 'none' } : { display: '' }} className="check">
          {spanCheck[2]}
        </p>
        <div
          style={common == 2 ? { display: 'none' } : { display: '' }}
          className="btn-dk"
          onClick={() => handleSubmitdk()}
        >
          Đăng ký
        </div>
        <div
          style={common == 1 ? { display: 'none' } : { display: '' }}
          className="btn-dk"
          onClick={() => handleSubmitdn()}
        >
          Đăng nhập
        </div>
        <div style={common == 1 ? { display: 'none' } : { display: '' }} className="text-or">
          hoặc
        </div>
        <div style={common == 1 ? { display: 'none' } : { display: '' }} className="google">
          <GoogleLogin
            clientId="118219306920-94c7uh6uggg3b1jifmbuul0gkhbkl15g.apps.googleusercontent.com"
            buttonText="Log in with  Google"
            onSuccess={responseGoogle}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div style={common == 1 ? { display: 'none' } : { display: '' }} className="facebook-1">
          <LoginSocialFacebook
            appId="5916611618449616"
            onResolve={(res) => {
              responseGoogle(res);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <FacebookLoginButton></FacebookLoginButton>
          </LoginSocialFacebook>
        </div>
      </div>
    </>
  );
}

export default Signin;
