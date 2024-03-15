import React from 'react';
import { host } from '../../../App';

function GuardiaRevisar(props) {
    const confirmarGuardia = () => {
        fetch(`${host}/guardias/admin/revisar/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "guardia": props.guardia.id })
        })
    }

    return (
        <div className='box'>
            <div className='fx-row fx-sep'>
                <p>{props.guardia.bombero.nombre} {props.guardia.bombero.apellido}</p>
                <p>{props.guardia.bombero.codigo}</p>
            </div>
            <div>
                <div className='fx-row fx-sep'>
                    <div className='fx-col fx-sep'>
                        <h2>Entrada</h2>
                        <p>{props.guardia.fechaEntrada}</p>
                        <p>{props.guardia.horaEntrada} hs</p>
                    </div>

                    <div className='fx-col fx-sep pad10'>
                        <h2>Salida</h2>
                        <p>{props.guardia.fechaSalida}</p>
                        <p>{props.guardia.horaSalida} hs</p>
                    </div>
                    <div className='fx-col fx-sep'>
                        <h2>Detalles</h2>
                        <p>{props.guardia.tiempo} horas</p>
                    </div>
                </div>
                <button className='button wmax h40' onClick={confirmarGuardia}>Confirmar guardia</button>
            </div>

        </div>
    )
}

export default GuardiaRevisar;