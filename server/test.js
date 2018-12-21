// import utility functions
// import functions from './utils';

const {
  Users, ReviewDistributions, Questions, Answers,
} = require('../db/models');

// import the db connection
const db = require('../db/index');

// const { pluckData } = functions;
let questionData;
db.sync()
  .then(() => {
    Questions.findAll({
      raw: true,
      attributes: [['ID', 'QuestionID'], 'Content', 'PostedDate', 'UserID'],
      where: { HotelID: 1 },
      // include: [
      //   {
      //     model: Users,
      //     attributes: [['ID', 'UserID'], 'Username', 'ProfileURL', 'ThumbnailURL', 'SignUpDate', 'CitiesVisited', 'HelpfulVotes', 'HomeCity', 'Category', 'Ranking'],
      //     include: ReviewDistributions,
      //   },
      //   {
      //     model: Answers,
      //     attributes: [['ID', 'AnswerID'], 'Content', 'Votes'],
      //     include: [{ model: Users, attributes: [['ID', 'UserID'], 'Username', 'ProfileURL', 'SignUpDate', 'CitiesVisited', 'HelpfulVotes', 'HomeCity', 'Category', 'Ranking'], include: ReviewDistributions }],
      //   },
      // ],
    })
      .then((questions) => {
        // const questionsData = pluckData(questions);
        // for (let i = 0; i < questionsData.length; i += 1) {
        //   questionsData[i].User = pluckData(questionsData[i].User);
        //   const ReviewDistribution = questionsData[i].User.ReviewDistributions;
        //   questionsData[i].User.ReviewDistributions = pluckData(ReviewDistribution);
        //   for (let j = 0; j < questionsData[i].Answers.length; j += 1) {
        //     questionsData[i].Answers[j] = pluckData(questionsData[i].Answers[j]);
        //     questionsData[i].Answers[j].User = pluckData(questionsData[i].Answers[j].User);
        //     const reviewDistribution = questionsData[i].Answers[j].User.ReviewDistributions;
        //     questionsData[i].Answers[j].User.ReviewDistributions = pluckData(reviewDistribution);
        //   }
        // }
        // console.log('DATA', questionsData[0]);
        // console.log('DATA', questions);
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
      });
  });
