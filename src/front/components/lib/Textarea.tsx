import { FC } from 'react';

type TextareaProps = {
  maxLength?: number;
  cols?: number;
  rows?: number;
};

export const Textarea: FC<TextareaProps> = ({ cols, rows, maxLength }) => {
  return <textarea cols={cols} rows={rows} maxLength={maxLength}></textarea>;
};
