import React from "react";
import GuardiasAbiertas from "./GuardiasAbiertas";
import GuardiasRevisar from "./GuardiasRevisar";
import { useState } from 'react';

function AdminPage() {
    const [actualPage, setActualPage] = useState(1); /* guardias abiertas === 0 */

    return (
        <div>
            <div className="navbar">
                <div className="fx-row">
                    <button className="button h40" onClick={() => setActualPage(0)}>Guardias abiertas</button>
                    <button className="button h40" onClick={() => setActualPage(1)}>Guardias a revisar</button>
                </div>
                <div>
                    <h4 className='c1 right'>{localStorage.getItem("nombre")} {localStorage.getItem("apellido")}</h4>
                </div>
            </div>
            <div className="main">
                {actualPage === 0 ? <GuardiasAbiertas /> : <GuardiasRevisar />}
            </div>
        </div >
    )
}

export default AdminPage;