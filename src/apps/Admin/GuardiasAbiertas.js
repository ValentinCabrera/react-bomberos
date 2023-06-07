import React, { useEffect, useState } from 'react';
import GuardiaAbierta from "./components/GuardiaAbierta";
import { host } from '../../App';

function GuardiasAbiertas() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`${host}/guardias/admin/abiertas/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
    }, [data]);

    const listarGuardias = () => {
        return (
            <div className='fx-center fx-col'>
                <ul className='list-none'>
                    {data.map(guardia => (
                        <li key={guardia.id} className='list-space'><GuardiaAbierta guardia={guardia} /></li>
                    ))}

                </ul>
            </div>
        )
    }

    return (
        <div>
            {Object.keys(data).length !== 0 ? listarGuardias() : <h1 className='box'>Ninguna guardia abierta</h1>}
        </div>
    )
}

export default GuardiasAbiertas;