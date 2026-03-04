import React, {useEffect, useState} from 'react'
import Header from './components/Header'
import Items from './components/Items'
import AdminPanel from './components/AdminPanel'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App(){
  const [token,setToken] = useState(null);
  const [user,setUser] = useState(null);
  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(()=>{
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t){ setToken(t); setUser(JSON.parse(u)); }
  },[])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function onLogin(token,user){
    setToken(token); setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  function onLogout(){
    setToken(null); setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user');
  }

  return (
    <div className="app">
      <Header user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} />
      <main className="container">
        {user?.role === 'admin' && <AdminPanel apiBase={API} token={token} user={user} />}
        <h2>Galería de Ejemplo</h2>
        <Items apiBase={API} token={token} onLogin={onLogin} />
      </main>
      <footer className="footer">Reto - Periodo de Prueba</footer>
    </div>
  )
}
