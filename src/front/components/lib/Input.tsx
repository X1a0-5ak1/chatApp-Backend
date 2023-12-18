import { FC, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  type?: 'text' | 'number' | 'password';
  className?: string;
};

export const Input: FC<InputProps> = ({ type, value, className = '', error = false, ...props }) => {
  return <input type={type} value={value} className={`${className} ${error ? 'error' : ''}`} {...props} />;
};
