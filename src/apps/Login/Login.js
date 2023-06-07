import React from 'react';
import { useNavigate } from 'react-router-dom';
import { host } from '../../App';

function Login() {
    const navigate = useNavigate();

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
    }

    return (
        <div className='main'>
            <div className='box'>
                <h1 className='fx-center'>Iniciar sesión</h1>
                <form onSubmit={fetchLogin} className='fx-col w250'>
                    <input id='codigo' required placeholder="Codigo" className='h20 pad10' />
                    <input type='password' id='password' required placeholder="Contraseña" className='mar15 h20 pad10' />
                    <button type='submit' className='button mar30 h30'>Iniciar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
