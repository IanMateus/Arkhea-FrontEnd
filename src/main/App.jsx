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

    const [errorModal, setErrorModal] = useState(false);
    const [errorName, setErrorName] = useState("Mensagem de erro");
    const [errorMessage, setErrorMessage] = useState("Algo deu errado, contate o profissional especializado");
    const [errorOnConfirm, setErrorOnConfirm] = useState(() => () => {})
    const [errorOnCancel, setErrorOnCancel] = useState(() => () => {})

    return (
    <BrowserRouter>
        <Routes dados={dados} setters={setters} 
            error_state={
                {  
                active: errorModal, setActive: setErrorModal,
                name: errorName, setName: setErrorName,
                message: errorMessage, setMessage: setErrorMessage,
                onConfirm: errorOnConfirm, setOnConfirm: setErrorOnConfirm,
                onCancel: errorOnCancel, setOnCancel: setErrorOnCancel,
                }
            }/>
    </BrowserRouter>
)}