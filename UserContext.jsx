import React, { createContext, useEffect, useState } from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          await getUser(token);
          if (!response.ok) throw new Error('Invalid Token');
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, []);

  async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('token');
    navigate('/login');
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({
        username,
        password,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Usuário inválido`);
      const { token } = await response.json();
      localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  const getUser = async (token) => {
    const { url, options } = USER_GET(token, data);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  };

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
