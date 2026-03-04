import React from 'react'

export default function Header({user,onLogout,theme,setTheme}){
  return (
    <header className="site-header">
      <div className="container header-inner" data-theme={theme}>
        <h1>Proyecto de prueba Turin IA</h1>
        <div className="header-controls">
          <select value={theme} onChange={e=>setTheme(e.target.value)}>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="accent">Color vibrante</option>
          </select>
          {user ? (
            <div className="user-block">{user.username} <button onClick={onLogout}>Salir</button></div>
          ) : (
            <div className="user-block">No autenticado</div>
          )}
        </div>
      </div>
    </header>
  )
}
