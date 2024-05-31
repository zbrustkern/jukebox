const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const trackRouter = require('./controllers/tracks')
const path = require('path')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(path.dirname(__dirname), 'React-Front-End', 'dist')))


// Routes go here
app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/tracks', trackRouter);

//Refer to the built React app to handle all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'React-Front-End', 'dist', 'index.html'));
})

app.listen(3001, () => {
    console.log('The express app is ready!');
});