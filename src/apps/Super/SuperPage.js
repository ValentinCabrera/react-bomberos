import React, { useEffect } from "react";
import ListarBomberos from "./ListarBomberos";
import NavBar from "./componentes/NavBar";
import { useNavigate } from 'react-router-dom';

function SuperPage() {

    const navigate = useNavigate();
    return (
        <div>
            <NavBar buttons={[{ "label": "probando", "onClick": () => navigate("/guardias/actual") }, { "label": "segundo" }]} />
            <ListarBomberos />
        </div>
    )
}

export default SuperPage;