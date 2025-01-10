import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../../UserContext';
import Feed from '../../Assets/feed.svg?react';
import Stats from '../../Assets/estatisticas.svg?react';
import GoOut from '../../Assets/sair.svg?react';
import AddPhoto from '../../Assets/adicionar.svg?react';
import styles from './UserHeaderNav.module.css';

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const [mobile, setMobile] = useState(false);
  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        {' '}
        <Feed />
        {mobile && 'Minhas fotos'}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Stats />
        {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="/conta/postar">
        <AddPhoto />
        {mobile && 'Adicionar foto'}
      </NavLink>
      <button onClick={userLogout}>
        <GoOut />
        {mobile && 'Sair'}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
