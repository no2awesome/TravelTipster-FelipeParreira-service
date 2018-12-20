const faker = require('faker');


// generate 100 users
const users = [];
for (let i = 0; i < 100; i += 1) {
  const user = {};
  user.ID = i;
  user.Username = faker.internet.userName();
  user.SignUpDate = String(faker.date.past());
  user.ProfileURL = `https://localhost:3000/users/${user.ID}/profile`;
  user.ThumbnailURL = faker.image.avatar();
  user.CitiesVisited = Math.floor(16 * Math.random());
  user.HelpfulVotes = Math.floor(21 * Math.random());
  user.Contributions = Math.floor(16 * Math.random());
  user.Photos = Math.floor(16 * Math.random());

  users.push(user);
}


// generate Review Distributions for each user
const reviews = [];
for (let i = 0; i < 100; i += 1) {
  const review = {};
  review.ID = i;
  review.UserID = i;
  review.Excellent = Math.floor(16 * Math.random());
  review.VeryGood = Math.floor(16 * Math.random());
  review.Average = Math.floor(16 * Math.random());
  review.Poor = Math.floor(16 * Math.random());
  review.Terrible = Math.floor(16 * Math.random());

  reviews.push(review);
}

// generate 10 questions for each of the 100 hotels
const questions = [];
for (let i = 0; i < 1000; i += 1) {
  const question = {};
  question.ID = i;
  question.Content = `${faker.lorem.paragraph()}?`;
  question.HotelID = Math.floor(i / 10);
  question.UserID = Math.floor(100 * Math.random());
  question.PostedDate = String(faker.date.past());

  questions.push(question);
}

// generate 5 answers for each of the 1000 questions
const answers = [];
for (let i = 0; i < 5; i += 1) {
  const answer = {};
  answer.ID = i;
  answer.Content = faker.lorem.sentences();
  answer.QuestionID = Math.floor(i / 5);
  answer.UserID = Math.floor(100 * Math.random());
  answer.Votes = Math.floor(21 * Math.random());

  answers.push(answer);
}

module.exports = {
  users,
  reviews,
  questions,
  answers,
};
