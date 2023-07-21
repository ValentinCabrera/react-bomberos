import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';

import GuardiaAcutual from './apps/Home/Guardias/GuardiaActual/GuardiaActual';
import Login from '../src/apps/Login/Login';
import GuardiasMensuales from './apps/Home/Guardias/GuardiasMensuales/GuardiasMensuales';
import AdminPage from './apps/Admin/AdminPage';
import SuperPage from './apps/Super/SuperPage';

export const host = "https://django-bomberos.onrender.com";
/*
export const host = "http://localhost:8000";
*/

const UserRoutes = () => {
  let [auth, setAuth] = useState(null)

  useEffect(() => {
    fetch(`${host}/auth/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        response.status === 401 ? setAuth(false) : setAuth(true);
        return response.json();
      })

      .then(data => {
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apellido", data.apellido);
      })

  }, []);

  return auth === null ? null : auth ? <Outlet /> : <Navigate to="/login" />
}

const LocalRoutes = () => {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => {
        setIp((data.ip).split('.').slice(0, 2));
      })
      .catch(error => setIp(0));
  }, [ip]);

  if (ip) {
    if ((ip[0] === "24" && ip[1] === "232") || 0 === 0) return <Outlet />
    else {
      alert("Debe estar conectado a la red de los bomberos para registrar una guardia")
      return <Navigate to="/guardias/mensuales" />
    }
  } return null
}

const AdminRoutes = () => {
  let [auth, setAuth] = useState(null)

  useEffect(() => {
    fetch(`${host}/auth/admin`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        response.status === 401 ? setAuth(false) : setAuth(true)
      })
  }, []);

  return auth === null ? null : auth ? <Outlet /> : <Navigate to="/login" />
}

const SuperRoutes = () => {
  let [auth, setAuth] = useState(null)

  useEffect(() => {
    fetch(`${host}/auth/super`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        response.status === 401 ? setAuth(false) : setAuth(true)
      })
  }, []);

  return auth === null ? null : auth ? <Outlet /> : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserRoutes />}>
          <Route element={<LocalRoutes />}>
            <Route path='/guardias/actual' element={<GuardiaAcutual />} />
          </Route>
          <Route path='/guardias/mensuales' element={<GuardiasMensuales />} />
          <Route path='*' element={<Navigate to={'/guardias/actual'} />} />
        </Route>
        <Route element={<AdminRoutes />} >
          <Route path='/admin' element={<AdminPage />} />
        </Route>
        <Route element={<SuperRoutes />}>
          <Route path='/super' element={<SuperPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router >
  );
}

export default App;
