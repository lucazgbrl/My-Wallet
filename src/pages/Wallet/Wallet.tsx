/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Header from '../../components/Header';
import Table from '../../components/Table';
import WalletForm from '../../components/WalletForm';
import { RootState } from '../../types';

function Wallet() {
  const { expenses } = useSelector((state: RootState) => state.wallet);

  const [editingExpense, setEditingExpense] = useState<{ id: number; form: any } | null>(null); // Gerencia o estado de edição

  const hasExpenses = Array.isArray(expenses) && expenses.length > 0;

  return (
    <main className="wallet-main">
      <Header />
      <WalletForm
        editingExpense={ editingExpense }
        setEditingExpense={ setEditingExpense } // Passa o setter para o WalletForm
      />
      {hasExpenses ? (
        <Table
          expenses={ expenses }
          setEditingExpense={ setEditingExpense } // Passa a função de edição para o Table
        />
      ) : (
        <p className="no-expenses">Nenhuma despesa registrada</p>
      )}
    </main>
  );
}

export default Wallet;
