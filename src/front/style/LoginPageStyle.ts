import styled from "styled-components";

// style定義
export const InputUserInfo = styled.input`
  text-align: left;
  width: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #007bff; /* 鮮やかなボーダー色 */
  border-radius: 8px; /* 角丸 */
  background-color: #f0f8ff; /* 明るい背景色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影の追加 */
  display: flex;

  &:focus {
    border-color: #ff4500; /* フォーカス時にボーダー色を変更 */
    box-shadow: 0 0 8px rgba(255, 69, 0, 0.6); /* フォーカス時に影を強調 */
    outline: none; /* デフォルトのアウトラインを削除 */
  }

  &:hover {
    background-color: #e0ffff; /* ホバー時の背景色変更 */
  }
`;

export const LoginButton = styled.button`
  width: 210px;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff; /* ボタンの背景色 */
  color: white; /* テキストの色 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* トランジション効果 */

  &:hover {
    background-color: #0056b3; /* ホバー時の背景色変更 */
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 98vh;
  background-size: 100%;
  background-image: url(https://images4.alphacoders.com/132/1321259.png); /* 背景色 */
`;

export const Form = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const PasswordResetLink = styled.a`
  max-width: 78px;
  font-size: 8px;
  color: blue;
  display: flex;
  text-decoration: underline;

  &:hover {
    color: red;
  }
`;