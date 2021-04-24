import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// const socket = io({ path: '/api/socket.io' });
// socket.on('connect', () => {
//   console.log('connected');
//   socket.emit('message', 'yoav');
// });
