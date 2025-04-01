import React from "react";
import { Routes, Route } from "react-router";

import Main from "../components/templates/Main";
import Estoque from "../components/templates/Estoque";
import testCrud from "../components/components/testCrud";

export default props =>
    <Routes>
        <Route exact path="/venda" element={<Main />} />
        <Route path="/estoque" component={<Estoque />} />
        <Route path='/users' component={testCrud} />
        <Route from='*' to='/venda' />
    </Routes>