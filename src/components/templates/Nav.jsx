import './Nav.css'
import React from 'react'
import { Link } from 'react-router'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/venda">
                <i className="link link-venda">Venda</i>
            </Link>
            <Link to="/estoque">
                <i className="link link-estoque">Estoque</i>
            </Link>
        </nav>
    </aside>
