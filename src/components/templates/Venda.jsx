import './Venda.css'
import { useEffect, useState } from 'react';

function Venda() {
    const [selecionado, setSelecionado] = useState({})
    const [carrinho, setCarrinho] = useState([])

    const [cod, setCod] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [desconto, setDesconto] = useState(0);

    const [descontoFinal, setDescontoFinal] = useState(0);

    const [valorFinal, setValorFinal] = useState(0);
    const [valorPago, setValorPago] = useState(0);

    const [vendendo, setVendendo] = useState(false);

    function trySearch(cod){
        setCod(cod)
        if(!isNaN(parseInt(cod))){
            const config = {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({cod: parseInt(cod)})
            }
            fetch("/buscarProduto",config)
            .then(r => {
                if(r.status === 200){
                    return r.json()
                }
                return undefined
            })
            .then(produto => {
                setSelecionado(produto)
            })
        } else setSelecionado(undefined)
    }

    function aplicar(){
        const novoProd =
        {
          cod: selecionado.cod,
          nome: selecionado.nome,
          preco: selecionado.preco,
          desconto: desconto,
          quantidade: quantidade
        }

        if(carrinho.find((produto) => produto.cod === selecionado.cod) === undefined){
            setCarrinho(carrinho.concat(novoProd))
        }else{
            setCarrinho(carrinho.map((produto) => {
                if(produto.cod === selecionado.cod){
                    return novoProd
                }
                return produto
            }))
        }
        
    }

    function deletar(){
        setCarrinho(carrinho.filter((produto) => produto.cod !== selecionado.cod))
        cancelar()
    }

    function cancelar(){
        setCod("")
        setQuantidade("")
        setDesconto(0)
        setSelecionado()
    }

    function selecionar(produto){
        setCod(produto.cod)
        setQuantidade(produto.quantidade)
        setDesconto(produto.desconto)
        setSelecionado(produto)
    }

    function cancelar_venda(){
        setDescontoFinal(0)
        setCarrinho([])
        cancelar()
    }

    function vender(){
        setVendendo(true)
    }

    function voltar(){
        setValorPago("")
        setVendendo(false)
    }

    function finalizar(){
        const produtos = carrinho.map((produto) => {
            return {
                cod: produto.cod,
                desconto: produto.desconto,
                quantidade: produto.quantidade
            }
        })

        const config = {
          method: "POST",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({produtos:produtos,valorPago:valorPago,desconto:descontoFinal})
        }
        fetch("/registrarVenda",config)

        voltar()
        cancelar_venda()
    }

    useEffect (() => {
        setValorFinal(carrinho.reduce((soma, produto) => soma + produto.quantidade * produto.preco * (1 - produto.desconto / 100),0) * (1 - descontoFinal/100))
    }, [carrinho,descontoFinal])

    return (
        <div className="Venda">
            <div className="input_venda">
                <div className='fill_produto_venda'>
                    Codigo <br/>
                    <input onChange={(e) => trySearch(e.target.value)} value={cod}></input><br/>
                    <input className='no_input' readOnly value={selecionado?selecionado.nome:""}></input> <br/>
                    Quantidade <input onChange={(e) => {if(!isNaN(parseFloat(e.target.value))) {setQuantidade(parseFloat(e.target.value))} else setQuantidade("")}} value={quantidade}/> <br/>
                    Desconto <input onChange={(e) => {if(!isNaN(parseFloat(e.target.value))) {setDesconto(parseFloat(e.target.value))} else setDesconto(0)}} value={desconto}/> <br/>
                    Valor unitário <input className='no_input' readOnly value={selecionado?selecionado.preco:""}/> <br/>
                    Subtotal <input className='no_input' readOnly value={selecionado && quantidade !== "" && desconto !== -1?selecionado.preco * quantidade * (1 - desconto/100):""}/>
                </div>
                <div className='action_produto_venda'>
                    <button onClick={deletar}>Deletar</button>
                    <button onClick={aplicar}>Aplicar</button>
                    <button onClick={cancelar}>Cancelar</button>
                </div>
            </div>
            <div className="output_venda">
                <table className='table_venda'>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Qtde</th>
                            <th>Unitário</th>
                            <th>Deconto</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {carrinho.map((produto) => 
                        <tr onClick={() => {selecionar(produto)}}>
                            <td>{produto.nome}</td>
                            <td>{produto.quantidade}</td>
                            <td>R$ {produto.preco}</td>
                            <td>{produto.desconto}%</td>
                            <td>R$ {produto.quantidade * produto.preco * (1 - produto.desconto / 100)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className='result_venda'>
                    <div className='info_venda'>
                        <div>
                            Desconto<br/>
                            <input onChange={(e) => {if(!isNaN(parseFloat(e.target.value))) {setDescontoFinal(parseFloat(e.target.value))} else setDescontoFinal(0)}} value={descontoFinal}/> <br/>
                        </div>
                        <div>
                            VALOR TOTAL<br/>
                            R$ {valorFinal}
                        </div>
                    </div>
                    <div className='actions_venda'>
                        <button onClick={cancelar_venda}>Cancelar</button>
                        <button onClick={vender}>Receber e finalizar</button>
                    </div>
                </div>
            </div>
            {vendendo && 
            <div>
                <div>
                    Valor total R$ {valorFinal}<br/>
                    Valor pago <input onChange={(e) => {if(!isNaN(parseInt(e.target.value))) {setValorPago(parseFloat(e.target.value))} else setValorPago(0)}} value={valorPago}/> <br/>
                    Troco <input className='no_input' readOnly value={valorPago >= valorFinal?valorPago - valorFinal:""}/> <br/>
                </div>
                <div>
                    <button onClick={voltar}>Voltar</button>
                    <button onClick={finalizar}>Finalizar</button>
                </div>
            </div>}
        </div>
)}

export default Venda;