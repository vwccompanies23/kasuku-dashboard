import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './LanguageContext';
import './index.css'
import './App.css';
import './i18n.js';

window.onerror = function (msg) {
  document.body.innerHTML = `<pre style="color:red">${msg}</pre>`;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)