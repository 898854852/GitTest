const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const session = require('express-session');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: 'yourSecretKey',  // Use a secret key for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // In production, set `secure: true` if using HTTPS
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

// Routes
// Login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Sign-in (Login) route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.send('Invalid credentials');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Store user information in session
    req.session.user = user;
    res.redirect('/dashboard');  // Redirect to the dashboard after successful login
  } else {
    res.send('Invalid credentials');
  }
});

// Dashboard page (after login)
app.get('/dashboard', (req, res) => {
  // Check if user is logged in (if session exists)
  if (!req.session.user) {
    return res.redirect('/');  // Redirect to login if no user is logged in
  }
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Sign-up (Create new user) route
app.post('/signup', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.redirect('/signup?error=passwordsDoNotMatch');
  }

  // Hash the password before saving it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user and save to MongoDB
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.redirect('/');  // Redirect to login page after successful sign-up
  } catch (err) {
    res.send('Error saving user to database');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
