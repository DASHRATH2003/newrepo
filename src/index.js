import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { JobProvider } from "./components/context/JobContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JobProvider> {/* ✅ Wrap App inside JobProvider */}
      <App />
    </JobProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
