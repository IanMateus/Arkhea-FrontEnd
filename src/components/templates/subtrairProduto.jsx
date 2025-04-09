import React, { useEffect , useState} from "react";
import { Link } from "react-router";

export default function SubtrairProduto(state) {

    const produto = state.dados.produto
    const [qtdeAtual, setQtdeAtual] = useState(`${produto.quantidade}`);

    function editar() {
        const valorVerificado = verificarValor(produto.quantidade, qtdeAtual)
        if (typeof valorVerificado !== "object"){
            const novoProduto = {nome : produto.nome, preco : produto.preco, quantidade : produto.quantidade - parseFloat(qtdeAtual)}
            const config = {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({cod: state.dados.cod, produto: novoProduto})
            }
            fetch("/editarProduto",config)
            window.location.href = "./"
        } else{
            alert(`${valorVerificado.nome}\n${valorVerificado.descr}`)
        }
    }

    function verificarValor(qtdeMax, valor){
        let Erro = {}
        if (valor === ""){
            Erro.nome = "Erro: String Vazia!"
            Erro.descr = "O valor inserido é um texto vazio"
            return Erro
        }
        const regex = /^[0-9]+\.?[0-9]*$/
        const valVerificado = regex.exec(valor)
        if (valVerificado === null) {
            Erro.nome = "Erro: Valor Inválido"
            Erro.descr = "O valor inserido apresenta formatação inválida"
            return Erro
        } else {
            const val = parseFloat(valVerificado[0])
            const ultrapassou = val > qtdeMax
            if (!ultrapassou) {
              return valVerificado[0]
            } else {
                Erro.nome = "Erro: Valor Inválido"
                Erro.descr = "O valor inserido é maior que o valor total do item no estoque"
                return Erro
            }
        }
    }

    function limitar(valor, qtdeMax) {
        if (valor === ""){
            valor = 0
        }
        const regex = /[0-9]+\.?[0-9]*/
        const valVerificado = regex.exec(valor)
        if (valVerificado === null) {
            return qtdeAtual
        } else {
            const val = parseFloat(valVerificado[0])
            const ultrapassou = val > qtdeMax || val < 0
            if (!ultrapassou) {
              return valVerificado.toString()
            } else {
              return qtdeAtual
            }
        }
    }

    return( 
        <div>
            <div>
                <label>Produto</label>
                <div>
                    <button className="btn btn-primary"
                            onClick={() => setQtdeAtual(parseFloat(qtdeAtual)-1)}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <input type="text" className="form-control"
                            name="quantidade"
                            value={qtdeAtual}
                            onChange={(e) => setQtdeAtual((e.target.value))} />
                    <button className="btn btn-primary"
                            onClick={() => setQtdeAtual(parseFloat(qtdeAtual)+1)}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={editar}>
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
        </div>
    )
}