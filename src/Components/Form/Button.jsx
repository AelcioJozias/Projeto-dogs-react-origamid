import React from 'react';
import style from './Button.module.css';

export default function Button({ children, ...props }) {
  return (
    <button className={style.button} {...props}>
      {children}
    </button>
  );
}
