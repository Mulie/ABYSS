# LIYU.ca API Documentation

## Overview

The LIYU.ca E-Commerce Platform provides REST and GraphQL APIs for managing inventory, pricing, promotions, and orders. All API endpoints require authentication using Bearer tokens.

**Base URL:** `https://api.liyu.ca/v1`

**Authentication:** Bearer Token (JWT)

**Rate Limits:**
- Admin API: 100 requests/minute
- Storefront API: 1000 requests/minute

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@liyu.ca",
  "password": "password",
  "mfa_code": "123456" // optional
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "email": "admin@liyu.ca",
    "role": "Super Admin",
    "name": "Admin User"
  },
  "expires_in": 1800
}
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {token}
```

## Product & Inventory APIs

### Get Products
```http
GET /products?category={category}&limit={limit}&offset={offset}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "products": [
    {
      "sku": "WH-001",
      "name": "Wireless Bluetooth Headphones",
      "category": "electronics",
      "price": {
        "list": 89.99,
        "sale": 79.99,
        "currency": "CAD"
      },
      "inventory": {
        "on_hand": 145,
        "reserved": 12,
        "available": 133
      },
      "status": "in_stock"
    }
  ],
  "total": 1234,
  "limit": 50,
  "offset": 0
}
```

### Get Product by SKU
```http
GET /products/{sku}
Authorization: Bearer {token}
```

### Update Inventory
```http
POST /admin/inventory-adjust
Authorization: Bearer {token}
Content-Type: application/json

{
  "sku": "WH-001",
  "adjustment_type": "add",
  "quantity": 50,
  "location_id": "warehouse-1",
  "reason": "stock_received",
  "notes": "New shipment from supplier"
}
```

**Response:**
```json
{
  "success": true,
  "sku": "WH-001",
  "previous_quantity": 145,
  "new_quantity": 195,
  "timestamp": "2025-11-26T14:32:15Z",
  "adjusted_by": "admin@liyu.ca"
}
```

### Bulk Inventory Update
```http
POST /admin/inventory-bulk
Authorization: Bearer {token}
Content-Type: application/json

{
  "updates": [
    {
      "sku": "WH-001",
      "quantity": 50,
      "adjustment_type": "add"
    },
    {
      "sku": "FW-002",
      "quantity": 25,
      "adjustment_type": "add"
    }
  ],
  "reason": "stock_received"
}
```

**Response:**
```json
{
  "success": true,
  "processed": 2,
  "failed": 0,
  "results": [
    {
      "sku": "WH-001",
      "status": "success",
      "new_quantity": 195
    },
    {
      "sku": "FW-002",
      "status": "success",
      "new_quantity": 33
    }
  ]
}
```

## Pricing APIs

### Update Price
```http
POST /admin/price-update
Authorization: Bearer {token}
Content-Type: application/json

{
  "sku": "WH-001",
  "list_price": 89.99,
  "sale_price": 79.99,
  "effective_from": "2025-11-26T00:00:00Z",
  "effective_to": null,
  "channel": "web",
  "reason": "Holiday promotion"
}
```

**Response:**
```json
{
  "success": true,
  "sku": "WH-001",
  "previous_price": {
    "list": 89.99,
    "sale": null
  },
  "new_price": {
    "list": 89.99,
    "sale": 79.99
  },
  "effective_from": "2025-11-26T00:00:00Z",
  "updated_by": "admin@liyu.ca"
}
```

### Schedule Price Change
```http
POST /admin/price-schedule
Authorization: Bearer {token}
Content-Type: application/json

{
  "sku": "DJ-003",
  "new_price": 49.99,
  "scheduled_date": "2025-12-01T00:00:00Z"
}
```

### Get Price History
```http
GET /admin/price-history/{sku}?limit=50
Authorization: Bearer {token}
```

**Response:**
```json
{
  "sku": "WH-001",
  "history": [
    {
      "timestamp": "2025-11-26T14:32:15Z",
      "list_price": 89.99,
      "sale_price": 79.99,
      "changed_by": "admin@liyu.ca",
      "reason": "Holiday promotion"
    }
  ]
}
```

## Promotion & Coupon APIs

### Create Promotion
```http
POST /admin/promotion
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Holiday Sale 2025",
  "type": "percentage",
  "discount_value": 20,
  "apply_to": "category",
  "category": "electronics",
  "start_date": "2025-11-20T00:00:00Z",
  "end_date": "2025-12-31T23:59:59Z",
  "usage_limits": {
    "global": 1000,
    "per_user": 1
  },
  "stackable": false,
  "test_mode": false
}
```

**Response:**
```json
{
  "success": true,
  "promotion_id": "PROMO-2025-145",
  "name": "Holiday Sale 2025",
  "status": "active",
  "created_at": "2025-11-26T14:15:42Z"
}
```

### Update Promotion
```http
PATCH /admin/promotion/{promotion_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "paused"
}
```

### Create Coupon Code
```http
POST /admin/coupon
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "WELCOME20",
  "type": "percentage",
  "discount_value": 20,
  "usage_limit": null,
  "per_user_limit": 1,
  "min_order_value": 0,
  "valid_from": "2025-01-01T00:00:00Z",
  "valid_to": "2025-12-31T23:59:59Z"
}
```

### Apply Coupon (Storefront)
```http
POST /cart/apply-coupon
Authorization: Bearer {token}
Content-Type: application/json

