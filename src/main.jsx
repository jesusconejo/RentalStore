import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StoreApp } from '../StoreApp'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <StoreApp/>
    </StrictMode>
  </BrowserRouter>
)
