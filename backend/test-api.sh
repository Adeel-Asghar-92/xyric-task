#!/bin/bash

BASE_URL="http://localhost:3000"

echo "Testing Item Management API"
echo "============================"
echo ""

echo "1. Testing Health Check..."
curl -s "$BASE_URL/health" | json_pp
echo -e "\n"

echo "2. Creating a new item..."
ITEM=$(curl -s -X POST "$BASE_URL/api/items" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laptop",
    "description": "High-performance laptop",
    "category": "Electronics",
    "price": 1299.99,
    "quantity": 5,
    "tags": ["electronics", "computer"],
    "status": "active"
  }')
echo "$ITEM" | json_pp
ITEM_ID=$(echo "$ITEM" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "Created item ID: $ITEM_ID"
echo -e "\n"

echo "3. Getting all items..."
curl -s "$BASE_URL/api/items?page=1&limit=10" | json_pp
echo -e "\n"

echo "4. Getting item by ID..."
curl -s "$BASE_URL/api/items/$ITEM_ID" | json_pp
echo -e "\n"

echo "5. Updating item..."
curl -s -X PUT "$BASE_URL/api/items/$ITEM_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "quantity": 10
  }' | json_pp
echo -e "\n"

echo "6. Searching items..."
curl -s "$BASE_URL/api/items?search=laptop" | json_pp
echo -e "\n"

echo "7. Filtering by category..."
curl -s "$BASE_URL/api/items?category=Electronics" | json_pp
echo -e "\n"

echo "8. Deleting item..."
curl -s -X DELETE "$BASE_URL/api/items/$ITEM_ID" | json_pp
echo -e "\n"

echo "Tests completed!"
