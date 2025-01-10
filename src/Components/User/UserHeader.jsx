import React, { useEffect, useState } from 'react';
import UserHeaderNav from './UserHeaderNav';
import style from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

const setHeaderTitle = (pathname, setTitle) => {
  switch (pathname) {
    case '/conta/postar':
      setTitle('Poste sua foto');
      break;
    case '/conta/estatisticas':
      setTitle('Estatísticas');
    default:
      setTitle('Conta');
  }
};

const UserHeader = () => {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    setHeaderTitle(pathname, setTitle);
  }, [location]);

  return (
    <header className={style.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
