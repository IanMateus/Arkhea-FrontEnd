import React from "react";

import { useState } from 'react';


function Crud() {
    const [cod, setCode] = useState();
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(-1);
    const [quantidade, setQuantidade] = useState(-1);
    const [produtos, setProdutos] = useState([])
    const [carrinho, setCarrinho] = useState([])

    return(
    
    function getProdutos() {return produtos}
    )
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

    function editar() {
        const produto = {}
        if(nome !== "") produto.nome = nome
        if(preco !== -1) produto.preco = preco
        if(quantidade !== -1) produto.quantidade = quantidade
        
        const config = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({cod: cod,produto: produto})
        }
        fetch("/editarProduto",config).then(ler)
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

    function add() {
        const config = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({cod: cod,quantidade: quantidade})
        }
        fetch("/addProduto",config).then(ler)
    }

    function sub() {
        const config = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({cod: cod,quantidade: quantidade})
        }
        fetch("/subProduto",config).then(ler)
    }

    function carrinhoadd() {
        carrinho.push(
        {
            cod: cod,
            desconto: preco,
            quantidade: quantidade
        }
        )
    }

    function carrinhosub() {
        setCarrinho(carrinho.filter((v) => {
            return v.cod !== cod
        }))
    }

    function vender() {
        const config = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({produtos:carrinho,valorPago:quantidade,desconto:preco})
        }
        fetch("/registrarVenda",config).then(ler)
    }
}

export default Crud;