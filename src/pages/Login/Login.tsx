import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleUser } from '../../store/actions';
import { Dispatch } from '../../types';

function Login() {
  const nav = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const [btnState, setBtnState] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { value, name } = e.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'senha') {
      setPassword(value);
    }

    if (emailReg.test(email) && password.length > 4) {
      setBtnState(false);
    } else { setBtnState(true); }
  };

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(handleUser(email));
    nav('/carteira');
  };

  return (
    <main className="login-main">
      <h1>Login</h1>
      <form id="login-form" onSubmit={ handleClick }>
        <label htmlFor="email">
          E-mail:
          {' '}
          <input
            type="text"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ onChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          {' '}
          <input
            type="password"
            name="senha"
            id="senha"
            data-testid="password-input"
            value={ password }
            onChange={ onChange }
          />
        </label>
        <button
          type="submit"
          disabled={ btnState }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
