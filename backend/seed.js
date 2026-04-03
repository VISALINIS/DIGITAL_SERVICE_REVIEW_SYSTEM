const mongoose = require("mongoose");
const Platform = require("./models/Platform");
const User = require("./models/User");
require("dotenv").config();

const seedPlatforms = [
  // Programming Category (3 platforms)
  {
    name: "CodeMaster",
    description: "Learn programming, DSA, and system design with structured courses.",
    category: "Programming",
    type: "Freemium",
    level: "Beginner",
    website: "https://codemaster.com",
  },
  {
    name: "AlgoExpert Hub",
    description: "Advanced coding interview preparation with real-world problems.",
    category: "Programming",
    type: "Paid",
    level: "Advanced",
    website: "https://algoexpert.io",
  },
  {
    name: "WebDev Academy",
    description: "Complete web development course from basics to advanced projects.",
    category: "Programming",
    type: "Freemium",
    level: "Intermediate",
    website: "https://webdevacademy.com",
  },

  // Competitive Exams Category (3 platforms)
  {
    name: "ExamPro",
    description: "Prepare for government and competitive exams with mock tests.",
    category: "Competitive Exams",
    type: "Paid",
    level: "Intermediate",
    website: "https://exampro.com",
  },
  {
    name: "PrepMaster",
    description: "Daily quizzes and exam preparation materials for all major exams.",
    category: "Competitive Exams",
    type: "Freemium",
    level: "Beginner",
    website: "https://prepmaster.com",
  },
  {
    name: "GateCoach",
    description: "Specialized coaching for GATE exams with doubt solving.",
    category: "Competitive Exams",
    type: "Paid",
    level: "Advanced",
    website: "https://gatecoach.com",
  },

  // School Learning Category (3 platforms)
  {
    name: "SmartSchool",
    description: "Interactive learning platform for school students with video lessons.",
    category: "School Learning",
    type: "Free",
    level: "Beginner",
    website: "https://smartschool.com",
  },
  {
    name: "EduKids",
    description: "Gamified learning platform for children and school students.",
    category: "School Learning",
    type: "Freemium",
    level: "Beginner",
    website: "https://edukids.com",
  },
  {
    name: "SchoolPlus",
    description: "Comprehensive school curriculum with study materials and notes.",
    category: "School Learning",
    type: "Freemium",
    level: "Intermediate",
    website: "https://schoolplus.com",
  },

  // College Resources Category (3 platforms)
  {
    name: "CampusConnect",
    description: "Platform for accessing college resources, notes, and announcements.",
    category: "College Resources",
    type: "Free",
    level: "Intermediate",
    website: "https://campusconnect.com",
  },
  {
    name: "UniHub",
    description: "All-in-one college portal for assignments, notes, and collaboration.",
    category: "College Resources",
    type: "Freemium",
    level: "Intermediate",
    website: "https://unihub.com",
  },
  {
    name: "AcademicPro",
    description: "Advanced research resources and academic materials for college students.",
    category: "College Resources",
    type: "Paid",
    level: "Advanced",
    website: "https://academicpro.com",
  },

  // Skill Development Category (3 platforms)
  {
    name: "SkillBoost",
    description: "Learn industry skills like communication, leadership, and productivity.",
    category: "Skill Development",
    type: "Freemium",
    level: "Beginner",
    website: "https://skillboost.com",
  },
  {
    name: "CareerUp",
    description: "Professional development courses for career growth and job readiness.",
    category: "Skill Development",
    type: "Paid",
    level: "Advanced",
    website: "https://careerup.com",
  },
  {
    name: "TalentHub",
    description: "Marketplace for learning soft skills and professional certifications.",
    category: "Skill Development",
    type: "Freemium",
    level: "Intermediate",
    website: "https://talenthub.com",
  },

  // Language Learning Category (3 platforms)
  {
    name: "LinguaLearn",
    description: "Learn new languages with interactive lessons and practice exercises.",
    category: "Language Learning",
    type: "Freemium",
    level: "Beginner",
    website: "https://lingualearn.com",
  },
  {
    name: "SpeakEasy",
    description: "Improve speaking and communication skills in multiple languages.",
    category: "Language Learning",
    type: "Paid",
    level: "Intermediate",
    website: "https://speakeasy.com",
  },
  {
    name: "PolyGlot Pro",
    description: "Advanced language learning with culture immersion and native tutors.",
    category: "Language Learning",
    type: "Paid",
    level: "Advanced",
    website: "https://polyglotpro.com",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Seed admin user
    await User.deleteMany({ role: "admin" });
    const adminUser = new User({
      username: "admin",
      email: "admin@platform.com",
      password: "admin123456",
      role: "admin",
      isAdmin: true,
    });
    await adminUser.save();
    console.log("✅ Admin user created: admin@platform.com (password: admin123456)");

    // Seed platforms
    await Platform.deleteMany({});
    console.log("Cleared existing platforms");

    const inserted = await Platform.insertMany(seedPlatforms);
    console.log(`${inserted.length} platforms inserted successfully`);

    await mongoose.connection.close();
    console.log("Seeding completed");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
