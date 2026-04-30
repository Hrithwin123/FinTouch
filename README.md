# 🔐 Finger - Biometric Payment System

> **"Your fingerprint is your wallet."**

## 💡 The Idea

Imagine walking into a store, picking up what you need, and paying with just a touch of your finger—no cards, no phones, no passwords. **Finger** reimagines digital payments by merging the security of biometric authentication with the transparency of blockchain technology.

In a world where we're constantly juggling passwords, PINs, and payment cards, Finger offers a radical simplification: **your identity is your payment method**. By combining SecuGen fingerprint scanning with Solana blockchain, we've created a system where transactions are:

- **🔒 Secure** - Biometric data that can't be stolen or forgotten
- **⚡ Instant** - No fumbling for cards or remembering passwords  
- **🌐 Transparent** - Every transaction recorded immutably on-chain
- **🎯 Inclusive** - No need for smartphones or bank accounts

Whether you're a street vendor accepting payments or a customer making a purchase, Finger makes transactions as natural as a handshake. This is the future of payments—simple, secure, and human.

---

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![Solana](https://img.shields.io/badge/Solana-Blockchain-9945FF?style=flat&logo=solana)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)

## 🌟 Features

### 🔒 Biometric Authentication
- **Fingerprint-based login** - No passwords needed
- **SecuGen fingerprint scanner** integration
- **ISO template matching** with high accuracy (140+ matching score)
- **Real-time fingerprint capture** and verification

### 💰 Payment System
- **User and Vendor accounts** with balance management
- **Real-time transaction updates** via WebSocket
- **QR code generation** for quick payments
- **Transaction history** tracking

### ⛓️ Blockchain Integration
- **Solana blockchain** for transparent transactions
- **Anchor framework** for smart contract interactions
- **On-chain transaction recording**
- **Airdrop functionality** for testing

### 🎨 Modern UI/UX
- **Responsive design** with Tailwind CSS
- **Smooth animations** using Framer Motion
- **Toast notifications** for user feedback
- **Intuitive navigation** with React Router

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **SecuGen Fingerprint Scanner** and SDK
- **Solana CLI** (for blockchain features)
- **Git**

### Hardware Requirements
- SecuGen fingerprint scanner device
- USB port for scanner connection

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd finger
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd back
npm install
cd ..
```

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the `back` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/finger-payment

# Server Configuration
PORT=3000

# Solana Configuration
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

# SecuGen Configuration
SECUGEN_API_URL=https://localhost:8000
```

### 2. SecuGen SDK Setup

1. Install the SecuGen SDK on your system
2. Ensure the SecuGen service is running on `https://localhost:8000`
3. Configure SSL certificates if needed (the app uses `rejectUnauthorized: false` for development)

### 3. Solana Wallet Setup

1. Generate a new Solana wallet or use an existing one
2. Place your wallet keypair in `back/blockchain/new_admin.json`
3. Request devnet SOL from the [Solana Faucet](https://faucet.solana.com/)

```bash
# Example wallet structure
{
  "publicKey": "your-public-key",
  "secretKey": [/* your secret key array */]
}
```

### 4. MongoDB Setup

Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your connection string
```

## 🚀 Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend**: `http://localhost:3000` (Express server)

### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview

# Run backend separately
cd back
npm run dev
```

## 📁 Project Structure

```
finger/
├── back/                          # Backend application
│   ├── blockchain/                # Solana blockchain integration
│   │   ├── idl/                   # Anchor IDL files
│   │   ├── airdrop.ts             # Airdrop functionality
│   │   ├── transaction.js         # Transaction creation
│   │   └── testTransaction.ts     # Transaction testing
│   ├── controllers/               # Request handlers
│   │   ├── AuthController.js      # Authentication logic
│   │   ├── FingerController.js    # Fingerprint operations
│   │   ├── TransactionController.js
│   │   ├── UserController.js
│   │   └── VendorController.js
│   ├── models/                    # MongoDB schemas
│   │   ├── UserSchema.js
│   │   ├── VendorSchema.js
│   │   └── TransactionSchema.js
│   ├── routers/                   # API routes
│   ├── utils/                     # Utility functions
│   │   ├── connectDb.js           # Database connection
│   │   └── qr.js                  # QR code generation
│   ├── server.js                  # Express server & Socket.IO
│   └── package.json
├── src/                           # Frontend application
│   ├── pages/                     # React pages/routes
│   │   ├── Landing.jsx            # Landing page
│   │   ├── Login.jsx              # User login
│   │   ├── Signup.jsx             # User registration
│   │   ├── VendorLogin.jsx        # Vendor login
│   │   ├── VendorSignup.jsx       # Vendor registration
│   │   ├── Match.jsx              # Fingerprint matching
│   │   ├── Payments.jsx           # Payment interface
│   │   ├── Transactions.jsx       # Transaction history
│   │   └── DoneLogin.jsx          # Post-login handler
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── .gitignore
├── package.json
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # ESLint configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/vendor/signup
POST /api/auth/vendor/login
```

### Fingerprint Operations

```http
POST /api/finger/scan
POST /api/finger/match
PUT  /api/finger/update
```

### User Management

```http
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users/:id/balance
```

### Vendor Management

```http
GET    /api/vendors/:id
PUT    /api/vendors/:id
GET    /api/vendors/:id/balance
```

### Transactions

```http
POST   /api/transactions
GET    /api/transactions/:userId
GET    /api/transactions/vendor/:vendorId
```

### WebSocket Events

```javascript
// Client -> Server
socket.emit('userMoneyChange', { id: userId })
socket.emit('vendorMoneyChange', { id: vendorId })

// Server -> Client
socket.on('userMoneyChange', ({ balance, id }) => {})
socket.on('vendorMoneyChange', ({ balance, id }) => {})
```

## 🛠️ Technologies Used

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM 7.6.2** - Client-side routing
- **Tailwind CSS 4.1.8** - Utility-first CSS framework
- **Framer Motion 12.16.0** - Animation library
- **Lucide React** - Icon library
- **QRCode.react** - QR code generation
- **Socket.IO Client** - Real-time communication
- **React Toastify** - Toast notifications
- **Vite 6.3.5** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.15.1** - MongoDB ODM
- **Socket.IO 4.8.1** - WebSocket library
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Blockchain
- **Solana Web3.js 1.98.4** - Solana JavaScript API
- **Anchor 0.32.1** - Solana smart contract framework
- **BN.js** - Big number library

### Biometric
- **SecuGen SDK** - Fingerprint scanner integration
- **node-fetch** - HTTP client for SecuGen API

## 🔍 How It Works

### 1. User Registration Flow

```
User → Scan Fingerprint → Create Account → Store Template → Generate Wallet
```

1. User scans fingerprint using SecuGen device
2. System captures ISO template (base64 encoded)
3. User provides name and password
4. Template and credentials stored in MongoDB
5. Initial balance set to 0

### 2. Authentication Flow

```
User → Scan Fingerprint → Match Template → Login Success
```

1. User scans fingerprint
2. System retrieves all user templates from database
3. Compares scanned template with stored templates using `SGIMatchScore`
4. If matching score > 140, authentication succeeds
5. User session established

### 3. Payment Flow

```
User → Select Vendor → Enter Amount → Confirm → Blockchain Transaction → Update Balances
```

1. User selects vendor and enters payment amount
2. System validates user balance
3. Creates Solana blockchain transaction
4. Records transaction in MongoDB
5. Updates user and vendor balances
6. Emits WebSocket events for real-time UI updates
7. Generates transaction receipt

### 4. Blockchain Integration

```javascript
// Transaction creation on Solana
1. Initialize Anchor program
2. Create transaction instruction
3. Sign with user wallet
4. Send to Solana network
5. Confirm transaction
6. Store transaction hash
```

## 🔐 Security Features

- **Biometric authentication** - More secure than passwords
- **Template encryption** - Fingerprint templates stored securely
- **Password hashing** - bcrypt for password security
- **HTTPS for fingerprint API** - Secure communication with scanner
- **Blockchain immutability** - Transparent transaction records
- **Real-time validation** - Immediate balance checks
- **Session management** - Secure user sessions

## 🧪 Testing

### Test Blockchain Transaction

```bash
cd back/blockchain
npx esrun testTransaction.ts
```

### Test Fingerprint Scanning

Ensure SecuGen service is running, then:

```bash
curl -k -X POST https://localhost:8000/SGIFPCapture \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Timeout=15000&TemplateFormat=ISO"
```

## 🐛 Troubleshooting

### SecuGen Scanner Not Detected

```bash
# Check if SecuGen service is running
curl -k https://localhost:8000/SGIFPCapture

# Restart SecuGen service
# Windows: Services → SecuGen → Restart
# Linux: sudo systemctl restart secugen
```

### MongoDB Connection Error

```bash
# Check MongoDB status
mongod --version

# Start MongoDB
mongod --dbpath /path/to/data
```

### Solana Transaction Fails

```bash
# Check Solana network status
solana cluster-version

# Check wallet balance
solana balance

# Request airdrop (devnet only)
solana airdrop 2
```

### Port Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /PID <process-id> /F

# Kill the process (Linux/Mac)
kill -9 <process-id>
```

## 📈 Future Enhancements

- [ ] Multi-factor authentication (fingerprint + PIN)
- [ ] Support for multiple fingerprint scanners
- [ ] Mobile app integration
- [ ] Advanced transaction analytics
- [ ] Merchant dashboard
- [ ] Loyalty rewards system
- [ ] Multi-currency support
- [ ] Mainnet deployment
- [ ] KYC integration
- [ ] Refund functionality

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Development Team** - Initial work

## 🙏 Acknowledgments

- **SecuGen** - Fingerprint scanner technology
- **Solana Foundation** - Blockchain infrastructure
- **Anchor** - Smart contract framework
- **React Team** - Frontend framework
- **MongoDB** - Database solution

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**⚠️ Important Notes:**

- This application is currently configured for **development/testing** purposes
- Uses Solana **devnet** - not suitable for production without modifications
- SecuGen SDK requires proper licensing for commercial use
- Ensure compliance with biometric data regulations (GDPR, CCPA, etc.)
- Always use HTTPS in production environments
- Implement proper error handling and logging for production

---

Made with ❤️ using React, Node.js, Solana, and SecuGen
