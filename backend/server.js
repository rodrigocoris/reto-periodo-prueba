require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { initDb } = require('./db');
const { authMiddleware, adminMiddleware } = require('./middleware');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
let db;

(async () => {
  db = await initDb();

  // Auth
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ error: 'Faltan credenciales' });
      const user = await db.get('SELECT id, username, password, role FROM users WHERE username = ?', username);
      if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: 'Contraseña incorrecta' });
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // Users (admin)
  app.get('/api/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const users = await db.all('SELECT id, username, role FROM users');
      res.json(users);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });
  app.post('/api/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { username, password, role } = req.body;
      if (!username || !password) return res.status(400).json({ error: 'Datos incompletos' });
      const hash = await bcrypt.hash(password, 8);
      const info = await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', username, hash, role || 'user');
      res.json({ id: info.lastID, username, role: role || 'user' });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // Categories
  app.get('/api/categories', async (req, res) => {
    try {
      const cats = await db.all('SELECT id, name FROM categories');
      res.json(cats);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });
  app.post('/api/categories', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Nombre requerido' });
      const info = await db.run('INSERT INTO categories (name) VALUES (?)', name);
      res.json({ id: info.lastID, name });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // Items with pagination and category filter
  app.get('/api/items', async (req, res) => {
    try {
      const page = parseInt(req.query.page||'1',10);
      const limit = parseInt(req.query.limit||'6',10);
      const offset = (page-1)*limit;
      const category = req.query.category;
      let rows;
      if (category) {
        rows = await db.all('SELECT i.id,i.title,i.description,i.image,c.name as category FROM items i JOIN categories c ON i.category_id=c.id WHERE c.name = ? LIMIT ? OFFSET ?', category, limit, offset);
      } else {
        rows = await db.all('SELECT i.id,i.title,i.description,i.image,c.name as category FROM items i JOIN categories c ON i.category_id=c.id LIMIT ? OFFSET ?', limit, offset);
      }
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.post('/api/items', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { title, description, category_id, image } = req.body;
      if (!title || !category_id) return res.status(400).json({ error: 'Datos incompletos' });
      const info = await db.run('INSERT INTO items (title, description, category_id, image) VALUES (?, ?, ?, ?)', title, description||'', category_id, image||'');
      res.json({ id: info.lastID, title });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.put('/api/items/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, category_id, image } = req.body;
      await db.run('UPDATE items SET title=?, description=?, category_id=?, image=? WHERE id=?', title, description, category_id, image, id);
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });
  app.delete('/api/items/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const id = req.params.id;
      await db.run('DELETE FROM items WHERE id=?', id);
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.listen(PORT, () => console.log('Backend listening on', PORT));
})();
