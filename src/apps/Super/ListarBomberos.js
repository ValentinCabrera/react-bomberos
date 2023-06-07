import React, { useEffect, useState } from "react";
import { host } from '../../App';
import NavBar from "./componentes/NavBar";

function ListarBomberos() {
    const [bomberos, setBomberos] = useState(null);

    useEffect(() => {
        fetch(`${host}/super/list/bomberos/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setBomberos(data);
            })
    }, []);

    const renderList = () => {
        return (
            bomberos.map(bombero => (
                <button className="button-box">
                    <div>{bombero.nombre} {bombero.apellido}</div></button>
            ))
        )
    }

    return (
        <div>
            <NavBar />
            <div className="main">
                {bomberos ? renderList() : null}
            </div>
        </div>
    )


}

export default ListarBomberos;