import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container,Form,InputUserInfo,PasswordResetLink,LoginButton } from "../style/LoginPageStyle";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // ログイン認証ロジック
    if (username === "user" && password === "password") {
      console.log("ログイン成功");
      // 認証状態を保存する処理
      sessionStorage.setItem("token", "sample_token");
      navigate("/home");
    } else {
      // 認証失敗
      alert("Invalid credentials");
    }
  };

  return (
    <Container>
      <Form>
        <h2>Login</h2>
        <label>
          <InputUserInfo
            type="userID"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder="example@raft-works.com"
          />
        </label>
        <label>
          <InputUserInfo
            type="password"
            value={password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </label>
        <PasswordResetLink
          onClick={() => {
            navigate("/passwordreset");
          }}>
          Forgot Password...?
        </PasswordResetLink>
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </Form>
    </Container>
  );
}
