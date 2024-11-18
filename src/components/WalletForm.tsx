import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, FormState, RootState, CurrencyType } from '../types';
import { addExpense, fetchCurrencies, editExpense } from '../store/actions';

const INITIAL_FORM: FormState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

type WalletFormProps = {
  editingExpense: { id: number; form: FormState } | null;
  setEditingExpense: (expense: { id: number; form: FormState } | null) => void;
};

function WalletForm({ editingExpense, setEditingExpense }: WalletFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [showForm, setShowForm] = useState(false); // Controla a visibilidade
  const dispatch: Dispatch = useDispatch();

  const simpleInputs = [
    { name: 'value', label: 'Valor' },
    { name: 'description', label: 'Descrição' },
  ];

  const selectInputs = [
    { name: 'method', label: 'Método de pagamento', options: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] },
    { name: 'tag', label: 'Categoria', options: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte'] },
  ]


  const currencies = useSelector((state: RootState) => state.wallet.currencies);

  // Atualiza o formulário no modo de edição
  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense.form);
      setShowForm(true); // Exibe o formulário para edição
    }
  }, [editingExpense]);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm: FormState) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates: CurrencyType = await response.json();

    if (editingExpense) {
      // Atualiza despesa existente
      dispatch(editExpense(editingExpense.id, form, exchangeRates));
      setEditingExpense(null); // Sai do modo de edição
    } else {
      // Adiciona uma nova despesa
      dispatch(addExpense(form, Date.now(), exchangeRates));
    }

    setForm(INITIAL_FORM);
    setShowForm(false);
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setEditingExpense(null); // Sai do modo de edição, se estiver
    setShowForm(false); // Oculta o formulário
  };

  return (
    <main id="form-main">
      {!showForm ? (
        <section className="start-section">
          <button className="btn-show-form" onClick={ () => setShowForm(true) }>
            Nova Despesa
          </button>
        </section>
      ) : (
        <section className="form-section">
          <form className="expForm" onSubmit={ handleSubmit }>
            {simpleInputs.map((input) => (
              <label key={ input.name } htmlFor={ input.name }>
                {input.label}:
                <input
                  type={ input.name === 'value' ? 'number' : 'text' }
                  name={ input.name }
                  id={ input.name }
                  data-testid={ `${input.name}-input` }
                  value={ form[input.name as keyof FormState] }
                  onChange={ handleChange }
                />
              </label>
            ))}
            {selectInputs.map((input) => (
              <label key={ input.name } htmlFor={ input.name }>
                {input.label}:
                <select
                  name={ input.name }
                  id={ input.name }
                  data-testid={ `${input.name}-input` }
                  value={ form[input.name as keyof FormState] }
                  onChange={ handleChange }
                >
                  {input.options.map((option) => (
                    <option key={ option } value={ option }>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {/* Campo de seleção de moeda */}
            <label htmlFor="currency">
              Moeda:
              <select
                id="currency"
                name="currency"
                data-testid="currency-input"
                value={ form.currency }
                onChange={ handleChange }
              >
                {currencies.map((curr) => (
                  <option key={ curr } value={ curr }>
                    {curr}
                  </option>
                ))}
              </select>
            </label>
            {/* Outros campos: method, tag */}
            <button type="submit">
              {editingExpense ? 'Salvar Alterações' : 'Incluir Despesa'}
            </button>
            <button type="button" onClick={ handleCancel }>
              Cancelar
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

export default WalletForm;
