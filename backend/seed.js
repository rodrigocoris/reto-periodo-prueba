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

  // Solo 5 categorías: borrar todo y dejar únicamente estas
  await db.run('DELETE FROM items');
  await db.run('DELETE FROM categories');

  const cats = ['Impresionismo', 'Paisajes', 'Retratos', 'Arte abstracto', 'Clásicos'];
  for (const name of cats) {
    await db.run('INSERT INTO categories (name) VALUES (?)', name);
  }

  const catRows = await db.all('SELECT id,name FROM categories');
  const catByName = Object.fromEntries(catRows.map(c => [c.name, c.id]));

  // Imágenes: pinturas reales de galería (Wikimedia Commons, dominio público)
  const artworks = [
      { title: 'Noche estrellada', description: 'Óleo inspirado en el cielo nocturno de Saint-Rémy, con pinceladas expresivas y un contraste intenso de azules y amarillos.', category: 'Impresionismo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
      { title: 'Lirios al amanecer', description: 'Paisaje floral con una paleta suave y luminosa que captura la luz del amanecer sobre un jardín de lirios.', category: 'Paisajes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Monet_Water_lilies_1907.jpg/1200px-Monet_Water_lilies_1907.jpg' },
      { title: 'Ciudad geométrica', description: 'Composición abstracta de una ciudad futurista construida a partir de formas geométricas y bloques de color.', category: 'Arte abstracto', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Piet_Mondrian_-_Composition_No._III%2C_with_red%2C_blue%2C_yellow_and_black%2C_1929.jpg/1200px-Piet_Mondrian_-_Composition_No._III%2C_with_red%2C_blue%2C_yellow_and_black%2C_1929.jpg' },
      { title: 'Retrato fragmentado', description: 'Retrato contemporáneo donde el rostro se descompone en planos de color y líneas que sugieren movimiento.', category: 'Retratos', image: 'https://imgs.search.brave.com/QvbEVYY49N4vqiLtp3WaSqEcWA2lh05kQe0hnkr1wd0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcnR3/b3JrLmFydC1jZG4u/Y29tLzgzNTI1MC9h/cnRlYXJnLXBpbnR1/cmEtcmV0cmF0by1m/cmFnbWVudGFkby1k/ZS1td182MzN4NTUw/LmpwZw' },
      { title: 'La sala roja', description: 'Interior clásico iluminado por una luz cálida, con especial atención al detalle en telas, muebles y texturas.', category: 'Clásicos', image: 'https://imgs.search.brave.com/66cSVZ9EuEbKMksss3JOc9zB3a0ZkRCX-KqkdIGqiaI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE2/OTA1NzMyNS9lcy9m/b3RvL2JsYWNrLXBh/aW50LW9uLXJlZC10/ZXh0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1INGUw/SXhrM0hSeUV5a1ZW/ZkItZHZJMW1CalJI/WHV2d053dTRCNWRi/RlQ0PQ' },
      { title: 'Bodegón con frutas', description: 'Composición tradicional de frutas sobre una mesa de madera, con sombras suaves y contraste controlado.', category: 'Clásicos', image: 'https://imgs.search.brave.com/bRhGnNWs2_1Bg8A7j3D-e2CfzkvfJ6Zr3Y8uC3WQDzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcnR3/b3JrLmFydC1jZG4u/Y29tLzEwMzQ5MDEv/am9zZWxtb3Jlbm8t/cGludHVyYS1ib2Rl/Z29uLWNvbi1mcnV0/YXNfNjMzeDU1MC5q/cGc' },
      { title: 'Explosión de color', description: 'Lienzo abstracto donde salpicaduras y manchas de pintura se superponen creando profundidad y energía.', category: 'Arte abstracto', image: 'https://imgs.search.brave.com/hMY-0N720fD47yO-bPT_45FEGk3LOlh9NpbmwfKyDm0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wNC53/YWxscGFwZXJiZXR0/ZXIuY29tL3dhbGxw/YXBlci81NzcvOTEw/LzQyOC9jb2xvci1l/eHBsb3Npb24tcmVk/LXBhaW50LXdhbGxw/YXBlci1wcmV2aWV3/LmpwZw' },
      { title: 'Equilibrio', description: 'Formas orgánicas y geométricas flotan en un espacio neutro, evocando equilibrio y armonía visual.', category: 'Arte abstracto', image: 'https://imgs.search.brave.com/d1QkRhV_iGLjZCpb4qg6wNobYADn5TfPzLhTKGzpJKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcnRzcGVyLmNv/bS9hcnR3b3JrLzQ3/NjI0NV8xX3MuanBn' },
      { title: 'Paseo por el museo', description: 'Escena interior de un museo donde visitantes contemplan obras icónicas, capturando la experiencia cultural.', category: 'Clásicos', image: 'https://imgs.search.brave.com/EmCzsAGb_zJ2RDRG0o8WbOksn2yVKMcMZ5NQKXDdjow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50cmF2ZWxlci5l/cy9waG90b3MvNjEz/NzYxY2NiNTcwMDFm/Yzg2MmM3ODg5L21h/c3Rlci93XzEwMjQs/Y19saW1pdC8xMTAx/ODIuanBn' },
      { title: 'Costa mediterránea', description: 'Paisaje marino con pinceladas sueltas que sugieren el movimiento del agua y el brillo del sol sobre la costa.', category: 'Paisajes', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/The_Coast_at_Cagnes%2C_Sea%2C_Mountains_-_Renoir.jpg' },
      { title: 'Retrato al óleo', description: 'Retrato clásico con luz lateral, centrado en la expresión del modelo y en la riqueza de los colores de la piel.', category: 'Retratos', image: 'https://imgs.search.brave.com/xq06IT5_Bo8D2V8aVn9ZGq9N7Qru-7w0zkacsP0MYuo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ3/ODMxNjgzNS9lcy92/ZWN0b3IvaWx1c3Ry/YWNpJUMzJUIzbi1w/aW50dXJhLWFsLSVD/MyVCM2xlby1yZXRy/YXRvLWRlLXVuYS1t/dWplci1qb3Zlbi1z/b2JyZS1mb25kby1h/enVsLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1RZDdWR3lv/anJZZU10b0k0V1Js/dmhDXzJkWGE3Wi05/ekI2QjFwa3RXVkpB/PQ' },
      { title: 'Constelaciones', description: 'Obra abstracta inspirada en mapas estelares, donde puntos de luz se conectan mediante líneas sutiles.', category: 'Arte abstracto', image: 'https://imgs.search.brave.com/aUh6IFwD11F20hd085XoNb9sje3kBUbjSGaGTJ5NRRU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9mb25kby1nYWxh/eGlhLWxpcXVpZGEt/aGVjaG8tcGludHVy/YV8xMDUzLTM2MTIy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA' }
    ];

  for (const art of artworks) {
    const catId = catByName[art.category];
    if (!catId) continue;
    await db.run(
      'INSERT INTO items (title,description,category_id,image) VALUES (?,?,?,?)',
      art.title,
      art.description,
      catId,
      art.image
    );
  }

  console.log('Seed completado. Usuarios: admin/admin123, user/user123');
}

module.exports = { runSeed: seed };

if (require.main === module) {
  seed().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
}
