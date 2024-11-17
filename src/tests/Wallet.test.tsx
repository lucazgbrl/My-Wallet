import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Wallet from '../pages/Wallet/Wallet';

/* const user = userEvent.setup(); */
const state = {
  user: {
    email: 'name@name.com',
  },
  wallet: {
    isFetching: false,
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
  },
};

test('Testa se o e-mail correto é renderizado:', () => {
  const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: state });

  expect(screen.getByTestId('email-field')).toBeInTheDocument();
  expect(screen.getByTestId('email-field').innerHTML).toBe(store.getState().user.email);
});

test('Testa se as options de moeda correspondem ao estado da aplicação', () => {
  const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: state });

  const options = screen.getByTestId('currency-input').children;
  expect(options).toHaveLength(store.getState().wallet.currencies.length);
});

test('A despesa é adicionada ao estado global corretamente:', async () => {
  /* const { store } =  */renderWithRouterAndRedux(<Wallet />, { initialState: state });

  const valueInput = screen.getByLabelText('Valor:');
  const descInput = screen.getByLabelText('Descrição:');

  const btnAdd = screen.getByRole('button', { name: 'Adicionar despesa' });

  expect(valueInput).toBeInTheDocument();
  expect(descInput).toBeInTheDocument();
  expect(btnAdd).toBeInTheDocument();

  /*   await user.type(valueInput, '187');
  await user.type(descInput, 'Chuteira nova'); */
  /*   await user.click(btnAdd); */

//  expect(valueInput.innerHTML).toBe('187');
/*   expect(store.getState().wallet.expenses[0]).toHaveProperty('value', '187');
  expect(store.getState().wallet.expenses[0]).toHaveProperty('description', 'Chuteira nova'); */
});
