# Databox Challenge

## Technologies Used
- Backend Framework: NestJS
- Authentication: JWT and Github OAuth

## Pre-requirements
- Node.js 20+
- Docker

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment variables
Create a `.env` and `.env.test` files in the root directory and add the following environment variables
```env
NODE_ENV=development (or test)
PORT=3000
SWAGGER_PATH=/api-docs
CORS_ORIGIN=*
ALPACA_API_URL=https://data.alpaca.markets/v1beta3/crypto/us
ALPHA_VANTAGE_API_URL=https://www.alphavantage.co/query
ALPHA_VANTAGE_API_KEY=example
DATABOX_API_KEY=example
CLIENT_ID=example
CLIENT_SECRET=example
GITHUB_CALLBACK_URL=example
JWT_SECRET=example
JWT_EXPIRATION=example
```

### 3. Run the application
```bash
npm run start:dev
```

The application will be running on [http://localhost:3000](http://localhost:3000)