import React, { useEffect, useState } from 'react';
import GuardiasNav from '../components/GuardiasNav';
import { host } from '../../../../App';

function GuardiaAcutual() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${host}/guardia/open/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status.message === 204) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })

            .catch(error => {
                setData(null);
            })

    }, [data]);

    const fetchUpdateGuardia = () => {
        fetch(`${host}/guardia/update/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status.message === 204) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setData(null);
            })
    }

    const fetchUpdateDetalle = (checkbox, actividad) => {
        if (checkbox.checked) {
            fetch(`${host}/guardia/detalle/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "guardia": data.id, "actividad": actividad })
            })
                .then(response => response.json())
                .then(data => setData(data))
        } else {
            fetch(`${host}/guardia/detalle/rm/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "guardia": data.id, "actividad": actividad })
            })
                .then(response => response.json())
                .then(data => setData(data))
        }

    }

    const showGuardia = () => {
        return (

            <div className='box'>
                <h1 className='fx-center fx-col' > Guardia abierta</h1>
                <div className='fx-row fx-sep'>
                    <p>{data.fechaEntrada}</p>
                    <p>{data.horaEntrada} hs</p>
                </div>
                <h3>Actividades:</h3>
                <div className='fx-rowfx-center'>
                    <ul className='list-none fx-row fx-wrap'>
                        {data.detalle.map(actividad => (
                            <li className='w50p' key={actividad.id}><label>
                                <input type="checkbox" checked={actividad.check} onChange={(event) => fetchUpdateDetalle(event.target, actividad.id)} />
                                {actividad.nombre}
                            </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className='button h40' onClick={fetchUpdateGuardia}>Finalizar guardia</button>
            </div >
        )
    }

    const newGuardia = () => {
        return (
            <div className='box'>
                <h2>Ninguna guardia abierta</h2>
                <button className='button h30' onClick={fetchUpdateGuardia}>Abrir guardia</button>
            </div>)
    }


    return (
        <div>
            <GuardiasNav />
            <div className='main'>
                {data ? showGuardia() : newGuardia()}
            </div>
        </div>
    )
}

export default GuardiaAcutual;