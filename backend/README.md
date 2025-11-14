# Item Management System - Backend API

A full-stack backend API for managing items with CRUD operations, search, and pagination capabilities.

## Features

- RESTful CRUD operations for items
- Real-time search with query filters
- Pagination support
- Input validation with Zod
- Error handling and logging
- PostgreSQL database with Supabase
- TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **Validation**: Zod
- **ORM**: Supabase Client

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Items
- `GET /api/items` - Get all items with pagination and search
  - Query params: `page`, `limit`, `search`, `category`, `status`
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Database Schema

### Items Table
- `id` (uuid) - Primary key
- `title` (text) - Required
- `description` (text)
- `category` (text)
- `price` (numeric)
- `quantity` (integer)
- `tags` (text[])
- `status` (enum: active, inactive, discontinued)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env`

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start production server:
```bash
npm start
```

## API Usage Examples

### Create Item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Item",
    "description": "This is a sample item",
    "category": "Electronics",
    "price": 99.99,
    "quantity": 10,
    "tags": ["new", "featured"],
    "status": "active"
  }'
```

### Get All Items with Search
```bash
curl "http://localhost:3000/api/items?page=1&limit=10&search=sample&category=Electronics"
```

### Update Item
```bash
curl -X PUT http://localhost:3000/api/items/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Item",
    "price": 79.99
  }'
```

### Delete Item
```bash
curl -X DELETE http://localhost:3000/api/items/{id}
```

## Project Structure

```
src/
├── config/
│   └── database.ts         # Supabase configuration
├── controllers/
│   └── item.controller.ts  # Business logic for items
├── middleware/
│   ├── error.middleware.ts      # Error handling
│   └── validation.middleware.ts # Request validation
├── routes/
│   └── item.routes.ts      # API routes
├── types/
│   └── item.ts             # TypeScript interfaces
├── validators/
│   └── item.validator.ts   # Zod schemas
└── index.ts                # App entry point
```

## Validation Rules

- Title: Required, max 255 characters
- Description: Optional, max 5000 characters
- Category: Optional, max 100 characters
- Price: Non-negative number
- Quantity: Non-negative integer
- Status: One of 'active', 'inactive', 'discontinued'
- Tags: Array of strings

## Error Handling

All errors return JSON responses with:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // For validation errors
}
```

## Development

The API includes:
- Request logging with Morgan
- CORS enabled for all origins
- Comprehensive error handling
- Input validation on all endpoints
- Database indexes for optimized search
