import React from 'react';

const CASDOOR_LOGIN_URL = import.meta.env.VITE_BACKEND_URL + '/auth/login';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = CASDOOR_LOGIN_URL;
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Login with Casdoor
    </button>
  );
};

export default LoginButton;
