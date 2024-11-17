/* eslint-disable max-len */
import { useEffect } from 'react';
import { Expense } from '../types';

function TableRow({ expense, onDelete, onEdit }: { expense: Expense, onDelete: (id: number) => {
  type: string;
  payload: number | undefined;
}, onEdit: (id: number) => void }) {
  const exchange = expense.exchangeRates[expense.currency];
  const convertedValue = (Number(exchange.ask) * Number(expense.value)).toFixed(2);

  useEffect(() => { }, [expense]);

  return (
    <tr>
      <td>{expense.description}</td>
      <td>{expense.tag}</td>
      <td>{expense.method}</td>
      <td>{Number(expense.value).toFixed(2)}</td>
      <td>{exchange.name}</td>
      <td>{Number(exchange.ask).toFixed(2)}</td>
      <td>{convertedValue}</td>
      <td>Real</td>
      <td>
        <button
          data-testid="delete-btn"
          onClick={ () => onDelete(expense.id) }
        >
          Del
        </button>
        <button
          data-testid="edit-btn"
          onClick={ () => onEdit(expense.id) } // Chama a função onEdit ao clicar no botão Editar
        >
          Editar
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
