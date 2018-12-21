// import the models
const {
  Users, ReviewDistributions, Questions, Answers,
} = require('./models');

// import the data
const {
  users, reviewDists, questions, answers,
} = require('./dataGenerator');

// import the db connection
const db = require('./index');


db.sync()
  .then(() => {
    const promisedUsers = [];
    for (let i = 0; i < users.length; i += 1) {
      const user = Users.build(users[i]);
      promisedUsers.push(user.save());
    }
    return Promise.all(promisedUsers).then(() => console.log('Users saved :)'));
  })
  .then(() => {
    const promisedReviews = [];
    for (let i = 0; i < reviewDists.length; i += 1) {
      const review = ReviewDistributions.build(reviewDists[i]);
      promisedReviews.push(review.save());
    }
    return Promise.all(promisedReviews).then(() => console.log('Reviews saved :)'));
  })
  .then(() => {
    const promisedQuestions = [];
    for (let i = 0; i < questions.length; i += 1) {
      const question = Questions.build(questions[i]);
      promisedQuestions.push(question.save());
    }
    return Promise.all(promisedQuestions).then(() => console.log('Questions saved :)'));
  })
  .then(() => {
    const promisedAnswers = [];
    for (let i = 0; i < answers.length; i += 1) {
      const answer = Answers.build(answers[i]);
      promisedAnswers.push(answer.save());
    }
    return Promise.all(promisedAnswers).then(() => console.log('Answers saved :)'));
  })
  .then(() => {
    db.close();
  });
