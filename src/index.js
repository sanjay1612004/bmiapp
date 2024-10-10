import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';

import reportWebVitals from './reportWebVitals';
// import Bmi2 from 'Bmi2';
import 'bootstrap/dist/css/bootstrap.min.css'
import Bmi2 from './Bmi2';
// import Bmi2 from './Bmi2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Bmi2/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
