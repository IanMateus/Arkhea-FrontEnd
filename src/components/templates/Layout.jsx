import './Layout.css'
import React from 'react'
import { Outlet, Link } from 'react-router'

export default function Layout() {
    return(
        <div className="menu-area">
            <nav className="menu">
                <Link to="/venda">
                    <i className="link link-venda">Venda</i>
                </Link>
                <Link to="/estoque">
                    <i className="link link-estoque">Estoque</i>
                </Link>
            </nav>
            <Outlet />
        </div>
)}