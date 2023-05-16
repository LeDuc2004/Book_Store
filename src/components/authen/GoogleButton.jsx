import React from "react";
import GoogleLogin from "react-google-login";

function GoogleButton() {
    const clientId = "118219306920-94c7uh6uggg3b1jifmbuul0gkhbkl15g.apps.googleusercontent.com"
  const responseGoogle = (response) => {
    const user = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      image: response.profileObj.imageUrl,
      accessToken: response.accessToken,
      googleId:response.profileObj.googleId
    };

  };

  const onFailure = (error) => {
  };

  return (
    <GoogleLogin
      clientId="118219306920-94c7uh6uggg3b1jifmbuul0gkhbkl15g.apps.googleusercontent.com"
      buttonText="Log in with  Google"
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleButton;
