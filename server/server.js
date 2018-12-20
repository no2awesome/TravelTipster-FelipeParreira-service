const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// initialize the server
const app = express();

// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// choose PORT
const port = 3000;

// listen to the port and serve public folder
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.static(path.join(__dirname, '../public')));

// routing and dealing with API requests

// GET questions for a certain hotel
app.get('hotels/:id/questions', (req, res) => {

});

// POST a question to a hotel
app.post('hotels/:id/questions', (req, res) => {

});

// DELETE a question for a hotel
app.delete('hotels/:id/questions/:questionId', (req, res) => {

});

// POST a report for a certain question
app.post('hotels/:id/questions/:questionId/reports', (req, res) => {

});

// POST an answer for a certain question
app.post('hotels/:id/questions/:questionId/answers', (req, res) => {

});

// DELETE an answer for a certain question
app.delete('hotels/:id/questions/:questionId/answers/:answersId', (req, res) => {

});

// Upvote or downvote a certain answer to a particular question
app.patch('hotels/:id/questions/:questionId/answers/:answersId/votes', (req, res) => {

});

// POST a report for a certain question
app.post('hotels/:id/questions/:questionId/answers/:answersId/reports', (req, res) => {

});

// POST a message for a certain user
app.post('users/:usersId/messages', (req, res) => {

});
