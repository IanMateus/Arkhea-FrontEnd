import React, { useEffect , useState} from "react";
import { Link } from "react-router";

export default function AdicionarProduto(state) {

    const [qtdeAtual, setQtdeAtual] = useState("0");
    const produto = state.dados.produto

    function editar() {
        const novoProduto = {nome : produto.nome, preco : produto.preco, quantidade : parseFloat(qtdeAtual) + produto.quantidade}
        const config = {
          method: "POST",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({cod: state.dados.cod, produto: novoProduto})
        }
        fetch("/editarProduto",config)
        window.location.href = "./"
    }

    return( 
        <div>
            <div>
                <label>Produto</label>
                <div>
                    <button className="btn btn-primary"
                            onClick={() => setQtdeAtual((parseFloat(qtdeAtual)-1).toString())}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <input type="text" className="form-control"
                            name="quantidade"
                            value={qtdeAtual}
                            onChange={(e) => setQtdeAtual(e.target.value)} />
                    <button className="btn btn-primary"
                            onClick={() => setQtdeAtual((parseFloat(qtdeAtual)+1).toString())}>
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