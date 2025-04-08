import './Header.css'
import React from 'react'
import { Link } from 'react-router'

export default function Header({ filter }) { 



    return(
        <header className="header">
            <Link to="/estoque/criarProduto">
                <button className="btn btn-primary">Adicionar Produto</button>
            </Link>
            <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <input type="text" className='form-control' id='pesquisarProduto' placeholder='Digite o nome do produto...' onChange={(e) => filter(e.target.value)}/>
                            <button className='btn btn-light'>
                                <i className="fa fa-search text-primary"></i>
                            </button>
                        </div>
                    </div>
            </div>
        </header>
)}