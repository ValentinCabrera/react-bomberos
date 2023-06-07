import React from 'react';
import { host } from '../../../App';

function GuardiasAbierta(props) {
    const cerrrarGuardia = () => {
        fetch(`${host}/guardias/admin/abiertas/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "guardia": props.guardia.id }),
        })
    }

    return (
        <div className='box w300'>
            <div className='fx-row fx-sep'>
                <p>Codigo: {props.guardia.bombero.codigo}</p>
                <p>{props.guardia.bombero.nombre} {props.guardia.bombero.apellido}</p>
            </div>
            <div className='fx-row fx-sep'>
                <p>{props.guardia.fechaEntrada}</p>
                <p>{props.guardia.horaEntrada} hs</p>
            </div>
            <button className='h40 button' onClick={cerrrarGuardia}>Finalizar guardia</button>
        </div>
    )
}

export default GuardiasAbierta;