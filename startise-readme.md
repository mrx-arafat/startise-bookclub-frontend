# Startise Bookclub System

A modern library management system built with Node.js, MongoDB, and React.

## System Requirements

- Node.js v14 or higher
- MongoDB Atlas account
- Git (optional)
- npm (comes with Node.js)

## Backend Setup

1. Create and navigate to the project directory:
```bash
mkdir startise-bookclub
cd startise-bookclub
```

2. Initialize the project:
```bash
npm init -y
```

3. Install required dependencies:
```bash
npm install express mongoose dotenv cors
npm install nodemon --save-dev
```

4. Create the following folder structure:
```
startise-bookclub/
├── src/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── config/
├── .env
└── package.json
```

5. Create `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/startise_bookclub
JWT_SECRET=your_jwt_secret_here
```

6. Update `package.json` scripts:
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

### Backend Files Setup

1. Create `src/models/Book.js`:
```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  isbn: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['available', 'borrowed', 'maintenance'],
    default: 'available'
  },
  category: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
```

2. Create `src/controllers/bookController.js`:
```javascript
const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding book',
      error: error.message
    });
  }
};
```

3. Create `src/routes/bookRoutes.js`:
```javascript
const express = require('express');
const router = express.Router();
const { getAllBooks, addBook } = require('../controllers/bookController');

router.get('/', getAllBooks);
router.post('/', addBook);

module.exports = router;
```

4. Create `src/index.js`:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const bookRoutes = require('./routes/bookRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('📚 Connected to Startise Bookclub Database'))
  .catch((err) => console.error('Database connection error:', err));

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Startise Bookclub Management System');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Startise Bookclub Server running on port ${PORT}`);
});
```

## Frontend Setup

1. Create a new React application:
```bash
npx create-react-app startise-bookclub-frontend
cd startise-bookclub-frontend
```

2. Install additional dependencies:
```bash
npm install react-router-dom axios @headlessui/react lucide-react
npm install -D tailwindcss postcss autoprefixer
```

3. Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

4. Update `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Create the folder structure:
```
src/
├── components/
├── pages/
└── services/
```

7. Update the necessary frontend files as provided in the previous setup instructions.

## Running the Application

1. Start the backend:
```bash
cd startise-bookclub
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd startise-bookclub-frontend
npm start
```

The backend will run on http://localhost:3000 and the frontend will run on http://localhost:3001.

## MongoDB Atlas Setup

1. Create an account at https://cloud.mongodb.com
2. Create a new cluster
3. Add your IP address to the IP whitelist
4. Create a database user
5. Get your connection string and update it in the `.env` file

## Testing the API

Test the API using curl or Postman:

```bash
# Add a book
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: application/json" \
-d '{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "category": "Fiction"
}'

# Get all books
curl http://localhost:3000/api/books
```

## Troubleshooting

1. If MongoDB won't connect:
   - Check your connection string in .env
   - Verify IP whitelist in MongoDB Atlas
   - Ensure database user credentials are correct

2. If npm start fails:
   - Delete node_modules and package-lock.json
   - Run npm install again

3. If frontend can't connect to backend:
   - Verify backend is running
   - Check CORS settings
   - Confirm API URL in frontend code

## Additional Resources

- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Express.js Documentation: https://expressjs.com
- React Documentation: https://reactjs.org
- Tailwind CSS Documentation: https://tailwindcss.com