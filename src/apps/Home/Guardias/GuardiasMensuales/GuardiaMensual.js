import React from 'react';

function Guardia(props) {
    return (
        <div className="box">
            <div className='fx-row fx-sep'>
                <div className='entrada-cont'>
                    <h3>Entrada</h3>
                    <p>{props.guardia.fechaEntrada}</p>
                    <p>{props.guardia.horaEntrada} hs</p>
                </div>
                <div className='salida-cont'>
                    <h3>Salida</h3>
                    <p>{props.guardia.fechaSalida}</p>
                    <p>{props.guardia.horaSalida} hs</p>
                </div>
                <div className="detalles-cont">
                    <h3>Detalles</h3>
                    <p>{props.guardia.tiempo} horas</p>
                </div>
            </div>
        </div>
    )
}

export default Guardia;