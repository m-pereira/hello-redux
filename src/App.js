import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
