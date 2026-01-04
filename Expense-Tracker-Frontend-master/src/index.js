import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import App2 from './ReactReudx/App2';

//import Store from './ReactReudx/Store';
//import { Provider } from 'react-redux';
import App4 from './App4';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    // <Provider store={Store}>
    //     <App2 />
    //  </Provider>

    <App4/ >

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
