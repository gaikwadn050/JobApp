import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css'
import axios from 'axios'

import customFetch from '../../utils/customFetch.js'

//customFetch.get('/test').then((data) => console.log(data));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center'/>
  </React.StrictMode>,
)
