import React from "react";

import Header from "./Header";
import Render from "../functions/render";

export default props => 
    <React.Fragment>
        <Header />
        <div>
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        </div>
    </React.Fragment>