import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes.jsx'

export default function App() {
    return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
)}