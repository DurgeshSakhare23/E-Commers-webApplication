# ProdMart - Full-Stack Product Management System

A complete eCommerce platform built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js) featuring customer and admin functionalities.

## 🚀 Features

### Customer Features
- ✅ User Registration & Login with JWT Authentication
- ✅ Browse Products with Category Filters
- ✅ Search Products by Name/Description
- ✅ View Product Details
- ✅ Add to Cart & Manage Cart Items
- ✅ Checkout with Shipping Address
- ✅ Multiple Payment Options (Cash on Delivery / Online Payment)
- ✅ Order Tracking & Order History
- ✅ User Profile Management

### Admin Features
- ✅ Admin Dashboard with Analytics
- ✅ Product Management (CRUD Operations)
- ✅ Order Management & Status Updates
- ✅ View Sales Statistics
- ✅ Real-time Order Status Tracking

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18.2) with Vite
- **React Router DOM** (v6.20) for routing
- **TailwindCSS** (v3.3) for styling
- **Axios** for API calls
- **Lucide React** for icons
- **Context API** for state management

### Backend
- **Node.js** with **Express.js** (v4.18)
- **MongoDB** with **Mongoose** (v8.0)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled
- **Express Validator** for input validation

## 📁 Project Structure

```
ProdMart/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   └── order.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── product.model.js
│   │   │   └── order.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   └── order.routes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── admin/
    │   │   ├── AdminLayout.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ProductList.jsx
    │   │   ├── AddProduct.jsx
    │   │   ├── EditProduct.jsx
    │   │   └── OrderList.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
cd ProdMart
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured with:
# - MongoDB Atlas connection string
# - JWT secrets
# - Port configuration

# Start the backend server
npm start

# For development with auto-reload
npm run dev
```

Backend will run on **http://localhost:5000**

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on **http://localhost:3000**

## 🔐 Environment Variables

Backend `.env` file is already configured with:

```env
PORT=5000
MONGODB_URI=mongodb+srv://sairaj22210515_db_user:Admin@cluster0.ou9hkvi.mongodb.net/prodmart?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_REFRESH_SECRET=your_refresh_token_secret_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

⚠️ **Important**: Change JWT secrets in production!

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update profile | Private |

### Product Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Order Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order | Customer |
| GET | `/api/orders` | Get user orders | Customer |
| GET | `/api/orders/:id` | Get order by ID | Customer |
| PUT | `/api/orders/:id/pay` | Update to paid | Customer |
| GET | `/api/orders/admin/orders` | Get all orders | Admin |
| PUT | `/api/orders/admin/orders/:id` | Update order status | Admin |
| GET | `/api/orders/admin/stats` | Get dashboard stats | Admin |

## 👤 Default Admin Access

To create an admin user, you need to:

1. Register a new user via `/api/auth/register`
2. Manually update the user's role in MongoDB:
   - Connect to MongoDB Atlas
   - Find the user in the `users` collection
   - Change `role` field from `"customer"` to `"admin"`

OR use MongoDB Compass/Atlas UI to directly insert an admin user:

```json
{
  "name": "Admin User",
  "email": "admin@prodmart.com",
  "password": "$2a$10$hashed_password_here",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 UI Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern UI** - Clean and intuitive interface with TailwindCSS
- **Real-time Updates** - Cart updates instantly
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Form Validation** - Client and server-side validation

## 🔧 Development Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start with nodemon (auto-reload)
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📦 Building for Production

### Backend
```bash
cd backend
# Backend is ready for deployment as-is
# Deploy to platforms like Render, Heroku, or Railway
```

### Frontend
```bash
cd frontend
npm run build
# Build output will be in 'dist' folder
# Deploy to Netlify, Vercel, or any static hosting
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Netlify/Vercel)
1. Run `npm run build`
2. Deploy `dist` folder
3. Configure API URL in environment

## 🧪 Testing the Application

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Register a Customer**: Go to http://localhost:3000/register
4. **Browse Products**: View products on home page
5. **Test Cart**: Add products and checkout
6. **Create Admin**: Update user role in MongoDB
7. **Admin Panel**: Login as admin and access /admin

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas credentials
- Check network access in MongoDB Atlas (whitelist your IP)
- Ensure database name is correct

### CORS Errors
- Backend CORS is already configured
- Check if both servers are running
- Verify API URL in frontend

### JWT Errors
- Check if JWT_SECRET is set in .env
- Ensure token is being sent in Authorization header

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built with ❤️ using MERN Stack

---

**Happy Coding! 🎉**
