import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 import Chat from './Pages/ChatPage.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Chat/>
  </StrictMode>,
)
