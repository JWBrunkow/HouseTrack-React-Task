import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './js/main/App';
import reportWebVitals from './js/main/ReportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// Have to keep this here because I used create-react-app. Maybe consider another package manager going forward