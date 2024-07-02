import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }, [navigate]);

    return <Component {...props as P} />;
  };

  return AuthComponent;
};

export default withAuth;
