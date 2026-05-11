import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './LanguageContext';

import { Toaster } from 'react-hot-toast';

import './index.css'
import './App.css';
import './i18n.js';
import './toast.css';

// ===============================
// 🔥 AUTO LOGOUT (1 HOUR)
// ===============================
let timeout: any;

const resetTimer = () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    console.log('⏱ Session expired');

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = '/';
  }, 60 * 60 * 1000);
};

// 🔥 ACTIVITY EVENTS
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onkeydown = resetTimer;
window.onclick = resetTimer;
window.onscroll = resetTimer;

// ===============================
// 🔴 ERROR HANDLER (KEEP)
// ===============================
window.onerror = function (msg) {
  document.body.innerHTML = `
    <div
      style="
        min-height:100vh;
        background:#000;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:sans-serif;
      "
    >
      <div
        style="
          background:linear-gradient(135deg,#050505,#17001f);
          border:1px solid #7c3aed;
          border-radius:24px;
          padding:30px;
          color:white;
          width:420px;
          box-shadow:0 0 40px rgba(124,58,237,0.45);
        "
      >
        <div
          style="
            display:flex;
            align-items:center;
            gap:15px;
            margin-bottom:20px;
          "
        >
          <img
  src="/assets/kasuku-logo.png"
  style={{
    width: 45,
    height: 45,
    borderRadius: 14,
    objectFit: 'cover',
    border: '2px solid #ff004c',
  }}
/>

          <div>
            <div
              style="
                font-size:22px;
                font-weight:700;
                background:linear-gradient(90deg,#ff004c,#7c3aed);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
              "
            >
              Kasuku
            </div>

            <div
              style="
                color:#aaa;
                font-size:13px;
              "
            >
              System Notification
            </div>
          </div>
        </div>

        <div
          style="
            background:#0d0d0d;
            border:1px solid #222;
            padding:16px;
            border-radius:14px;
            color:#ff4d6d;
            font-weight:600;
          "
        >
          ${msg}
        </div>
      </div>
    </div>
  `;
};

// ===============================
// 🚀 APP
// ===============================
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>

      <App />

      {/* 🔥 GLOBAL KASUKU TOASTS */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={15}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 5000,

          className: 'kasuku-toast',

          style: {
            background:
              'linear-gradient(135deg,#050505,#17001f)',

            color: '#ffffff',

            border:
              '1px solid rgba(124,58,237,0.5)',

            borderRadius: '22px',

            padding: '18px',

            boxShadow:
              '0 0 35px rgba(124,58,237,0.45)',

            backdropFilter: 'blur(12px)',

            fontWeight: '600',

            minWidth: '350px',
          },

          success: {
            iconTheme: {
              primary: '#ff004c',
              secondary: '#ffffff',
            },
          },

          error: {
            iconTheme: {
              primary: '#ff004c',
              secondary: '#ffffff',
            },
          },
        }}
      />

    </LanguageProvider>
  </React.StrictMode>,
)