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

  const artworks = [
      { title: 'Noche estrellada', description: 'Óleo inspirado en el cielo nocturno de Saint-Rémy, con pinceladas expresivas y un contraste intenso de azules y amarillos.', category: 'Impresionismo', image: 'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Lirios al amanecer', description: 'Paisaje floral con una paleta suave y luminosa que captura la luz del amanecer sobre un jardín de lirios.', category: 'Paisajes', image: 'https://images.pexels.com/photos/3642045/pexels-photo-3642045.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Ciudad geométrica', description: 'Composición abstracta de una ciudad futurista construida a partir de formas geométricas y bloques de color.', category: 'Arte abstracto', image: 'https://images.pexels.com/photos/3739653/pexels-photo-3739653.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Retrato fragmentado', description: 'Retrato contemporáneo donde el rostro se descompone en planos de color y líneas que sugieren movimiento.', category: 'Retratos', image: 'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'La sala roja', description: 'Interior clásico iluminado por una luz cálida, con especial atención al detalle en telas, muebles y texturas.', category: 'Clásicos', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Bodegón con frutas', description: 'Composición tradicional de frutas sobre una mesa de madera, con sombras suaves y contraste controlado.', category: 'Clásicos', image: 'https://images.pexels.com/photos/5947025/pexels-photo-5947025.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Explosión de color', description: 'Lienzo abstracto donde salpicaduras y manchas de pintura se superponen creando profundidad y energía.', category: 'Arte abstracto', image: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Equilibrio', description: 'Formas orgánicas y geométricas flotan en un espacio neutro, evocando equilibrio y armonía visual.', category: 'Arte abstracto', image: 'https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Paseo por el museo', description: 'Escena interior de un museo donde visitantes contemplan obras icónicas, capturando la experiencia cultural.', category: 'Clásicos', image: 'https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Costa mediterránea', description: 'Paisaje marino con pinceladas sueltas que sugieren el movimiento del agua y el brillo del sol sobre la costa.', category: 'Paisajes', image: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Retrato al óleo', description: 'Retrato clásico con luz lateral, centrado en la expresión del modelo y en la riqueza de los colores de la piel.', category: 'Retratos', image: 'https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { title: 'Constelaciones', description: 'Obra abstracta inspirada en mapas estelares, donde puntos de luz se conectan mediante líneas sutiles.', category: 'Arte abstracto', image: 'https://images.pexels.com/photos/2837009/pexels-photo-2837009.jpeg?auto=compress&cs=tinysrgb&w=1200' }
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
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
