const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
mongoose.connect('mongodb+srv://Vaduk:VVe3buoQ@testcluster.p1hgiag.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) return done(null, user);
      else return done(null, false, { message: 'Incorrect password.' });
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login' })
);

app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashedPassword });
  user.save(err => {
    if (err) res.redirect('/register');
    else res.redirect('/login');
  });
});

app.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Render the dashboard
    res.send('Dashboard');
  } else {
    // Redirect to the login page if not authenticated
    res.redirect('/login');
  }
});

// Route to handle interpolation request
app.post('/interpolate', (req, res) => {
  const userInput = req.body.userInput;
  const dataPoints = req.body.dataPoints;

  const result = calculateInterpolation(userInput, dataPoints);

  res.json({ result });
});

// Given data points
let dataPoints = [
  { time: 0, temperature: 20 },
  { time: 3, temperature: 25 },
  { time: 6, temperature: 30 },
  { time: 9, temperature: 28 }
];

// Function to calculate Newton's interpolation
function calculateInterpolation(t, dataPoints) {
  const n = dataPoints.length - 1;
  let result = 0;

  for (let i = 0; i <= n; i++) {
    let term = dataPoints[i].temperature;

    for (let j = 0; j < i; j++) {
      term *= (t - dataPoints[j].time) / (dataPoints[i].time - dataPoints[j].time);
    }

    result += term;
  }

  return result;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
