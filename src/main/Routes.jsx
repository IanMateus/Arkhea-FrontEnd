import React from "react";
import { Routes, Route } from "react-router";

import Venda from "../components/templates/Venda"
import Estoque from "../components/templates/Estoque";
import Layout from "../components/templates/Layout";
import AddProduto from "../components/components/addProduto";
import EditProduto from "../components/components/editProduto"

export default props =>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="venda" element={<Venda />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path='estoque/editProduto' element={<EditProduto />} />
            <Route path='estoque/addProduto' element={<AddProduto />} />
            <Route from='*' to='/' />
        </Route>    
    </Routes>