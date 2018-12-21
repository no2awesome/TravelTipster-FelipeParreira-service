// import the models
const {
  Users, ReviewDistributions, Questions, Answers,
} = require('../db/models');

// import the db connection
const db = require('../db/index');

const getAllQuestions = (HotelID, res) => {
  let questionData;
  db.sync()
    .then(() => {
      const promisedQuestions = Questions.findAll({
        raw: true,
        attributes: [['ID', 'QuestionID'], 'Content', 'PostedDate', 'UserID'],
        where: { HotelID },
      });
      return promisedQuestions;
    })
    .then((questions) => {
      questionData = questions;
      const promisedUsers = [];
      for (let i = 0; i < questions.length; i += 1) {
        const promisedUser = Users.findOne({
          raw: true,
          where: { ID: questions[i].UserID },
          attributes: ['Username', 'ProfileURL', 'ThumbnailURL', 'SignUpDate', 'CitiesVisited', 'HelpfulVotes', 'HomeCity', 'Category', 'Ranking'],
          include: { model: ReviewDistributions, attributes: ['Excellent', 'VeryGood', 'Average', 'Poor', 'Terrible'] },
        });

        promisedUsers.push(promisedUser);
      }

      return Promise.all(promisedUsers);
    })
    .then((users) => {
      for (let i = 0; i < users.length; i += 1) {
        questionData[i].User = users[i];
      }

      const promisedAnswersGroups = [];
      for (let i = 0; i < questionData.length; i += 1) {
        const promisedAnswerGroup = Answers.findAll({
          raw: true,
          where: { QuestionID: questionData[i].QuestionID },
        });
        promisedAnswersGroups.push(promisedAnswerGroup);
      }

      return Promise.all(promisedAnswersGroups);
    })
    .then((answerGroups) => {
      for (let i = 0; i < answerGroups.length; i += 1) {
        questionData[i].Answers = answerGroups[i];
      }
      const flatennedAnswers = answerGroups.flat();
      const promisedUsers = [];
      for (let i = 0; i < flatennedAnswers.length; i += 1) {
        const promisedUser = Users.findOne({
          raw: true,
          where: { ID: flatennedAnswers[i].UserID },
          include: { model: ReviewDistributions, attributes: ['Excellent', 'VeryGood', 'Average', 'Poor', 'Terrible'] },
        });
        promisedUsers.push(promisedUser);
      }

      return Promise.all(promisedUsers);
    })
    .then((users) => {
      for (let i = 0; i < questionData.length; i += 1) {
        questionData[i].AnswersUsers = users.splice(0, questionData[i].Answers.length);
      }
      console.log('question', questionData[0]);
      res.send(JSON.stringify(questionData));
      res.end();
    });
};

const postQuestion = (HotelID, UserID, PostedDate, Content, res) => {
  db.sync()
    .then(() => {
      Questions.create({
        UserID, HotelID, Content, PostedDate,
      })
        .then(() => {
          res.status(201);
          res.end('Question posted successfully!');
        });
    });
};

const deleteQuestion = (QuestionID, UserID, res) => {
  db.sync()
    .then(() => {
      const foundQuestion = Questions.findOne({
        where: {
          ID: QuestionID,
          UserID,
        },
      });

      return Promise.resolve(foundQuestion);
    })
    .then((question) => {
      if (!question) {
        throw question;
      }
      const deletedAnswers = Answers.destroy({
        where: {
          QuestionID,
        },
      });
      const deletedQuestion = Questions.destroy({
        where: {
          ID: QuestionID,
          UserID,
        },
      });

      return Promise.all([deletedAnswers, deletedQuestion]);
    })
    .then(() => {
      res.send('Question deleted successfully!');
    })
    .catch(() => {
      res.status(401);
      res.send('You are not the author of that question :(');
    });
};

const postAnswer = (QuestionID, UserID, Content, res) => {
  db.sync()
    .then(() => {
      Answers.create({
        QuestionID,
        UserID,
        Content,
        Votes: 0,
      })
        .then(() => {
          res.status(201);
          res.send('Answer posted successfully!');
        });
    });
};

const deleteAnswer = (AnswerID, UserID, res) => {
  db.sync()
    .then(() => {
      const foundAnswer = Answers.findOne({
        raw: true,
        where: {
          ID: AnswerID,
          UserID,
        },
      });

      return Promise.resolve(foundAnswer);
    })
    .then((answer) => {
      if (!answer) {
        throw answer;
      }
      Answers.destroy({
        where: {
          ID: AnswerID,
        },
      })
        .then(() => {
          res.send('Answer deleted succesfully!');
        });
    })
    .catch(() => {
      res.status(401);
      res.send('You are not the author of that answer :(');
    });
};

const voteAnswer = (AnswerID, vote, res) => {
  db.sync()
    .then(() => {
      const foundAnswer = Answers.findOne({
        raw: true,
        where: {
          ID: AnswerID,
        },
      });

      return Promise.resolve(foundAnswer);
    })
    .then((answer) => {
      if (!answer) {
        throw answer;
      }

      return Answers.update({
        Votes: answer.Votes + vote,
      }, {
        where: { ID: AnswerID },
      });
    })
    .then((() => {
      res.send('Vote added!');
    }))
    .catch(() => {
      res.status(404);
      res.send('The answer looked for doesn\'t exist.');
    });
};

// The following 3 functions are just a stub functions
// check their invocation inside server.js

const postReportForQuestion = (res) => {
  res.status(201);
  res.send('Report for question posted!');
};

const postMessageToUser = (res) => {
  res.status(201);
  res.send('Message for user saved!');
};

const postReportForAnswer = (res) => {
  res.status(201);
  res.send('Report for answer posted!');
};

module.exports = {
  getAllQuestions,
  postQuestion,
  deleteQuestion,
  postAnswer,
  deleteAnswer,
  voteAnswer,
  postReportForQuestion,
  postReportForAnswer,
  postMessageToUser,
};
