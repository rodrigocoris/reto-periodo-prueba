const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No autorizado' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){
    return res.status(401).json({ error: 'Token inválido' });
  }
}

function adminMiddleware(req, res, next){
  if (!req.user) return res.status(401).json({ error: 'No autorizado' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Requiere rol admin' });
  next();
}

module.exports = { authMiddleware, adminMiddleware };
