const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tbook'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// API endpoint for user registration
app.post('/register', async (req, res) => {
  const { name, email, userType, password } = req.body;
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, email, userType, password) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, email, userType, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
        return;
      }
      console.log('User registered successfully');

      // Immediately log in the user after registration
      loginUserAndRedirect(res, email, password);
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// API endpoint for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  loginUserAndRedirect(res, email, password);
});

// Function to login user and redirect to dashboard
async function loginUserAndRedirect(res, email, password) {
  try {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Error logging in' });
        return;
      }
      if (result.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }
      const user = result[0];
      // Compare hashed password with input password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }
      console.log('Login successful');
      // Redirect user to respective dashboard based on userType
      redirectToDashboard(res, user.userType);
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
}

// Function to redirect user to respective dashboard
function redirectToDashboard(res, userType) {
  let redirectUrl;
  switch (userType) {
    case 'Student/Learner':
      redirectUrl = '/learner';
      break;
    case 'Teacher/Tutor':
      redirectUrl = '/teacher';
      break;
    case 'Institution':
      redirectUrl = '/institution';
      break;
    case 'Others':
      redirectUrl = '/others';
      break;
    default:
      res.status(400).json({ error: 'Unknown user type' });
      return;
  }
  res.status(200).json({ message: 'Redirecting to dashboard', redirectUrl });
}

// Endpoint to save a new profile
app.post('/profiles', (req, res) => {
  const {
    profileName,
    profileRole,
    location,
    workplace,
    hometown,
    website,
    twitter,
    facebook,
    linkedin,
    instagram,
    profileImage,
    profileUserType // Make sure this property is correctly provided in the request body
  } = req.body;

  const profileData = {
    profileName,
    profileRole,
    location,
    workplace,
    hometown,
    website,
    twitter,
    facebook,
    linkedin,
    instagram,
    profileImage,
    profileUserType // Make sure to include it in the profile data to be saved
  };

  const sql = 'INSERT INTO profiles SET ?';
  db.query(sql, profileData, (error, results, fields) => {
    if (error) {
      console.error('Error saving profile:', error);
      res.status(500).json({ error: 'Error saving profile' });
      return;
    }
    console.log('Profile saved successfully');
    res.json({ message: 'Profile saved successfully', profileId: results.insertId });
  });
});

// Endpoint to fetch user profile data including user and profile details
app.get('/user-profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT u.id, u.name, u.email, u.userType, p.profileName, p.profileRole, p.location, p.workplace, p.hometown, p.website, p.twitter, p.facebook, p.linkedin, p.instagram, p.profileImage
    FROM users u
    LEFT JOIN profiles p ON u.id = p.id
    WHERE u.id = ?
  `;
  db.query(sql, [userId], (error, results, fields) => {
    if (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Error fetching user profile' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }
    const userProfile = results[0];
    res.json(userProfile);
  });
});

// Other endpoints for updating, deleting, and retrieving profiles can be added similarly

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
