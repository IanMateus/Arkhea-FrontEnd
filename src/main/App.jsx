import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes.jsx'
import Logo from '../components/templates/Logo.jsx'
import Nav from '../components/templates/Layout.jsx'
import Footer from '../components/templates/Footer.jsx'

export default function App() {
    return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
)}