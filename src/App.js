import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [cod, setCode] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(-1);
  const [quantidade, setQuantidade] = useState(-1);
  const [produtos, setProdutos] = useState([])
  const [carrinho, setCarrinho] = useState([])
  const [selecionado, setSelecionado] = useState({})

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

  function buscar() {
    const body = {}
    if(cod !== ""){
      body.cod = cod
    }else{
      body.nome = nome
    }

    const config = {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
    }
    fetch("/buscarProduto",config)
    .then(r => r.json())
    .then(produto => setSelecionado(produto))
    .then(ler)
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

  function deletar() {
    const config = {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({cod: cod})
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          PRODUTOS
          {produtos.length > 0? 
            produtos.sort((a,b) => a.cod - b.cod).map((produto) => (
            <p>
              Cod: {produto.cod} | Nome: {produto.nome} | Preco: {produto.preco} | Quantidade: {produto.quantidade}
            </p>
            ))
          :
            ler()}
          CARRINHO
          {carrinho.length > 0? 
            carrinho.sort((a,b) => a.cod - b.cod).map((produto) => (
            <p>
              Cod: {produto.cod} | Desconto: {produto.desconto} | Quantidade: {produto.quantidade}
            </p>
            ))
          :
            <p>Carrinho Vazio</p>}
          SELECIONADO
          {selecionado.cod? 
            <p>
              Cod: {selecionado.cod} | Nome: {selecionado.nome} | Preco: {selecionado.preco} | Quantidade: {selecionado.quantidade}
            </p>
          :
            <p>Nenhum produto buscado</p>}
        </p>
        cod <input onChange={(e) => setCode(e.target.value)}></input>
        nome <input onChange={(e) => setNome(e.target.value)}></input>
        preco/desconto <input onChange={(e) => setPreco(parseFloat(e.target.value))}></input>
        quantidade/valorPago <input onChange={(e) => setQuantidade(parseFloat(e.target.value))}></input>
        <button onClick={registrar}>registrar</button>
        <button onClick={ler}>ler</button>
        <button onClick={buscar}>buscar</button>
        <button onClick={editar}>editar</button>
        <button onClick={deletar}>deletar</button>
        <button onClick={add}>add</button>
        <button onClick={sub}>sub</button>
        <button onClick={carrinhoadd}>+ carrinho</button>
        <button onClick={carrinhosub}>- carrinho</button>
        <button onClick={vender}>vender</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
