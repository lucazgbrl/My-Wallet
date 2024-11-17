import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Usuário
export type User = {
  email: string;
};

// Código da moeda
export type CurrencyCode = string;

// Tipagem para taxas de câmbio
export type CurrencyType = {
  [key: CurrencyCode]: {
    code: string; // Código da moeda, como "USD"
    ask: number; // Valor numérico do câmbio
    name: string; // Nome da moeda
  };
};

// Estado do formulário de despesas
export type FormState = {
  value: string; // Valor como string para entrada do formulário
  description: string; // Descrição da despesa
  currency: string; // Código da moeda (ex.: "USD")
  method: string; // Método de pagamento (ex.: "Dinheiro")
  tag: string; // Categoria da despesa (ex.: "Alimentação")
};

// Despesa registrada
export type Expense = {
  id: number; // ID único da despesa
  value: string | number; // Valor em string (formulário) ou número (processamento)
  description: string; // Descrição da despesa
  currency: string; // Código da moeda
  method: string; // Método de pagamento
  tag: string; // Categoria da despesa
  exchangeRates: CurrencyType; // Taxas de câmbio
};

// Estado global da aplicação
export type RootState = {
  user: User;
  wallet: {
    expenses: Expense[]; // Lista de despesas
    currencies: string[]; // Lista de códigos de moedas
    isFetching: boolean; // Indicador de carregamento
    errorMessage?: string; // Mensagem de erro opcional
  };
};

// Tipo para Dispatch com suporte ao Redux Thunk
export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;
