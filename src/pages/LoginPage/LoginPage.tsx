import React from 'react';
import FacebookLogin from 'react-facebook-login';

const LoginPage: React.FC = () => {

  const responseFacebook = () => {
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <FacebookLogin
        appId="your-facebook-app-id"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded-md focus:outline-none"
        icon="fa-facebook"
        textButton="Login with Facebook"
      />
  </div>
  );
};

export default LoginPage;
