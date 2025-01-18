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
  const isUserOnMobileScreen = useMedia('(max-width: 40rem)');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    function closeMenuOnChooseAnOption() {
      setShowMobileMenu(false);
    }
    closeMenuOnChooseAnOption();
  }, [pathname]);

  return (
    <>
      {isUserOnMobileScreen && (
        <button
          className={`${styles.mobileButton} ${
            showMobileMenu && styles.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      )}
      <nav
        className={`${isUserOnMobileScreen ? styles.mobileNav : styles.nav} ${
          showMobileMenu ? styles.mobileButtonActive : styles.nav
        }`}
      >
        <NavLink to="/conta" end>
          {' '}
          <Feed />
          {isUserOnMobileScreen && 'Minhas fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Stats />
          {isUserOnMobileScreen && 'Estatísticas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <AddPhoto />
          {isUserOnMobileScreen && 'Adicionar foto'}
        </NavLink>
        <button onClick={userLogout}>
          <GoOut />
          {isUserOnMobileScreen && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
