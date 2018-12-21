const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// initialize the server
const app = express();

// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(morgan('combined'));

// choose PORT
const port = 3000;

// listen to the port and serve public folder
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.static(path.join(__dirname, '../public')));

// ||**************************************************||
// ******* routing and dealing with API requests ********
// ||**************************************************||

// import helper query functions
const { getAllQuestions, postQuestion } = require('./query');

// GET questions for a certain hotel
app.get('/hotels/:id/questions', (req, res) => {
  const hotelId = req.params.id;
  getAllQuestions(hotelId, res);
});

// POST a question to a hotel
app.post('/hotels/:id/questions', (req, res) => {
  const hotelId = req.params.id;
  let { userId } = req.body;
  const { postedDate, content } = req.body;
  userId = Number(userId);
  postQuestion(hotelId, userId, postedDate, content, res);
});

// DELETE a question for a hotel
app.delete('/hotels/:id/questions/:questionId', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
});

// POST a report for a certain question
app.post('/hotels/:id/questions/:questionId/reports', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
});

// POST an answer for a certain question
app.post('/hotels/:id/questions/:questionId/answers', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
});

// DELETE an answer for a certain question
app.delete('/hotels/:id/questions/:questionId/answers/:answerId', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
  const answerId = req.params.id;
});

// Upvote or downvote a certain answer to a particular question
app.patch('/hotels/:id/questions/:questionId/answers/:answerId/votes', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
  const answerId = req.params.id;
});

// POST a report for a certain question
app.post('/hotels/:id/questions/:questionId/answers/:answerId/reports', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
  const answerId = req.params.id;
});

// POST a message for a certain user
app.post('/users/:userId/messages', (req, res) => {
  const { userId } = req.params;
});
