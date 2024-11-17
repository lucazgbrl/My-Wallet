import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Login from '../pages/Login/Login';

const email = 'name@name.com';

test('Os campos de email e senha existem: ', () => {
  const state = {
    user: {
      email: '',
    },
  };

  renderWithRouterAndRedux(<Login />, { initialState: state });

  expect(screen.getByLabelText('E-mail:')).toBeInTheDocument();
  expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
});

test('O botão entrar começa desativado e ativa quando os critérios são satisfeitos:', async () => {
  const state = {
    user: {
      email: '',
    },
  };

  renderWithRouterAndRedux(<Login />, { initialState: state });

  const emailInput = screen.getByLabelText('E-mail:');
  const passInput = screen.getByLabelText('Senha:');
  const btnIn: HTMLButtonElement = screen.getByRole('button', { name: 'Entrar' });

  expect(btnIn.disabled).toBe(true);

  const user = userEvent.setup();

  await user.type(emailInput, email);
  await user.type(passInput, '1234567');

  expect(btnIn.disabled).toBe(false);
});

test('Os dados do usuário são salvos no estado global: ', async () => {
  const state = {
    user: {
      email: '',
    },
  };

  const { store } = renderWithRouterAndRedux(<Login />, { initialState: state });

  const emailInput = screen.getByLabelText('E-mail:');
  const passInput = screen.getByLabelText('Senha:');
  const btnIn: HTMLButtonElement = screen.getByRole('button', { name: 'Entrar' });
  const user = userEvent.setup();

  await user.type(emailInput, email);
  await user.type(passInput, '1234567');

  await user.click(btnIn);
  expect(store.getState().user.email).toBe(email);
});
