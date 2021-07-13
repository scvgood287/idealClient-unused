import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'client/Root';
// import registerServiceWorker from './registerServiceWorker';
import 'index.css';

import reportWebVitals from 'reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
// registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
