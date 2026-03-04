import React, {useEffect, useState} from 'react'
import Login from './Login'

export default function Items({apiBase, token, onLogin}){
  const [categories,setCategories] = useState([]);
  const [items,setItems] = useState([]);
  const [page,setPage] = useState(1);
  const [limit] = useState(6);
  const [selected, setSelected] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{ fetchCategories() },[])
  useEffect(()=>{ fetchItems(true) },[selected])

  async function fetchCategories(){
    const res = await fetch(apiBase + '/api/categories');
    const data = await res.json();
    setCategories(data);
  }

  async function fetchItems(reset){
    setLoading(true);
    const newPage = reset ? 1 : page+1;
    const q = new URLSearchParams({ page: newPage, limit });
    if (selected) q.set('category', selected);
    const res = await fetch(apiBase + '/api/items?' + q.toString());
    const data = await res.json();
    setItems(prev => reset ? data : prev.concat(data));
    setPage(newPage);
    setLoading(false);
  }

  return (
    <div className="items-root">
      <aside className="sidebar">
        <h4>Categorías</h4>
        <div className="cats">
          <button className={!selected? 'active':''} onClick={()=>{ setSelected(null); setPage(1); fetchItems(true); }}>Todas</button>
          {categories.map(c=> (
            <button key={c.id} className={selected===c.name? 'active':''} onClick={()=>{ setSelected(c.name); setPage(1); fetchItems(true); }}>{c.name}</button>
          ))}
        </div>
        <div className="auth">
          {!token ? <Login apiBase={apiBase} onLogin={onLogin} /> : <div>Autenticado</div>}
        </div>
      </aside>

      <section className="grid">
        {items.map(it=> (
          <article className="card" key={it.id}>
            <div className="card-body">
              <h5>{it.title}</h5>
              <p className="muted">{it.category}</p>
              <p>{it.description}</p>
            </div>
          </article>
        ))}
      </section>

      <div className="controls">
        <button onClick={()=>fetchItems(false)} disabled={loading}>{loading? 'Cargando...':'Cargar más'}</button>
      </div>
    </div>
  )
}
