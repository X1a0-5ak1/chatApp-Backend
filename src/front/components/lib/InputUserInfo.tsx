import { FC, useState } from 'react';
import '../../style/InputUserInfo.css';

type InputUserInfoProps = {
  onSubmit: (userId: string, password: string) => void;
  id?: string;
};

export const InputUserInfo: FC<InputUserInfoProps> = ({ onSubmit }, id) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(userId, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputUserInfoContainer">
        <h1>ログイン</h1>
        <label>
          メールアドレス
          <br />
          <input type="ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          パスワード
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button id="submit" className="inputUserInfoContainer">
          ログイン
        </button>
      </div>
    </form>
  );
};

//仮作成パスワード合ってる？ってのを調べる
// export function judgePass(inputValue: string) {
//   return inputValue === 'PassWord1234';
// }
