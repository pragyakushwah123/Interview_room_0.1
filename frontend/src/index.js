import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("hello world from index.js running successfully");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
