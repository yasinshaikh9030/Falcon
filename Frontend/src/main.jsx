// index.js or main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="306981742336-9v2kbvmjs97uuegnf89p0iah2g4nvs5h.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
