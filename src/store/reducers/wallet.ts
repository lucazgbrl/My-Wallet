import { ActionTypes } from '../actions';
import { Expense } from '../../types';

// Defina a estrutura do estado
interface WalletState {
  isFetching: boolean;
  currencies: string[];
  expenses: Expense[];
  errorMessage?: string;
}

const INITIAL_STATE: WalletState = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

// Reducer
// eslint-disable-next-line max-len
function wallet(state = INITIAL_STATE, action: { type: string; payload?: any }): WalletState {
  switch (action.type) {
    case ActionTypes.REQ_STARTED:
      return {
        ...state,
        isFetching: true,
      };

    case ActionTypes.REQ_DONE:
      return {
        ...state,
        isFetching: false,
        currencies: action.payload,
        errorMessage: undefined, // Limpa erros anteriores
      };

    case ActionTypes.REQ_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    case ActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case ActionTypes.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((exp: Expense) => exp.id !== action.payload),
      };

    case ActionTypes.EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((exp: Expense) => {
          if (exp.id === action.payload.id) {
            return { ...exp, ...action.payload };
          }
          return exp;
        }),
      };

    default:
      return state;
  }
}

export default wallet;
