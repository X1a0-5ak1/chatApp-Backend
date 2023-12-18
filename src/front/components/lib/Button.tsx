import {FC} from 'react';


type ButtonType = 'submit' | 'send';

type ButtonProps = {
  title: string,
  onClick: () => void,
  id?: ButtonType,
}

export const Button: FC<ButtonProps> = ({title,onClick,id}) =>{
  return(
    <button onClick={onClick} id={id}>
      {title}
    </button>
  )
}


/* ボタンコンポーネント。送信ボタン、ログインボタン用  */