# MERN Stack Template

A comprehensive boilerplate for building full-stack applications with MongoDB, Express, React, and Node.js.

## Features

- Complete MERN stack implementation
- Authentication with JWT
- User registration and login
- Protected routes
- Modern React with hooks and context API
- Express API with proper structure
- MongoDB connection with Mongoose
- Error handling middleware
- Responsive design
- Environment variables configuration

## Project Structure

```
mern-template/
├── client/               # React frontend
│   ├── public/           # Static files
│   ├── src/              # React source code
│   │   ├── components/   # React components
│   │   │   ├── Header.js # Navigation header with authentication state
│   │   │   ├── Footer.js # Page footer
│   │   │   └── PrivateRoute.js # Route protection wrapper
│   │   ├── context/      # Context API files
│   │   │   └── AuthContext.js # Authentication context provider
│   │   ├── pages/        # React pages
│   │   │   ├── Home.js   # Landing page with post listings
│   │   │   ├── Login.js  # User login form
│   │   │   ├── Register.js # User registration form
│   │   │   ├── Dashboard.js # User dashboard (protected)
│   │   │   ├── CreatePost.js # Post creation form (protected)
│   │   │   └── PostDetail.js # Individual post view
│   │   ├── utils/        # Utility functions
│   │   └── App.js        # Main App component with routes
├── server/               # Express backend
│   ├── config/           # Configuration files
│   │   └── db.js         # Database connection setup
│   ├── controllers/      # Route controllers
│   │   ├── userController.js # User authentication logic
│   │   └── postController.js # Post CRUD operations
│   ├── middleware/       # Custom middleware
│   │   ├── authMiddleware.js # JWT authentication middleware
│   │   └── errorMiddleware.js # Error handling middleware
│   ├── models/           # Mongoose models
│   │   ├── userModel.js  # User data schema
│   │   └── postModel.js  # Post data schema
│   ├── routes/           # Express routes
│   │   ├── userRoutes.js # Authentication endpoints
│   │   └── postRoutes.js # Post management endpoints
│   └── server.js         # Entry point
├── config/               # Global configuration
│   └── default.json      # Default configuration
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # NPM dependencies
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-template
   ```

2. Install dependencies for server and client:
   ```
   npm run install-all
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   This will start both the server (on port 5000) and client (on port 3000).

## Using This Template

### Authentication Flow

1. **Registration**: Users can create an account via the `/register` route
   - Form collects name, email, and password
   - Passwords are hashed using bcrypt
   - JWT token is generated and returned on successful registration

2. **Login**: Users can log in via the `/login` route
   - JWT token is generated and returned on successful login
   - User data and token are stored in localStorage

3. **Protected Routes**: Certain routes require authentication
   - `PrivateRoute` component checks for valid JWT in localStorage
   - Unauthenticated users are redirected to login

### Key Components

#### Frontend

- **AuthContext**: Manages authentication state throughout the app
  - Provides user data to components
  - Handles login, registration, and logout functions
  - Persists authentication status using localStorage

- **Header Component**: Navigation and auth-aware UI elements
  - Shows different options based on authentication status
  - Provides navigation links to key areas of the application

- **PrivateRoute Component**: Protects routes requiring authentication
  - Wraps protected routes in the React Router configuration
  - Redirects unauthenticated users to login

#### Pages

- **Home**: Public landing page displaying posts
- **Login/Register**: User authentication forms
- **Dashboard**: Protected page showing user-specific content
- **CreatePost**: Form for creating new content (protected)
- **PostDetail**: Displays individual post information

#### Backend API Endpoints

- **Authentication**:
  - `POST /api/users/register` - Create new user account
  - `POST /api/users/login` - Authenticate user
  - `GET /api/users/me` - Get current user profile (protected)

- **Posts**:
  - `GET /api/posts` - Get all posts
  - `POST /api/posts` - Create a new post (protected)
  - `GET /api/posts/:id` - Get a specific post
  - `PUT /api/posts/:id` - Update a post (protected)
  - `DELETE /api/posts/:id` - Delete a post (protected)
  - `GET /api/posts/user` - Get posts by current user (protected)

### Available Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run server` - Run only the backend server with nodemon
- `npm run client` - Run only the React frontend
- `npm start` - Run the backend server in production mode
- `npm run install-all` - Install dependencies for both client and server

### Production Deployment

To create a production build:
```
cd client
npm run build
```

Then start the server:
```
npm start
```

This will serve the built React files from the server.

### Extending the Template

#### Adding New Components

1. Create component file in `client/src/components`
2. Import and use in relevant pages or components
3. Add necessary styling in App.css or component-specific CSS

#### Adding New Routes

1. Create page component in `client/src/pages`
2. Add route in `App.js`:
   ```jsx
   <Route path="/your-route" element={<YourComponent />} />
   ```
3. For protected routes, wrap with PrivateRoute:
   ```jsx
   <Route path="/protected-route" element={<PrivateRoute />}>
     <Route path="/protected-route" element={<YourProtectedComponent />} />
   </Route>
   ```

#### Adding New API Endpoints

1. Create controller function in appropriate controller file
2. Add route in appropriate routes file
3. Apply middleware as needed (auth, validation, etc.)

## License

This project is licensed under the MIT License.
