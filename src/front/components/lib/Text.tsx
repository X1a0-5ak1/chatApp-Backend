import { FC } from 'react';

type textProps = {
  text: string;
  className?: string;
};

export const Text: FC<textProps> = ({ text, className = '' }) => {
  return <p className={className}>{text}</p>;
};

/*
簡易的に記載・・・仕組みとしては、ただ単純にPタグで文字列を出力させるだけのコンポ
これを元にした学習用の書籍によると、スタイル定義を他に追加したりすることによって、後ほどcss等の調節にクラス名とかが入れられるからだいぶ自由度高めに開発できるらしい。
後々の拡張性も考慮し、文字列の出力には当テキストを用いつつ活用するのはありかもしれない。

該当書籍：「手を動かしながら学ぶ TypeScript」(著：渡邉比呂樹、鴇田将克、森本新之助) P232~
*/
