const {
  Users, ReviewDistributions, Questions, Answers,
} = require('../db/models');

// import the db connection
const db = require('../db/index');

const getAllQuestions = (hotelId, res) => {
  let questionData;
  db.sync()
    .then(() => {
      Questions.findAll({
        raw: true,
        attributes: [['ID', 'QuestionID'], 'Content', 'PostedDate', 'UserID'],
        where: { HotelID: hotelId },
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

          const promisedAnswers = [];
          for (let i = 0; i < questionData.length; i += 1) {
            const promisedAnswer = Answers.findAll({
              raw: true,
              where: { QuestionID: questionData[i].QuestionID },
            });
            promisedAnswers.push(promisedAnswer);
          }

          return Promise.all(promisedAnswers);
        })
        .then((answers) => {
          for (let i = 0; i < answers.length; i += 1) {
            questionData[i].Answers = answers[i];
          }
          const flatennedAnswers = answers.flat();
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
            questionData[i].AnswersUsers = users.slice(i, i + 5);
          }
          console.log('question', questionData[0]);
          db.close();
          res.send(JSON.stringify(questionData));
          res.end();
        });
    });
};

module.exports = {
  getAllQuestions,
};
