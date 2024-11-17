import { useSelector } from 'react-redux';
import Image from 'next/image'
import { RootState } from '../types';

function calculateTotal(expenses: RootState['wallet']['expenses']): number {
  return expenses.reduce(
    // eslint-disable-next-line max-len
    (acc, curr) => acc + Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask),
    0,
  );
}

function Header() {
  const { user, wallet } = useSelector((state: RootState) => ({
    user: state.user,
    wallet: state.wallet,
  }));

  const total = calculateTotal(wallet.expenses);

  return (
    <header className="App-header">
      <Image src="/carteira.png" alt="logo" width={100} height={100} />
      <p className="email" data-testid="email-field">
        Email:
        {' '}
        {user.email}
      </p>
      <p className="total" data-testid="total-field">
        Total Gasto:
        {' '}
        {total.toFixed(2)}
      </p>
      <p className="currency" data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
