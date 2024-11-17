import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// Verifique se está no lado do cliente antes de acessar o `window`
if (typeof window !== 'undefined' && window.Cypress) {
  window.store = store;
}

export default store;
