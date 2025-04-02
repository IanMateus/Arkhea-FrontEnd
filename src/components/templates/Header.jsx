import './Header.css'
import React from 'react'
import { Link } from 'react-router'

export default function Header() { 



    return(
        <header className="header">
            <Link to="/estoque/addProduto">
                <button className="btn btn-primary">Adicionar Produto</button>
            </Link>
            <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <input type="text" className='form-control' id='pesquisarProduto' placeholder='Digite o nome do produto...'/>
                            <button className='btn btn-light'>
                                <i className="fa fa-search text-primary"></i>
                            </button>
                        </div>
                    </div>
            </div>
        </header>
)}