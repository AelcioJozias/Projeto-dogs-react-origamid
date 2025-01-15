import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import UserContext from '../../../UserContext';
import Feed from '../../Assets/feed.svg?react';
import Stats from '../../Assets/estatisticas.svg?react';
import GoOut from '../../Assets/sair.svg?react';
import AddPhoto from '../../Assets/adicionar.svg?react';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../../Hooks/useMedia';

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const isMobileScreen = useMedia('(max-width: 40rem)');
  const [showMobileMenu, setMobileMenu] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {isMobileScreen && (
        <button
          className={`${styles.mobileButton} ${
            showMobileMenu && styles.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!showMobileMenu)}
        ></button>
      )}
      <nav
        className={`${isMobileScreen ? styles.mobileNav : styles.nav} ${
          showMobileMenu ? styles.mobileButtonActive : styles.nav
        }`}
      >
        <NavLink to="/conta" end>
          {' '}
          <Feed />
          {isMobileScreen && 'Minhas fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Stats />
          {isMobileScreen && 'Estatísticas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <AddPhoto />
          {isMobileScreen && 'Adicionar foto'}
        </NavLink>
        <button onClick={userLogout}>
          <GoOut />
          {isMobileScreen && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
