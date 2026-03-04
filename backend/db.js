const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db = null;

async function initDb() {
  if (db) return db;
  db = await open({
    filename: path.join(__dirname, 'data.db'),
    driver: sqlite3.Database
  });
  await db.exec('PRAGMA foreign_keys = ON');
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, role TEXT);
    CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT UNIQUE);
    CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, title TEXT, description TEXT, category_id INTEGER, image TEXT, FOREIGN KEY(category_id) REFERENCES categories(id));
  `);
  return db;
}

module.exports = { initDb };
