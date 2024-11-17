import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './Login/Login.scss';
import './Wallet/Wallet.scss';
import App from '.';
import store from '../store';

const AppWithSSR = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Defina o estado para garantir que o código só seja executado no cliente
    setIsClient(true);
  }, []);

  // Renderize o conteúdo apenas no lado do cliente
  if (!isClient) return null;

  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default AppWithSSR;
