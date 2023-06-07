import React, { useEffect, useState } from 'react';
import GuardiaRevisar from './components/GuardiaRevisar';
import { host } from '../../App';

function GuardiasRevisar() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`${host}/guardias/admin/revisar/`, {
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
            <div>
                <ul className='list-none'>
                    {data.map(guardia => (
                        <li key={guardia.id} className='list-sep'><GuardiaRevisar guardia={guardia} /></li>
                    ))}

                </ul>
            </div>
        )
    }

    return (
        <div>
            {Object.keys(data).length !== 0 ? listarGuardias() : <h1 className='box'>Ninguna guardia a revisar</h1>}
        </div>
    )
}

export default GuardiasRevisar;