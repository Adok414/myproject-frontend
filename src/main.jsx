import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppleDetails from './components/AppleDetails.jsx'
import Layout from './components/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/Apples/:id' element={<AppleDetails />} />
        </Routes>
    </BrowserRouter>
    </Layout>
    
  
  </StrictMode>,
)
