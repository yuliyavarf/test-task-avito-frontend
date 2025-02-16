import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Убедитесь, что этот путь соответствует вашему файлу App.js
import './index.css'; // Если у вас есть стили

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);