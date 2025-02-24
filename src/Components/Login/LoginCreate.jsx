import React, { useContext } from 'react';
import Input from '../Form/Input';
import useForm from '../../../Hooks/useForm';
import Button from '../Form/Button';
import { USER_POST } from '../../../api';
import UserContext from '../../../UserContext';
import { useFetch } from '../../../Hooks/useFetch';
import { Error } from '../../../Helper/Error';
import Head from '../../../Helper/Head';

export default function LoginCreate() {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  const { loading, error, request } = useFetch();

  const { userLogin } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const isUsernameValid = username.validate();
    const isEmailValid = email.validate();
    const isPasswordValid = password.validate();
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) {
        await userLogin(username.value, password.value);
      }
    }
  }

  return (
    <section>
      <Head title="Criar sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
}
