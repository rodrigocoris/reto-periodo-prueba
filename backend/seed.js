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

  // categories - temáticas de arte
  // Por movimiento artístico, tipo de obra, época y temática
  const cats = [
    // Movimiento artístico
    'Impresionismo',
    'Expresionismo',
    'Surrealismo',
    'Arte abstracto',
    'Arte pop',
    'Cubismo',
    'Realismo',
    // Tipo de obra
    'Paisajes',
    'Retratos',
    'Naturaleza muerta',
    'Arte urbano',
    'Ilustración digital',
    'Fotografía artística',
    // Época / estilo
    'Clásicos',
    'Arte moderno',
    'Arte contemporáneo',
    'Minimalismo',
    // Temática
    'Figuras humanas',
    'Animales',
    'Arquitectura',
    'Fantasía y sci-fi'
  ];
  for (const name of cats) {
    const c = await db.get('SELECT id FROM categories WHERE name = ?', name);
    if (!c) await db.run('INSERT INTO categories (name) VALUES (?)', name);
  }

  const catRows = await db.all('SELECT id,name FROM categories');
  // items sample - obras de arte
  const existing = await db.get('SELECT COUNT(*) as c FROM items');
  if (existing.c === 0){
    const catByName = Object.fromEntries(catRows.map(c => [c.name, c.id]));
    const artworks = [
      {
        title: 'Noche estrellada',
        description: 'Óleo inspirado en el cielo nocturno de Saint-Rémy, con pinceladas expresivas y un contraste intenso de azules y amarillos.',
        category: 'Impresionismo', // movimiento
        image: 'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Lirios al amanecer',
        description: 'Paisaje floral con una paleta suave y luminosa que captura la luz del amanecer sobre un jardín de lirios.',
        category: 'Paisajes', // tipo de obra
        image: 'https://images.pexels.com/photos/3642045/pexels-photo-3642045.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Ciudad geométrica',
        description: 'Composición abstracta de una ciudad futurista construida a partir de formas geométricas y bloques de color.',
        category: 'Cubismo', // movimiento
        image: 'https://images.pexels.com/photos/3739653/pexels-photo-3739653.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Retrato fragmentado',
        description: 'Retrato contemporáneo donde el rostro se descompone en planos de color y líneas que sugieren movimiento.',
        category: 'Retratos', // tipo de obra
        image: 'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'La sala roja',
        description: 'Interior clásico iluminado por una luz cálida, con especial atención al detalle en telas, muebles y texturas.',
        category: 'Clásicos', // época
        image: 'https://images.pexels.com/photos/4622354/pexels-photo-4622354.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Bodegón con frutas',
        description: 'Composición tradicional de frutas sobre una mesa de madera, con sombras suaves y contraste controlado.',
        category: 'Naturaleza muerta', // tipo de obra
        image: 'https://images.pexels.com/photos/5947025/pexels-photo-5947025.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Explosión de color',
        description: 'Lienzo abstracto donde salpicaduras y manchas de pintura se superponen creando profundidad y energía.',
        category: 'Arte abstracto', // movimiento
        image: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Equilibrio',
        description: 'Formas orgánicas y geométricas flotan en un espacio neutro, evocando equilibrio y armonía visual.',
        category: 'Minimalismo', // época/estilo
        image: 'https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Paseo por el museo',
        description: 'Escena interior de un museo donde visitantes contemplan obras icónicas, capturando la experiencia cultural.',
        category: 'Arquitectura', // temática
        image: 'https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Costa mediterránea',
        description: 'Paisaje marino con pinceladas sueltas que sugieren el movimiento del agua y el brillo del sol sobre la costa.',
        category: 'Paisajes', // tipo de obra
        image: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Retrato al óleo',
        description: 'Retrato clásico con luz lateral, centrado en la expresión del modelo y en la riqueza de los colores de la piel.',
        category: 'Figuras humanas', // temática
        image: 'https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        title: 'Constelaciones',
        description: 'Obra abstracta inspirada en mapas estelares, donde puntos de luz se conectan mediante líneas sutiles.',
        category: 'Fantasía y sci-fi', // temática
        image: 'https://images.pexels.com/photos/2837009/pexels-photo-2837009.jpeg?auto=compress&cs=tinysrgb&w=1200'
      }
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
  }

  console.log('Seed completado. Usuarios: admin/admin123, user/user123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