{
  "cart_id": "cart_123",
  "coupon_code": "WELCOME20"
}
```

**Response:**
```json
{
  "success": true,
  "discount_applied": 15.99,
  "new_total": 63.96,
  "message": "20% discount applied"
}
```

### Validate Coupon
```http
POST /coupon/validate
Content-Type: application/json

{
  "code": "WELCOME20",
  "cart_total": 79.95
}
```

## Order APIs

### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json
Idempotency-Key: {unique-key}

{
  "items": [
    {
      "sku": "WH-001",
      "quantity": 1,
      "price": 79.99
    }
  ],
  "customer": {
    "email": "customer@example.com",
    "name": "John Doe"
  },
  "shipping_address": {
    "line1": "123 Main St",
    "city": "Toronto",
    "province": "ON",
    "postal_code": "M5H 2N2",
    "country": "CA"
  },
  "shipping_method": "standard",
  "coupon_code": "WELCOME20"
}
```

**Response:**
```json
{
  "success": true,
  "order_id": "ORD-2025-12345",
  "status": "pending_payment",
  "total": 85.19,
  "items_total": 79.99,
  "shipping": 5.99,
  "tax": 6.40,
  "discount": -7.20,
  "created_at": "2025-11-26T14:45:00Z"
}
```

### Get Order
```http
GET /orders/{order_id}
Authorization: Bearer {token}
```

### Update Order Status
```http
PATCH /admin/orders/{order_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped",
  "tracking_number": "1Z999AA10123456784",
  "carrier": "UPS"
}
```

## Webhooks

### Register Webhook
```http
POST /admin/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://yourapp.com/webhooks/liyu",
  "events": ["order.created", "order.paid", "inventory.low"],
  "secret": "your-webhook-secret"
}
```

### Webhook Events

#### order.created
```json
{
  "event": "order.created",
  "timestamp": "2025-11-26T14:45:00Z",
  "data": {
    "order_id": "ORD-2025-12345",
    "total": 85.19,
    "items": [...]
  }
}
```

#### inventory.low
```json
{
  "event": "inventory.low",
  "timestamp": "2025-11-26T15:00:00Z",
  "data": {
    "sku": "FW-002",
    "available": 5,
    "reorder_point": 15,
    "location": "warehouse-1"
  }
}
```

## Analytics & Reporting

### Get Sales Report
```http
GET /admin/reports/sales?from=2025-11-01&to=2025-11-30&group_by=day
Authorization: Bearer {token}
```

### Get Inventory Report
```http
GET /admin/reports/inventory?status=low_stock
Authorization: Bearer {token}
```

### Get Promotion Performance
```http
GET /admin/reports/promotions/{promotion_id}
Authorization: Bearer {token}
```

## Audit Logs

### Get Audit Logs
```http
GET /admin/audit-logs?user={email}&action={action}&from={date}&to={date}&limit=50
Authorization: Bearer {token}
```

**Response:**
```json
{
  "logs": [
    {
      "id": "log_123",
      "timestamp": "2025-11-26T14:32:15Z",
      "user": "admin@liyu.ca",
      "role": "Super Admin",
      "action": "price_update",
      "resource": "WH-001",
      "details": {
        "before": {"list_price": 89.99},
        "after": {"list_price": 89.99, "sale_price": 79.99}
      },
      "ip_address": "192.168.1.10"
    }
  ],
  "total": 2456,
  "limit": 50
}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "INVALID_COUPON",
    "message": "Coupon code has expired",
    "details": {
      "code": "WELCOME20",
      "expired_at": "2025-01-01T00:00:00Z"
    }
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` (401): Invalid or expired token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (422): Invalid request data
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## Rate Limiting Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1638374400
```

## Pagination

All list endpoints support pagination:
```http
GET /products?limit=50&offset=100
```

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "total": 1234,
    "limit": 50,
    "offset": 100,
    "has_more": true
  }
}
```

## GraphQL API

**Endpoint:** `https://api.liyu.ca/graphql`

### Query Example
```graphql
query GetProduct($sku: String!) {
  product(sku: $sku) {
    sku
    name
    price {
      list
      sale
      currency
    }
    inventory {
      available
      onHand
      reserved
    }
  }
}
```

### Mutation Example
```graphql
mutation AdjustInventory($input: InventoryAdjustInput!) {
  adjustInventory(input: $input) {
    success
    sku
    newQuantity
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const LiyuAPI = require('@liyu/api-client');

const client = new LiyuAPI({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Get product
const product = await client.products.get('WH-001');

// Update inventory
const result = await client.inventory.adjust({
  sku: 'WH-001',
  quantity: 50,
  type: 'add'
});
```

### Python
```python
from liyu_api import LiyuClient

client = LiyuClient(api_key='your-api-key')

# Get product
product = client.products.get('WH-001')

# Update inventory
result = client.inventory.adjust(
    sku='WH-001',
    quantity=50,
    adjustment_type='add'
)
```

## Support

For API support, contact: api-support@liyu.ca

API Status: https://status.liyu.ca
