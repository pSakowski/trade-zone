const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
const remoteDbUrl = process.env.DB_URL;

mongoose.connect(remoteDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database', err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, '/public')));

// Configure body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: remoteDbUrl,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    collectionName: 'sessions',
    cookie: {
      secure: false,
      sameSite: 'none',
    },
  }),
  resave: false,
  saveUninitialized: false,
}));

// Configure cors middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

// API routes
app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
