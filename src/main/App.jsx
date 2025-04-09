import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes.jsx'

export default function App() {

    const [cod, setCod] = useState();
    const [produto, setProduto] = useState({});

    const dados = { cod: cod, produto: produto };
    const setters = { setCod: setCod, setProduto: setProduto };

    return (
    <BrowserRouter>
        <Routes dados={dados} setters={setters}/>
    </BrowserRouter>
)}