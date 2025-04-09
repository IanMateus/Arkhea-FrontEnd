import React, { useEffect } from "react";

import { useState } from 'react';
import Header from "./Header";
import { Link } from "react-router";

export default function Estoque(state) {

    const [search, setSearch] = useState("");
    const [searchField, setSearchField] = useState("nome");
    const [classiField, setClassiField] = useState("nome");
    const [asc, setAsc] = useState(true);
    const [produtos, setProdutos] = useState([])

    function setEstados(produtoInteiro){
        const {cod, ...produto} = produtoInteiro
        state.setters.setCod(cod)
        state.setters.setProduto(produto)
    }

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

    function filter(value){
        let v = value[searchField]
        if(typeof(value[searchField]) === "string"){
            v = value[searchField].toLowerCase()
        } 

        let s = search
        if(typeof(search) === "string"){
            s = search.toLowerCase()
        }

        return v.includes(s)
    }

    function classify(first, second){
        let f = first[classiField]
        if(typeof(first[classiField]) === "string"){
            f = first[classiField].toLowerCase()
        }

        let s = second[classiField]
        if(typeof(second[classiField]) === "string"){
            s = second[classiField].toLowerCase()
        }

        return (f > s ? 1 : -1) * (asc ? 1 : -1)
    }

    function changeClassi(field){
        if(classiField === field){
            setAsc(!asc)
        }else{
            setClassiField(field)
            setAsc(true)
        }
    }

    function renderTable() {
        return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th onClick={() => {changeClassi("cod")}}>Cod</th>
                    <th onClick={() => {changeClassi("nome")}}>Nome</th>
                    <th onClick={() => {changeClassi("preco")}}>Preço</th>
                    <th onClick={() => {changeClassi("quantidade")}}>Quantidade</th>
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
        return produtos.filter(filter).sort(classify).map(produto => {
            return (
                <tr key={produto.cod}>
                    <td>{produto.cod}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.quantidade}</td>
                    <td>
                        <button id="btn-plus" className="btn btn-modify" onClick={() => {setEstados(produto)}}>
                            <Link className="row_button plus" to='/estoque/adicionarProduto'>
                                <i className="fa fa-plus"></i>
                            </Link>
                        </button>
                        <button id="btn-minus" className="btn btn-modify" onClick={() => {setEstados(produto)}}>
                            <Link className="row_button minus" to='/estoque/subtrairProduto'>
                                <i className="fa fa-minus"></i>
                            </Link>
                        </button>
                        <button className="btn btn-warning" onClick={() => {setEstados(produto)}}>
                            <Link className="row_button pencil" to='/estoque/editarProduto'>
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