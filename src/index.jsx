import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import Nav from './Components/Nav/Nav';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Nav />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
