import React from 'react'

export default function Header({user,onLogout}){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1>Mi Proyecto - Tema Ejemplo</h1>
        <div>
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
