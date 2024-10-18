import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './bootstrap.min.css'
import './index.css'
import cartStore from './Redux/CartStore'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={cartStore}>
      <App />
    </Provider>
     
    </BrowserRouter>
   
    
  </StrictMode>,
)
