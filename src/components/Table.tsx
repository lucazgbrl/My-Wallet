/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../store/actions';
import TableRow from './TableRow';
import { Expense } from '../types';

function Table({ expenses, setEditingExpense }: { expenses: Expense[], setEditingExpense: React.Dispatch<React.SetStateAction<{
  id: number;
  form: any;
} | null>> }) {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => dispatch(deleteExpense(id));

  const handleEdit = (id: number) => {
    const expenseExist = expenses.find((expense) => expense.id === id);
    if (expenseExist) {
      setEditingExpense({ id: expenseExist.id, form: expenseExist }); // Define a despesa no estado de edição
    }
  };

  return (
    <section className="table-section">
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <TableRow
              key={ expense.id }
              expense={ expense }
              onDelete={ handleDelete }
              onEdit={ handleEdit } // Passa a função de edição para cada linha
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
