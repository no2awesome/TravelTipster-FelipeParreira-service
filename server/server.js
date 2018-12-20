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

// ||**************************************************||
// ******* routing and dealing with API requests ********
// ||**************************************************||

// import models from the DB
const {
  Users, ReviewDistributions, Questions, Answers,
} = require('../db/models');

// import the db connection
const db = require('../db/index');
db.sync()
  .then(() => {
    Questions.find({
        attributes: { attributes: ['Content', 'PostedDate'] },
        where: { HotelID: 1 },
        include: [Users],
      })
        .then((data) => {
          console.log('DATA', data);
     })
     .then(() => {
         db.close();
      });
  });

// GET questions for a certain hotel
app.get('hotels/:id/questions', (req, res) => {
  const hotelId = req.params.id;
  Questions.findAll({
    attributes: { attributes: ['Content', 'PostedDate'] },
    where: { HotelID: hotelId },
    include: [Users],
  });
});

// POST a question to a hotel
app.post('hotels/:id/questions', (req, res) => {
  const hotelId = req.params.id;
});

// DELETE a question for a hotel
app.delete('hotels/:id/questions/:questionId', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
});

// POST a report for a certain question
app.post('hotels/:id/questions/:questionId/reports', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
});

// POST an answer for a certain question
app.post('hotels/:id/questions/:questionId/answers', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
});

// DELETE an answer for a certain question
app.delete('hotels/:id/questions/:questionId/answers/:answerId', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
  const answerId = req.params.id;
});

// Upvote or downvote a certain answer to a particular question
app.patch('hotels/:id/questions/:questionId/answers/:answerId/votes', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
  const answerId = req.params.id;
});

// POST a report for a certain question
app.post('hotels/:id/questions/:questionId/answers/:answerId/reports', (req, res) => {
  const hotelId = req.params.id;
  const questionId = req.params.id;
  const answerId = req.params.id;
});

// POST a message for a certain user
app.post('users/:userId/messages', (req, res) => {
  const userId = req.params.userId;
});
