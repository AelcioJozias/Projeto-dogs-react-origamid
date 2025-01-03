import React from 'react';
import style from './Input.module.css';
import { Error } from '../../../Helper/Error';

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
}) {
  return (
    <div className={style.wrapper}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={style.input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Error error={error} />
    </div>
  );
}
