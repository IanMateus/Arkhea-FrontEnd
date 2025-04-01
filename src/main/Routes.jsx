import React from "react";
import { Routes, Route } from "react-router";

import Venda from "../components/templates/Venda"
import Estoque from "../components/templates/Estoque";
import testCrud from "../components/components/testCrud";
import Layout from "../components/templates/Layout";

export default props =>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="venda" element={<Venda />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path='users' component={testCrud} />
            <Route from='*' to='/' />
        </Route>    
    </Routes>