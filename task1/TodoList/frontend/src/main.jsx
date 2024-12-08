import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'
import UserContextProvider from './context/UserContextProvider.jsx';
import Todo from './pages/todo/todo.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-n3u88vx113nbk658.us.auth0.com"
      clientId="xjRkEmkfVhYbVDDeIE9PQaIVpuf7bKkY"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Auth0Provider>,
  </StrictMode>,
)
