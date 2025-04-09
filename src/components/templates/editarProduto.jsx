import React, { useEffect , useState} from "react";
import { Link, useLocation } from "react-router";
import './editarProduto.css'

export default function EditarProduto(state) {
    
    const produto = state.dados.produto

    function editar() {
        const config = {
          method: "POST",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({cod: state.dados.cod, produto: produto})
        }
        fetch("/editarProduto",config)
        window.location.href = "./"
    }

    function setNome(nome) {
        state.setters.setProduto({nome : nome, preco : produto.preco, quantidade : produto.quantidade})
    }

    function setPreco(preco) {
        state.setters.setProduto({nome : produto.nome, preco : preco, quantidade : produto.quantidade})
    }

    function setQuantidade(quantidade) {
        state.setters.setProduto({nome : produto.nome, preco : produto.preco, quantidade : quantidade})
    }

    return (
        <div className="form">
                <div className="colummn">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Codigo</label>
                            <input type="text" className="form-control"
                                name="cod"
                                value={state.dados.cod}
                                readOnly />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={produto.nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control"
                                name="preco"
                                value={produto.preco}
                                onChange={(e) => setPreco(e.target.value)}
                                placeholder="Digite o preço..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="text" className="form-control"
                                name="quantidade"
                                value={produto.quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                placeholder="Digite a quantidade..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={editar}>
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