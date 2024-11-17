/* eslint-disable implicit-arrow-linebreak */
import { CurrencyType, Dispatch, FormState } from '../../types';

// Coloque aqui suas actions

export const ActionTypes = {
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  REQ_STARTED: 'REQ_STARTED',
  REQ_DONE: 'REQ_DONE',
  REQ_FAILED: 'REQ_FAILED',
  ADD_EXPENSE: 'ADD_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
};

const createAction = <T = void>(type: string, payload?: T) => ({ type, payload });

// eslint-disable-next-line max-len
export const handleUser = (text: string) => createAction<string>(ActionTypes.CHANGE_EMAIL, text);

function startedReq() {
  return createAction(ActionTypes.REQ_STARTED);
}

function doneReq(currencies: string[]) {
  return createAction<string[]>(ActionTypes.REQ_DONE, currencies);
}

function failedReq(error: string) {
  return createAction<string>(ActionTypes.REQ_FAILED, error);
}

/* type GetState = () => RootState; */

export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    dispatch(startedReq());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const data = await response.json();
      const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
      dispatch(doneReq(currencies));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      dispatch(failedReq(errorMessage));
    }
  };
}

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addExpense = (form: FormState, id: number, data: CurrencyType) =>
  createAction(ActionTypes.ADD_EXPENSE, {
    id,
    value: form.value,
    description: form.description,
    currency: form.currency,
    method: form.method,
    tag: form.tag,
    exchangeRates: { ...data },
  });

export const deleteExpense = (id: number) =>
  createAction<number>(ActionTypes.DELETE_EXPENSE, id);

export const editExpense = (id: number, form: FormState, data: CurrencyType) =>
  createAction(ActionTypes.EDIT_EXPENSE, {
    id,
    value: form.value,
    description: form.description,
    currency: form.currency,
    method: form.method,
    tag: form.tag,
    exchangeRates: { ...data },
  });
