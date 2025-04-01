import './Venda.css'
import React, { useEffect } from "react";
import { useState } from 'react';

function Venda() {
    const [selecionado, setSelecionado] = useState({})

    function trySearch(cod){
        const config = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({cod: cod})
        }
        fetch("/buscarProduto",config)
        .then(r => {
            if(r.status == 200){
                return r.json()
            }
            return undefined
        })
        .then(produto => {
            setSelecionado(produto)
        })
    }

    return (
        <div className="Venda">
            <div className="input_venda">
                Codigo <br/>
                <input onChange={(e) => {if(!isNaN(parseInt(e.target.value))) {trySearch(e.target.value)} else setSelecionado(undefined)}}></input><br/>
                <input readOnly value={selecionado?selecionado.nome:""}></input> <br/>
                Quantidade <input readOnly/> <br/>
                Desconto <input readOnly/> <br/>
                Valor unitário <input readOnly/> <br/>
                Subtotal <input readOnly/>
            </div>
            <div className="output_venda">
                <table className='table_venda'>
                    <thead>
                        <th>Produto</th>
                        <th>Qtde</th>
                        <th>Unitário</th>
                        <th>Deconto</th>
                        <th>Total</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div className='result_venda'>
                    VALOR TOTAL
                    R$ 1243.96
                    <div className='actions_venda'>
                        <button>Cancelar</button>
                        <button>Receber e finalizar</button>
                    </div>
                </div>
            </div>
        </div>
)}

export default Venda;