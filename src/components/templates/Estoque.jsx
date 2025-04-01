import React from "react";

import Header from "./Header";

export default function Estoque() {
    return (
        <div>
            <h1>Estoque</h1>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Maçã</td>
                        <td>3.99</td>
                        <td>10</td>
                        <td>
                            <button className="btn btn-warning"
                                onClick={() => console.log("editar")}>
                                <i className="fa fa-pencil">Pincel</i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => console.log("deletar")}>
                                <i className="fa fa-trash">Lixeira</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
)}