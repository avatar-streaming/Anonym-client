import React from "react";
import useLogin from "../../hooks/useLogin";

function Login() {
  const isLogin = useLogin();

  return (
    <div className="login-container">
      <div className="login-container__title">
        Anonym
      </div>
      <button
        className="login-container__login"
        onClick={() => {
          isLogin(true);
        }}
        data-testid="login"
      >
        Goggle Login
      </button>
    </div>
  );
}

export default Login;
