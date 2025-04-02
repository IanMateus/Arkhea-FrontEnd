import './Layout.css'
import React from 'react'
import { Outlet, Link } from 'react-router'

export default function Layout() {
    return(
        <div className="menu-area">
            <nav className="menu">
                <Link to="/venda">
                    <i className="fa fa-venda"></i> Venda
                </Link>
                <Link to="/estoque">
                    <i className="fa fa-estoque"></i> Estoque
                </Link>
            </nav>
            <Outlet />
        </div>
)}