import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { host } from '../../App';

function Login() {
    const navigate = useNavigate();
    const [incorrect, setIncorrect] = useState(false);
    const formRef = useRef(null);

    const fetchLogin = (event) => {
        event.preventDefault();

        const codigo = document.getElementById("codigo").value;
        const password = document.getElementById("password").value

        fetch(`${host}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "codigo": codigo, "password": password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.Token) {
                    localStorage.setItem('token', data.Token);
                    navigate("/");
                }
            })
            .catch(error => {
                setIncorrect(true);
                formRef.current.reset()
            })
    }

    return (
        <div className='main'>
            <div className='box'>
                <h1 className='fx-center'>Iniciar sesión</h1>
                <form onSubmit={fetchLogin} className='fx-col w250' ref={formRef}>
                    <input id='codigo' required placeholder="Codigo" className='h20 pad10' />
                    <input type='password' id='password' required placeholder="Contraseña" className='mar15 h20 pad10' />
                    {incorrect ? <p className='font-small cred'>Usuario o contraseña incorrecta</p> : <p className='font-small'>&nbsp;</p>}
                    <button type='submit' className='button mar20 h30'>Iniciar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
