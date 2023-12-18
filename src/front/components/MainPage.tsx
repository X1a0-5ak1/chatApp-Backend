import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const LogoutAction = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button id="fakeButton" onClick={() => alert("ログイン完了なりよ☆")}>
        (´・ω・｀)
      </button>
      <button id="logoutButton" onClick={LogoutAction}>
        LOGOUT
      </button>
    </>
  );
}
