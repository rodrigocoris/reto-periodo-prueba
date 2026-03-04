import React, {useState} from 'react'

export default function Login({apiBase,onLogin}){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(null);

  async function submit(e){
    e.preventDefault(); setError(null);
    try{
      const res = await fetch(apiBase + '/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||'Error');
      onLogin(data.token,data.user);
    }catch(err){ setError(err.message); }
  }

  return (
    <form className="login-form" onSubmit={submit}>
      <input placeholder="usuario" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input placeholder="contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
