import React, { useEffect } from "react";
import { Link } from "react-router";
import { useState } from 'react';

export default function AddProduto() {

    const [cod, setCode] = useState();
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(-1);
    const [quantidade, setQuantidade] = useState(-1);
    const [produtos, setProdutos] = useState([])
    const [carrinho, setCarrinho] = useState([])

    const produto = {}
        if(nome !== "") produto.nome = nome
        if(preco !== -1) produto.preco = preco
        if(quantidade !== -1) produto.quantidade = quantidade

    function registrar() {
        const config = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({cod: cod,nome: nome,preco: preco,quantidade: quantidade})
        }
        fetch("/criarProduto",config).then(ler)
    }
    function ler() {
        fetch("/lerProduto")
        .then(r => r.json())
        .then(lista => setProdutos(lista))
    }

    function getProduto() {
        
        return produto
    }

    return (
        <div className="form">
                <div className="colummn">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Codigo</label>
                            <input type="text" className="form-control"
                                name="cod"
                                onChange={(e) => setCode(e.target.value)}
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

                        <button className="btn btn-secondary ml-2">
                            <Link to="/estoque">
                                Cancelar
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
    )
}