# 🛒 Product API – Express.js Assignment (Week 2)

This is a RESTful API for managing products, built using Express.js. The project includes middleware for logging, API key authentication, error handling, and supports advanced features like search, filtering, pagination, and product statistics.

## 📦 How to Run the Server

### 1. Clone your GitHub Classroom repository
```CMD
git clone <your-github-repo-url>
cd <my project-folder>

2. Install dependencies
cmd
npm install

3. Create a .env file based on .env.example

PORT=3000
API_KEY=mysecretkey
4. Start the server
cmd
npm start
The server will start at:
http://localhost:3000

🔐 Authentication
Protected routes require an API key.

Header to include in requests:
x-api-key: mysecretkey
Content-Type: application/json

📬 API Endpoints
🔓 Public Routes
Method	Endpoint	Description
GET	/	Returns a greeting message
GET	/api/products	Get products with filtering, search, and pagination
GET	/api/products/stats	Get product counts grouped by category

🔒 Protected Routes (Requires API Key)
Method	Endpoint	Description
POST	/api/products	Add a new product
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product

📂 Example Requests & Responses
✅ GET /api/products
Request:
http
GET /api/products?category=electronics&search=phone&page=1&limit=2

Response:
json
[
  {
    "id": "2",
    "name": "Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 800,
    "category": "electronics",
    "inStock": true
  }
]
✅ GET /api/products/stats
Request:
http
GET /api/products/stats
Response:
json
{
  "total": 3,
  "byCategory": {
    "electronics": 2,
    "kitchen": 1
  }
}
✅ POST /api/products (Protected)
Headers:
x-api-key: mysecretkey
Content-Type: application/json
Body:
json
{
  "name": "Blender",
  "description": "Multi-speed blender with glass jar",
  "price": 75,
  "category": "kitchen",
  "inStock": true
}
Response:
json
{
  "id": "generated-uuid",
  "name": "Blender",
  "description": "Multi-speed blender with glass jar",
  "price": 75,
  "category": "kitchen",
  "inStock": true
}
✅ PUT /api/products/:id (Protected)
Request:
http
PUT /api/products/1
Headers:
x-api-key: mysecretkey
Body:
json
{
  "name": "Updated Laptop",
  "description": "Now with 32GB RAM",
  "price": 1400,
  "category": "electronics",
  "inStock": false
}
Response:
json
{
  "message": "Product updated successfully",
  "product": {
    "id": "1",
    "name": "Updated Laptop",
    "description": "Now with 32GB RAM",
    "price": 1400,
    "category": "electronics",
    "inStock": false
  }
}
✅ DELETE /api/products/:id (Protected)
Request:
http
DELETE /api/products/2
Headers:
x-api-key: mysecretkey
Response:
json
{
  "message": "Product deleted successfully",
  "deleted": {
    "id": "2",
    "name": "Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 800,
    "category": "electronics",
    "inStock": true
  }
}
⚠️ Simulate an Error
Use this route to test error handling:
GET /error-test
🧱 Middleware Files

File	Purpose
logger.js	Logs every HTTP request
auth.js	Validates API key in request headers
errorHandler.js	Handles server-side errors
notFound.js	Catches undefined routes (404)

📁 .env.example
env
# Port number the server will run on
PORT=3000

# API Key for protected routes
API_KEY=mysecretkey

🙌 Author
Name: Abdiaziz Nunow
PLP ID: Finance2025
Assignment: Week 2 - Express API