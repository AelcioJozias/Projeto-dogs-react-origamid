import React, { useEffect } from 'react';
import Input from '../Form/Input';
import { useFetch } from '../../../Hooks/useFetch';
import useForm from '../../../Hooks/useForm';
import Button from '../Form/Button';
import { PASSWORD_RESET } from '../../../api';
import { Error } from '../../../Helper/Error';
import { useNavigate } from 'react-router-dom';

export default function LoginPasswordReset() {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password.validate()) return;
    const { url, options } = PASSWORD_RESET({
      login: login,
      key: key,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) navigate('/login');
  };

  return (
    <div>
      <h1 className="title">Resete a senha</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled> Resetando... </Button>
        ) : (
          <Button> Resetar </Button>
        )}
      </form>
      <Error error={error} />
    </div>
  );
}
