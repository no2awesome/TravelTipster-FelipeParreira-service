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
const {
  getAllQuestions,
  postQuestion,
  deleteQuestion,
  postAnswer,
  deleteAnswer,
  voteAnswer,
  postReportForQuestion,
  postReportForAnswer,
  postMessageToUser,
} = require('./query');

// Testing routes in circle ci
app.get('/test', (req, res) => {
  res.status(201);
  res.send();
});

// GET questions for a certain hotel
app.get('/hotels/:hotelId/questions', (req, res) => {
  const { hotelId } = req.params;
  getAllQuestions(hotelId, res);
});

// POST a question to a hotel
app.post('/hotels/:hotelId/questions', (req, res) => {
  const { hotelId } = req.params;
  const { postedDate, content, userId } = req.body;
  // postedDate should be in the format: yyyy/mm/dd (as a string)
  postQuestion(hotelId, Number(userId), postedDate, content, res);
});

// DELETE a question for a hotel
app.delete('/hotels/:hotelId/questions/:questionId', (req, res) => {
  const { questionId } = req.params;
  const { userId } = req.body;
  deleteQuestion(questionId, userId, res);
});

// POST a report for a certain question
app.post('/hotels/:hotelId/questions/:questionId/reports', (req, res) => {
  // the following function is just a stub
  // since our Q&A module is not able to retrieve reports,
  // we are not saving anything; you can implement this in the future if you want.
  postReportForQuestion(res);
});

// POST an answer for a certain question
app.post('/hotels/:hotelId/questions/:questionId/answers', (req, res) => {
  const { questionId } = req.params;
  const { content, userId } = req.body;
  postAnswer(questionId, userId, content, res);
});

// DELETE an answer for a certain question
app.delete('/hotels/:hotelId/questions/:questionId/answers/:answerId', (req, res) => {
  const { answerId } = req.params;
  const { userId } = req.body;
  deleteAnswer(answerId, userId, res);
});

// Upvote or downvote a certain answer to a particular question
app.patch('/hotels/:hotelId/questions/:questionId/answers/:answerId/votes', (req, res) => {
  // vote should be 1 or -1
  const { vote } = req.body;
  const { answerId } = req.params;
  voteAnswer(answerId, Number(vote), res);
});

// POST a report for a certain answer
app.post('/hotels/:hotelId/questions/:questionId/answers/:answerId/reports', (req, res) => {
  // the following function is just a stub
  // since our Q&A module is not able to retrieve reports,
  // we are not saving anything; you can implement this in the future if you want.
  postReportForAnswer(res);
});

// POST a message for a certain user
app.post('/users/:userId/messages', (req, res) => {
  // the following function is just a stub
  // since our Q&A module is not able to retrieve messages,
  // we are not saving anything; you can implement this in the future if you want.
  postMessageToUser(res);
});
