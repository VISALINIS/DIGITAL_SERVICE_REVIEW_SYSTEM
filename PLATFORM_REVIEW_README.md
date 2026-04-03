# Educational Platform Review System

## Overview
A complete MERN stack application for reviewing and rating educational platforms. Transformed from "Digital Service Review System" to focus specifically on educational platforms.

## Features
- ✅ User authentication (Register/Login)
- ✅ Browse and filter educational platforms
- ✅ View detailed platform information
- ✅ Submit and manage reviews (one per user per platform)
- ✅ Admin capabilities to add/update/delete platforms
- ✅ Automatic rating calculation
- ✅ Responsive design

## Project Structure

### Backend
```
backend/
├── models/
│   ├── User.js         # User schema with auth
│   ├── Platform.js     # Educational platform schema
│   └── Review.js       # Review schema
├── controllers/
│   ├── auth.controller.js      # Auth logic
│   ├── platform.controller.js  # Platform CRUD & logic
│   └── review.controller.js    # Review management
├── routes/
│   ├── auth.routes.js          # Auth endpoints
│   ├── platform.routes.js      # Platform endpoints
│   └── review.routes.js        # Review endpoints
├── middleware/
│   └── auth.js                 # JWT authentication
├── server.js           # Main server file
├── seed.js             # Database seeding
├── package.json
└── .env                # Environment variables
```

### Frontend
```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── PlatformCard.js     # Platform card component
│   │   ├── ReviewForm.js       # Review submission form
│   │   ├── ReviewList.js       # Reviews display
│   │   ├── AuthForm.js         # Login/Register forms
│   │   └── AddPlatformForm.js  # Admin platform creation
│   ├── pages/
│   │   ├── Home.js             # Platform listing with filters
│   │   ├── Dashboard.js        # User dashboard
│   │   └── PlatformDetails.js  # Individual platform view
│   ├── context/
│   │   └── AuthContext.js      # Auth context & provider
│   ├── services/
│   │   └── api.js              # API calls
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── PlatformCard.css
│   │   ├── Home.css
│   │   ├── PlatformDetails.css
│   │   ├── AuthForm.css
│   │   ├── ReviewForm.css
│   │   ├── ReviewList.css
│   │   └── Dashboard.css
│   ├── App.js          # Main app component
│   ├── App.css         # Main styles
│   └── index.js        # Entry point
└── package.json
```

## Domain Transformation

### Terminology Changes
| Old | New |
|-----|-----|
| Service | Platform |
| Services | Platforms |
| Digital Service | Educational Platform |
| Service Details | Platform Details |
| Explore Services | Explore Learning Platforms |

### Categories
Educational platforms are categorized as:
1. **Programming** - Coding and DSA learning
2. **Competitive Exams** - Exam preparation
3. **School Learning** - K-12 education
4. **College Resources** - Higher education
5. **Skill Development** - Professional skills
6. **Language Learning** - Language courses

### Platform Fields
Each platform includes:
- **Name** - Platform name
- **Description** - What the platform offers
- **Category** - One of the 6 categories above
- **Type** - Free / Paid / Freemium
- **Level** - Beginner / Intermediate / Advanced
- **Website** - Platform URL (optional)
- **Average Rating** - Calculated from reviews (0-5)
- **Total Reviews** - Count of user reviews

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas connection)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with MongoDB URI:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key
```

4. Seed database with sample platforms:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

App runs on `http://localhost:3000`

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user

### Platforms
- **GET** `/api/platforms` - Get all platforms (with optional category filter)
- **GET** `/api/platforms/:id` - Get platform details with reviews
- **POST** `/api/platforms` - Create platform (Admin only)
- **PUT** `/api/platforms/:id` - Update platform (Admin only)
- **DELETE** `/api/platforms/:id` - Delete platform (Admin only)

### Reviews
- **GET** `/api/reviews/:platformId` - Get all reviews for platform
- **POST** `/api/reviews/:platformId` - Add/update review (requires auth)
- **DELETE** `/api/reviews/:reviewId` - Delete review (requires auth)

## Sample Data

The seed script (`backend/seed.js`) creates 6 sample platforms:

1. **CodeMaster** - Programming, Freemium, Beginner
2. **ExamPro** - Competitive Exams, Paid, Intermediate
3. **ClassLearn** - School Learning, Free, Beginner
4. **UniversityPlus** - College Resources, Freemium, Advanced
5. **SkillHub** - Skill Development, Paid, Intermediate
6. **LinguaFlex** - Language Learning, Freemium, Beginner

## User Roles

### Regular User
- View all platforms and filter by category
- View platform details and reviews
- Submit one review per platform
- Edit/delete own reviews
- Access dashboard

### Admin User
- All regular user features
- Add new platforms
- Update platform information
- Delete platforms
- Seed platform from admin dashboard

## Authentication
- JWT-based authentication
- Tokens stored in localStorage
- Token required for review operations
- Admin middleware for platform management

## Review System
- One review per user per platform (unique constraint)
- Ratings from 1-5 stars
- Optional comment field
- Reviews show username and date
- Average rating auto-calculated
- Review count tracked

## Key Implementation Details

### Frontend Architecture
- React hooks for state management
- Context API for auth state
- Fetch API for HTTP requests
- CSS modules for styling
- Responsive design (mobile-friendly)

### Backend Architecture
- Express.js server
- MongoDB with Mongoose ODM
- Middleware pattern for auth
- RESTful API design
- Input validation
- Error handling

### Security
- Password hashing with bcryptjs
- JWT token authentication
- CORS enabled
- Admin role verification
- Input validation on backend

## Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm install
npm run seed    # First time only
npm start
```

### Terminal 2 - Start Frontend
```bash
cd client
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## Test Accounts

After seeding, you can create test users through the Register page, or use admin account if configured.

## File Modifications Summary

### Created Files (43 new files)
- 3 Backend Models
- 3 Backend Controllers
- 3 Backend Routes
- 1 Backend Middleware
- 1 Seed Script
- 6 Frontend Components
- 3 Frontend Pages
- 1 Frontend Context
- 1 Frontend Service
- 8 Frontend Style Sheets
- Several configuration updates

### Modified Files
- `/backend/server.js` - Added routes
- `/backend/package.json` - Added scripts
- `/client/src/App.js` - Complete redesign
- `/client/src/App.css` - Updated styles
- `/client/src/index.css` - Global styles

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify MONGO_URI in `.env`
- Ensure MongoDB server is running
- Check network access if using Atlas

### "CORS errors"
- Backend should be running on port 5000
- Frontend on port 3000
- CORS is enabled in server

### "Reviews not showing"
- Clear browser localStorage
- Reload page
- Check network tab in DevTools

## Future Enhancements
- Platform rating badges
- Advanced search/filters
- User profiles
- Platform recommendations
- Comment system on reviews
- Admin analytics dashboard
- Email notifications
- Social sharing

## License
ISC

## Author
Generated as Educational Platform Review System Transformation
