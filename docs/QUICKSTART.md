# Quick Start Guide - Educational Platform Review System

## 🚀 Get Running in 5 Minutes

### Step 1: Backend Setup (Terminal 1)

```powershell
cd backend
npm install
npm run seed
npm start
```

Expected output: `Server running on port 5000`

### Step 2: Frontend Setup (Terminal 2)

```powershell
cd client
npm install
npm start
```

Expected output: App opens at `http://localhost:3000`

---

## 📋 What You Get

✅ **Home Page** - Browse 6 sample educational platforms  
✅ **Filters** - Filter by category (Programming, Exams, School, College, Skills, Languages)  
✅ **Registration** - Create new account  
✅ **Login** - User authentication  
✅ **Platform Details** - View full platform info, ratings, reviews  
✅ **Review System** - Rate and comment on platforms  
✅ **Dashboard** - Admin can add new platforms  
✅ **Responsive Design** - Works on desktop & mobile  

---

## 🎨 Design Features

- **Color Scheme**: Purple gradient theme (#667eea - #764ba2)
- **Card-based Layout**: Modern grid design
- **Easy Navigation**: Intuitive navigation bar
- **Badges**: Type (Free/Paid/Freemium), Level, Category
- **Ratings**: Star display with review counts
- **Forms**: Clean, user-friendly input forms
- **Responsive**: Mobile-optimized interface

---

## 🔐 Test User Data

### Create Test Accounts
Register on the app using any:
- Username
- Email
- Password

### Admin Features
To test admin features (add platforms):
- Create an admin user via database directly, OR
- Use seed script to create admin manually

---

## 📦 Sample Platforms in Database

1. **CodeMaster** - Programming platform
2. **ExamPro** - Competitive exam prep
3. **ClassLearn** - School learning
4. **UniversityPlus** - College resources
5. **SkillHub** - Skill development
6. **LinguaFlex** - Language learning

Each has different pricing tiers and difficulty levels.

---

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.4
- Context API (Auth)
- Fetch API
- CSS3

**Backend:**
- Express 5.2.1
- MongoDB 9.2.0
- Mongoose
- JWT Authentication
- Bcrypt (Password hashing)

---

## 📝 Key URLs

| Feature | URL |
|---------|-----|
| Home | http://localhost:3000 |
| API | http://localhost:5000/api |
| Platforms API | http://localhost:5000/api/platforms |
| Reviews API | http://localhost:5000/api/reviews |

---

## ⚠️ Common Issues & Fixes

### Issue: "Cannot GET /api/platforms"
**Fix:** Ensure backend is running on port 5000

### Issue: "CORS error"
**Fix:** Both servers must be running (frontend + backend)

### Issue: "No platforms appear"
**Fix:** Run `npm run seed` in backend directory

### Issue: Reviews not saving
**Fix:** Make sure you're logged in before submitting reviews

---

## 🎯 How to Use

1. **Browse** - Explore platforms on home page
2. **Filter** - Click category buttons to filter
3. **View Details** - Click platform card to see full information
4. **Register** - Sign up for your account
5. **Review** - After login, add ratings and comments
6. **Admin (if applicable)** - Add new platforms via dashboard

---

## 📱 Features Breakdown

### For All Users
- ✅ Browse educational platforms
- ✅ View platform details
- ✅ Read reviews from other users
- ✅ Filter by category

### For Logged-In Users
- ✅ Submit platform reviews
- ✅ Rate platforms (1-5 stars)
- ✅ Add comments to reviews
- ✅ Edit own reviews
- ✅ Delete own reviews
- ✅ Track review history

### For Admin Users
- ✅ Add new educational platforms
- ✅ Edit platform information
- ✅ Delete platforms (if needed)
- ✅ Verify platform data
- ✅ All user features

---

## 🔧 Configuration

### Backend (.env file)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
```

### Frontend (hardcoded in api.js)
```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

---

## 📊 Platform Categories

The system categorizes educational platforms into:

| Category | Examples |
|----------|----------|
| **Programming** | Coding bootcamps, DSA courses |
| **Competitive Exams** | JEE, GATE, NEET prep |
| **School Learning** | K-12 online classes |
| **College Resources** | Degree programs, lectures |
| **Skill Development** | Professional courses, certifications |
| **Language Learning** | Foreign language courses |

---

## 🎓 Platform Types

Each platform has a pricing model:
- **Free** - No subscription required
- **Paid** - Subscription/purchase required
- **Freemium** - Free + Premium options

---

## 📈 Review System

- **Rating**: 1-5 stars
- **Comment**: Optional text review
- **Uniqueness**: One review per user per platform
- **Statistics**: Auto-calculated average rating and review count

---

## 🔐 Authentication Flow

1. User registers with username, email, password
2. Password hashed with bcryptjs (10 salt rounds)
3. User logs in → receives JWT token
4. Token stored in localStorage
5. Token sent with each authenticated request
6. Admin endpoints verify admin role

---

## 💾 Database Schema

### User
```
- username (unique)
- email (unique)
- password (hashed)
- isAdmin (boolean)
- createdAt, updatedAt
```

### Platform
```
- name
- description
- category (enum: 6 types)
- type (Free/Paid/Freemium)
- level (Beginner/Intermediate/Advanced)
- website (optional URL)
- averageRating (0-5)
- totalReviews
- createdAt, updatedAt
```

### Review
```
- platformId (reference)
- userId (reference)
- rating (1-5)
- comment (text)
- createdAt, updatedAt
- Unique constraint: (platformId, userId)
```

---

## 🎉 Ready to Go!

Your Educational Platform Review System is now ready to use. Follow the Quick Start steps above and start reviewing platforms!

For detailed documentation, see `PLATFORM_REVIEW_README.md`
