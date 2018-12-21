const faker = require('faker');


// generate 100 users
const users = [];
for (let i = 1; i < 101; i += 1) {
  const user = {};
  user.Username = faker.internet.userName();
  user.SignUpDate = faker.date.past();
  user.ProfileURL = `https://localhost:3000/users/${i}/profile`;
  user.ThumbnailURL = faker.image.avatar();
  user.CitiesVisited = Math.floor(16 * Math.random());
  user.HelpfulVotes = Math.floor(21 * Math.random());
  user.Contributions = Math.floor(16 * Math.random());
  user.Photos = Math.floor(16 * Math.random());
  user.Ranking = Math.floor(5 * Math.random()) + 1;
  user.HomeCity = `${faker.address.city()}, ${faker.address.state()}`;
  user.Category = ['Contributor', 'Admin'][Number(Math.random() < 0.05)];

  users.push(user);
}


// generate Review Distributions for each user
const reviewDists = [];
for (let i = 1; i < 101; i += 1) {
  const review = {};
  review.UserID = i;
  review.Excellent = Math.floor(16 * Math.random());
  review.VeryGood = Math.floor(16 * Math.random());
  review.Average = Math.floor(16 * Math.random());
  review.Poor = Math.floor(16 * Math.random());
  review.Terrible = Math.floor(16 * Math.random());

  reviewDists.push(review);
}


// generate 10 questions for each of the 100 hotels
const questions = [];
for (let i = 0; i < 1000; i += 1) {
  const question = {};
  question.Content = `${faker.lorem.paragraph()}?`;
  question.HotelID = Math.floor(i / 10) + 1;
  question.UserID = Math.floor(100 * Math.random()) + 1;
  question.PostedDate = faker.date.past();

  questions.push(question);
}


// // generate 5 answers for each of the 1000 questions
const answers = [];
for (let i = 0; i < 5000; i += 1) {
  const answer = {};
  answer.Content = faker.lorem.sentences();
  answer.QuestionID = Math.floor(i / 5) + 1;
  answer.UserID = Math.floor(100 * Math.random()) + 1;
  answer.Votes = Math.floor(21 * Math.random());

  answers.push(answer);
}

module.exports = {
  users,
  reviewDists,
  questions,
  answers,
};
