import Header from '../common/header/Header';
import React, { useState, useEffect } from 'react';
import './signin.scss';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { ShowSuccessToast } from '../../hooks/toast/Tost';

function Signin() {
  const [spantk, setSpantk] = useState('.');
  const [spanmk, setSpanmk] = useState('.');
  const [spancf, setSpancf] = useState('.');

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
        img:fborgg.image,
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
          fetch(`http://localhost:3000/users/${fborgg.id}`)
            .then((res) => res.json())
            .then((data) => {
              handleSubmitdn(data);
            });
        }
      }
    } else {
      if (tk == '' && mk == '' && cfmk == '') {
        setSpantk('Vui lòng nhập tài khoản.');
        setSpanmk('Vui lòng nhập mật khẩu.');
        setSpancf('Vui lòng xác nhận mật khẩu.');
      } else {
        if (tk == '') {
          setSpantk('Vui lòng nhập tài khoản.');
        } else {
          setSpantk('.');
        }

        if (mk == '') {
          setSpanmk('Vui lòng nhập mật khẩu.');
        } else {
          setSpanmk('.');
        }

        if (mk != '' && mk != cfmk) {
          setSpancf('Mật khẩu nhập lại không khớp.');
        } else {
          setSpancf('.');
        }
      }

      fetch('http://localhost:3000/users')
        .then((res) => res.json())
        .then((data) => {
          authen(data);
        });
      function authen(data) {
        let flag = '';
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
          if (mk != '' && cfmk != '' && mk == cfmk) {
            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(useAuthen),
            });
            ShowSuccessToast('Đăng ký thành công');
          }
        } else if (flag == true) {
          setSpantk('Tài khoản tồn tại');
        }
      }
    }
  }
  function handleSubmitdn(fborgg) {
    if (fborgg) {
console.log(fborgg);
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'levanduc',
        },
        body: JSON.stringify({ id: fborgg.id, name: fborgg.tk , img:fborgg.img }),
      })
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1);
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
              console.log(res.status);
              if (res.status == 200) {
                localStorage.setItem('token', data1.accessToken);

                window.location.href = '/';
              }
            });
          }
        });
    } else {
      if (tk == '' && mk == '') {
        setSpantk('Vui lòng nhập tài khoản.');
        setSpanmk('Vui lòng nhập mật khẩu.');
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
              if (mk == '') {
                setSpanmk('Vui lòng nhập mật khẩu.');
                setSpantk(".")
              } else {
                setSpanmk('.');
                if (mk == data[i].mk) {
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
                  setSpantk('.');
                  setSpanmk('Mật khẩu không chính xác.');
                }
              }

              flag = true;
              break;
            }
          }
          if (flag == false) {
            setSpantk('Tài khoản không chính xác');
            setSpanmk('.');
          }
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
        <p style={spantk == '.' ? { visibility: 'hidden' } : { visibility: 'visible' }}>{spantk}</p>
        <input onChange={(e) => setMk(e.target.value)} type="password" placeholder="Mật khẩu..." />
        <p style={spanmk == '.' ? { visibility: 'hidden' } : { visibility: 'visible' }}>{spanmk}</p>
        <input
          onChange={(e) => setCfmk(e.target.value)}
          type="password"
          placeholder="Xác nhận mật khẩu..."
          style={common == 2 ? { display: 'none' } : { display: '' }}
        />
        <p style={spancf == '.' ? { visibility: 'hidden' } : { visibility: 'visible' }}>{spancf}</p>
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
