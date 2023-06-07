import GuardiasNav from "../components/GuardiasNav";
import React, { useEffect, useState } from 'react';
import GuardiaMensual from './GuardiaMensual';
import { host } from '../../../../App';

function GuardiasMensuales() {

    const [data, setData] = useState({});
    const [selectMonth, setSelectMonth] = useState(null);
    const [selectYear, setSelectYear] = useState(null);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    useEffect(() => {
        fetch(`${host}/guardia/listar/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "month": selectMonth, "year": selectYear })
        })
            .then(response => response.json())
            .then(data => setData(data))

    }, [selectMonth, selectYear]);

    const listarGuardias = () => {
        return (
            <div className="fx-col fx-center">
                <h2 className="box">Horas totales: {data.horasTotales} horas</h2>
                <div className="fx-row fx-center fx-sep w400">
                    {renderMonthOptions()}
                    {renderYearsOptions()}
                </div>

                <ul className="list-none">
                    {data.guardias.map(guardia => (
                        <li key={guardia.id} className="list-sep">
                            <GuardiaMensual guardia={guardia} />
                        </li>
                    ))}
                </ul>
            </div >
        )
    }

    const renderYearsOptions = () => {
        const years = []

        for (let i = 2015; i <= 2023; i++) {
            years.push(i);
        }

        return (
            <select defaultValue={currentYear} onChange={e => setSelectYear(e.target.value)} className="w40p select">
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        )
    }

    const renderMonthOptions = () => {
        const months = [
            { value: 1, label: 'Enero' },
            { value: 2, label: 'Febrero' },
            { value: 3, label: 'Marzo' },
            { value: 4, label: 'Abril' },
            { value: 5, label: 'Mayo' },
            { value: 6, label: 'Junio' },
            { value: 7, label: 'Julio' },
            { value: 8, label: 'Agosto' },
            { value: 9, label: 'Septiembre' },
            { value: 10, label: 'Octubre' },
            { value: 11, label: 'Noviembre' },
            { value: 12, label: 'Diciembre' }
        ];

        return (
            <select defaultValue={currentMonth} onChange={e => setSelectMonth(e.target.value)} className="w40p select">
                {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                ))}
            </select>
        )
    }

    return (
        <div>
            <GuardiasNav />
            <div className="main">
                {Object.keys(data).length !== 0 ? listarGuardias() : <p>Error al conectar con el servidor</p>}
            </div>
        </div>
    )
}

export default GuardiasMensuales;