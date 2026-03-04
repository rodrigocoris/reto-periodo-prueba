import React, { useState, useEffect } from 'react'

export default function AdminPanel({ apiBase, token, user }) {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ title: '', description: '', category_id: '', image: '' })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchItems()
      fetchCategories()
    }
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [user, theme])

  async function fetchItems() {
    try {
      const res = await fetch(apiBase + '/api/items?limit=100')
      const data = await res.json()
      setItems(data)
    } catch (e) { setMessage(e.message) }
  }

  async function fetchCategories() {
    try {
      const res = await fetch(apiBase + '/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (e) { setMessage(e.message) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (!form.title || !form.category_id) throw new Error('Título y categoría requeridos')
      
      const url = editing ? `${apiBase}/api/items/${editing.id}` : `${apiBase}/api/items`
      const method = editing ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      
      if (!res.ok) throw new Error('Error al guardar')
      
      setMessage(editing ? 'Actualizado' : 'Creado')
      setForm({ title: '', description: '', category_id: '', image: '' })
      setEditing(null)
      fetchItems()
    } catch (e) {
      setMessage('Error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  async function deleteItem(id) {
    if (!confirm('¿Eliminar?')) return
    try {
      const res = await fetch(`${apiBase}/api/items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Error al eliminar')
      setMessage('Eliminado')
      fetchItems()
    } catch (e) {
      setMessage('Error: ' + e.message)
    }
  }

  function editItem(item) {
    setEditing(item)
    setForm({
      title: item.title,
      description: item.description,
      category_id: categories.find(c => c.name === item.category)?.id || '',
      image: item.image || ''
    })
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value)
  }

  if (user?.role !== 'admin') return <div className="admin-panel"><p>Solo admins pueden acceder</p></div>

  return (
    <div className="admin-panel">
      <h3>Panel Admin - Gestión de Items</h3>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows="3"
        />
        <select
          value={form.category_id}
          onChange={e => setForm({ ...form, category_id: e.target.value })}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          placeholder="URL imagen"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : (editing ? 'Actualizar' : 'Crear')}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', category_id: '', image: '' }) }}>Cancelar</button>}
      </form>

      {message && <div className="message">{message}</div>}

      <div className="admin-items">
        <h4>Items ({items.length})</h4>
        <table className="items-table">
          <thead>
            <tr><th>ID</th><th>Título</th><th>Categoría</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => editItem(item)}>Editar</button>
                  <button onClick={() => deleteItem(item.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="theme-selector">
        <h4>Seleccionar tema</h4>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="accent">Vibrante</option>
        </select>
      </div>
    </div>
  )
}
