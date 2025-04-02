import React from "react";

export default function states() {
    const [cod, setCode] = useState();
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(-1);
    const [quantidade, setQuantidade] = useState(-1);
    const [produtos, setProdutos] = useState([])
    const [carrinho, setCarrinho] = useState([])
    this.cod = cod
    this.setCode = setCode
    this.nome = nome
    this.setNome = setNome
    this.preco = preco
    this.setPreco = setPreco
    this.quantidade = quantidade
    this.setQuantidade = setQuantidade
    this.produtos = produtos
    this.setProdutos = setProdutos
    this.carrinho = carrinho
    this.setCarrinho = setCarrinho

    return (
    function getCodigo(){
        return cod
    }
)}