import React from 'react'
import ReactDOM from 'react-dom/client'
import './layouts/App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
//import './index.css'
//import Layout from './layouts/index.jsx'
//import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
    {/* <Layout /> */}
  </React.StrictMode>,
)
