# API Endpoints Documentation

## Authentication
POST /api/auth/login
Body: { username, password }
Response: { token, user: { id, username, role } }

## Users (admin only)
GET /api/users 
Authorization: Bearer {token}

POST /api/users
Authorization: Bearer {token}
Body: { username, password, role }

## Categories
GET /api/categories
Public endpoint

POST /api/categories (admin only)
Authorization: Bearer {token}
Body: { name }

## Items
GET /api/items?page=1&limit=6&category=Optional
Public endpoint, paginated

POST /api/items (admin only)
Authorization: Bearer {token}
Body: { title, description, category_id, image }

PUT /api/items/:id (admin only)
Authorization: Bearer {token}
Body: { title, description, category_id, image }

DELETE /api/items/:id (admin only)
Authorization: Bearer {token}