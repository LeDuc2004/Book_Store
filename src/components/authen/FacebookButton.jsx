import React from 'react';
import FacebookLogin from 'react-facebook-login';

function FacebookButton() {
  const responseFacebook = (response) => {
    
  };

  return (
    <div>
      <FacebookLogin
        appId="5916611618449616"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook} />
    </div>
  );
}

export default FacebookButton;
