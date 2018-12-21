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
      db.close();
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

module.exports = {
  getAllQuestions,
  postQuestion,
};
