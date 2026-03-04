const { initDb } = require('./db');
const bcrypt = require('bcryptjs');

async function seed(){
  const db = await initDb();
  
  // create admin and user if not exists
  const adminUser = await db.get('SELECT id FROM users WHERE username = ?', 'admin');
  if (!adminUser){
    const hash = await bcrypt.hash('admin123', 8);
    await db.run('INSERT INTO users (username,password,role) VALUES (?,?,?)', 'admin', hash, 'admin');
  }
  const normalUser = await db.get('SELECT id FROM users WHERE username = ?', 'user');
  if (!normalUser){
    const h2 = await bcrypt.hash('user123', 8);
    await db.run('INSERT INTO users (username,password,role) VALUES (?,?,?)', 'user', h2, 'user');
  }

  // categories
  const cats = ['Noticias','Tutoriales','Opinión'];
  for (const name of cats) {
    const c = await db.get('SELECT id FROM categories WHERE name = ?', name);
    if (!c) await db.run('INSERT INTO categories (name) VALUES (?)', name);
  }

  const catRows = await db.all('SELECT id,name FROM categories');
  // items sample
  const existing = await db.get('SELECT COUNT(*) as c FROM items');
  if (existing.c === 0){
    for(let i=1;i<=12;i++){
      const cat = catRows[(i-1) % catRows.length];
      await db.run('INSERT INTO items (title,description,category_id,image) VALUES (?,?,?,?)', `Item ${i}`, 'Descripción de ejemplo para el item '+i, cat.id, '');
    }
  }

  console.log('Seed completado. Usuarios: admin/admin123, user/user123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
