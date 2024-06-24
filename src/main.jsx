import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { google_client_id } from './utils/utils.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={google_client_id}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
)
