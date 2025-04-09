import React, { useEffect } from "react";
import { Link } from "react-router";
import { useState } from 'react';

export default function CriarProduto(state) {

    const [produtos, setProdutos] = useState([])
    const produto = state.dados.produto

    function setNome(nome) {
        const novoProduto = {nome: nome, preco:produto.preco, quantidade:produto.quantidade}
        state.setters.setProduto(novoProduto)
    }
    function setPreco(preco) {
        const novoProduto = {nome: produto.nome, preco:preco, quantidade:produto.quantidade}
        state.setters.setProduto(novoProduto)
    }
    function setQuantidade(quantidade) {
        const novoProduto = {nome: produto.nome, preco:produto.preco, quantidade:quantidade}
        state.setters.setProduto(novoProduto)
    }

    function registrar() {
        const config = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({cod: state.dados.cod, nome:produto.nome, preco:produto.preco, quantidade:produto.quantidade})
        }
        fetch("/criarProduto",config).then(ler)
        window.location.href = "./"
    }
    function ler() {
        fetch("/lerProduto")
        .then(r => r.json())
        .then(lista => setProdutos(lista))
    }

    return (
        <div className="form">
                <div className="colummn">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Codigo</label>
                            <input type="text" className="form-control"
                                name="cod"
                                onChange={(e) => state.setters.setCode(e.target.value)}
                                placeholder="Digite o código..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control"
                                name="preco"
                                onChange={(e) => setPreco(e.target.value)}
                                placeholder="Digite o preço..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="text" className="form-control"
                                name="quantidade"
                                onChange={(e) => setQuantidade(e.target.value)}
                                placeholder="Digite a quantidade..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={registrar}>
                            Salvar
                        </button>
                        
                        <Link to="/estoque">
                            <button className="btn btn-secondary ml-2">
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}