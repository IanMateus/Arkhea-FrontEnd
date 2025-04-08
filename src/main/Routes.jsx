import React from "react";
import { Routes, Route } from "react-router";

import Venda from "../components/templates/Venda"
import Estoque from "../components/templates/Estoque";
import Layout from "../components/templates/Layout";
import CriarProduto from "../components/templates/criarProduto";
import EditarProduto from "../components/templates/editarProduto"
import AdicionarProduto from "../components/templates/adicionarProduto";
import SubtrairProduto from "../components/templates/subtrairProduto"

export default props =>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="venda" element={<Venda />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path='estoque/editarProduto' element={<EditarProduto />} />
            <Route path='estoque/criarProduto' element={<CriarProduto />} />
            <Route path='estoque/adicionarProduto' element={<AdicionarProduto />} />
            <Route path='estoque/subtrairProduto' element={<SubtrairProduto/>} />
            <Route from='*' to='/' />
        </Route>    
    </Routes>