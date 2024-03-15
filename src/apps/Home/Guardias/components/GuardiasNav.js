import React from 'react';
import { useNavigate } from 'react-router-dom';

function GuardiasNav() {

    const navigate = useNavigate();


    return (
        <div className='navbar'>
            <div className='fx-row'>
                <button className='h40 button' onClick={() => navigate("/guardias/actual")}>Guardia actual</button>
                <button className='h40 button' onClick={() => navigate("/guardias/mensuales")}>Guardias mensuales</button>
            </div>
            <div>
                <h4 className='c1 right'>{localStorage.getItem("nombre")} {localStorage.getItem("apellido")}</h4>
            </div>
        </div>
    );
}

export default GuardiasNav;
