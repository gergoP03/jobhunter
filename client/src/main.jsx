import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookieProvider } from './context/CookieContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/*<CookieProvider>*/ }
      <App />
    {/*</CookieProvider> */}
  </React.StrictMode>,
)
