const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres')
const port = process.env.PORT || 3000;

// mongodb connection
mongoose.connect('mongodb://localhost/vidly')
.then(()=> console.log('Connected successfully..'))
.catch(err => console.error('could not connect to database...'));

app.use(express.json()); // req.body //The work of express.json is to send the request and pass data in json object.
app.use('/api/genres',genres)

app.listen(port, () => console.log(`Listening on port ${port}...`));