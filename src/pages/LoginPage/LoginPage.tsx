import React from 'react';
import getConstants from '../../config/constants';
import useFacebookSdk from '../../hooks/useFacebookSdk';
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

  const navigate = useNavigate()
  // Use the custom hook to load and initialize the Facebook SDK
  useFacebookSdk(getConstants().FACEBOOK_APP_ID, 'v12.0');

  const handleLogin = () => {
    window.FB.login(response => {
      if (response.authResponse && response.authResponse.accessToken) {
        localStorage.setItem('token',response.authResponse.accessToken)
        localStorage.setItem('userId',response.authResponse.userID)
        navigate('/dashboard')
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email,pages_show_list,pages_read_engagement' });
  };


  return (
    <div className="min-h-full flex items-center justify-center">
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg text-center">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
        alt="Login Visual"
        className="mb-4 w-full rounded-lg"
      />
      <CustomButton onClick={handleLogin}>
        Login with Facebook
      </CustomButton>
    </div>
    </div>
  );
};

export default LoginPage;
