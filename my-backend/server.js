// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://enhbolduugnaa_db_user:<db_password>@cluster0.ysmlxvx.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // Student fields
  grade: {
    type: String,
    required: function() { return this.userType === 'student'; }
  },
  studentId: {
    type: String,
    required: function() { return this.userType === 'student'; },
    unique: true,
    sparse: true
  },
  // Teacher fields
  subject: {
    type: String,
    required: function() { return this.userType === 'teacher'; }
  },
  teacherId: {
    type: String,
    required: function() { return this.userType === 'teacher'; },
    unique: true,
    sparse: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ============ REGISTER ROUTE ============
app.post('/api/register', async (req, res) => {
  try {
    const {
      userType,
      lastName,
      firstName,
      email,
      password,
      grade,
      studentId,
      subject,
      teacherId
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Бүртгэлтэй имэйл байна!'
      });
    }

    // Check if student ID already exists
    if (userType === 'student' && studentId) {
      const existingStudentId = await User.findOne({ studentId });
      if (existingStudentId) {
        return res.status(400).json({
          success: false,
          message: 'Бүртгэлтэй сурагчийн ID байна!'
        });
      }
    }

    // Check if teacher ID already exists
    if (userType === 'teacher' && teacherId) {
      const existingTeacherId = await User.findOne({ teacherId });
      if (existingTeacherId) {
        return res.status(400).json({
          success: false,
          message: 'Бүртгэлтэй багшийн ID байна!'
        });
      }
    }

    // Create new user
    const newUser = new User({
      userType,
      lastName,
      firstName,
      fullName: `${lastName} ${firstName}`,
      email,
      password,
      ...(userType === 'student' && { grade, studentId }),
      ...(userType === 'teacher' && { subject, teacherId })
    });

    await newUser.save();

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Амжилттай бүртгүүллээ!',
      user: userResponse
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа',
      error: error.message
    });
  }
});

// ============ LOGIN ROUTE ============
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Find user by email and userType
    const user = await User.findOne({ email, userType });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `${userType === 'student' ? 'Сурагч' : 'Багш'} имэйл эсвэл нууц үг буруу байна!`
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: `${userType === 'student' ? 'Сурагч' : 'Багш'} имэйл эсвэл нууц үг буруу байна!`
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Амжилттай нэвтэрлээ!',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа',
      error: error.message
    });
  }
});

// ============ GET ALL STUDENTS ============
app.get('/api/students', async (req, res) => {
  try {
    const students = await User.find({ userType: 'student' })
      .select('-password')
      .sort({ grade: 1, lastName: 1 });
    
    res.json({
      success: true,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

// ============ GET ALL TEACHERS ============
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ userType: 'teacher' })
      .select('-password')
      .sort({ lastName: 1 });
    
    res.json({
      success: true,
      teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

// ============ GET USER BY ID ============
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Хэрэглэгч олдсонгүй'
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

// ============ CHECK EMAIL EXISTS ============
app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    res.json({
      exists: !!user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});