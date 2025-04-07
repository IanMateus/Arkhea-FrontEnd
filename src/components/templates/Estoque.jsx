import React, { useEffect } from "react";

import { useState } from 'react';
import Header from "./Header";
import Crud from "../functions/crud";
import { Link } from "react-router";

export default function Estoque() {

    const [cod, setCode] = useState();
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(-1);
    const [quantidade, setQuantidade] = useState(-1);
    const [search, setSearch] = useState("");
    const [produtos, setProdutos] = useState([])
    const [carrinho, setCarrinho] = useState([])

    function ler() {
        fetch("/lerProduto")
        .then(r => r.json())
        .then(lista => setProdutos(lista))
    }

    function deletar(codigo) {
        console.log("deletando...")
        const config = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({cod: codigo})
        }
        fetch("/deletarProduto",config).then(ler)
    }

    function filter(field, value){
        return produtos.filter((v) => {
            return v[field].toLowerCase().includes(value.toLowerCase()) 
        })
    }

    function renderTable() {
        return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>Cod</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
        )
    }

    function renderRows() {
        return filter("nome",search).map(produto => {
            const props = {
                cod: produto.cod,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: produto.quantidade
            }
            return (
                <tr key={produto.cod}>
                    <td>{produto.cod}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.quantidade}</td>
                    <td>
                        <button className="btn btn-warning">
                            <Link to='/estoque/editProduto' state={{...props}}>
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => deletar(produto.cod)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    const lerBanco = useEffect(() => {
        ler()
    }, [])

    return (
        <div>
            <div>
                <Header filter={setSearch}/>
            </div>
            <div>
                {renderTable()}
            </div>
        </div>
    )}