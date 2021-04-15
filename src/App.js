import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyles />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
