import React from 'react'

export default function Header({user,onLogout,theme,setTheme}){
  return (
    <header className="site-header">
      <div className="header-inner">
        <h1>🎨 Galería de Arte</h1>
        <div className="header-controls">
          <select value={theme} onChange={e=>setTheme(e.target.value)} title="Cambiar tema">
            <option value="light">☀️ Claro</option>
            <option value="dark">🌙 Oscuro</option>
            <option value="accent">✨ Vibrante</option>
          </select>
          {user ? (
            <div className="user-block">
              <span className="user-label">👤 {user.username}</span>
              <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <div className="user-block">No autenticado</div>
          )}
        </div>
      </div>
    </header>
  )
}
