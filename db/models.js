import db from './index';

const Sequelize = require('sequelize');

const Users = db.define('User', {
  ID: Sequelize.INTEGER,
  Username: Sequelize.STRING,
  SignUpDate: Sequelize.DATE,
  CitiesVisited: Sequelize.INTEGER,
  ProfileURL: Sequelize.STRING,
  HelpfulVotes: Sequelize.INTEGER,
  ThumbnailURL: Sequelize.STRING,
  Contributions: Sequelize.INTEGER,
  Photos: Sequelize.INTEGER,
}, { timestamps: false });

const Reviews = db.define('User', {
  ID: Sequelize.INTEGER,
  UserID: Sequelize.INTEGER,
  Excellent: Sequelize.INTEGER,
  VeryGood: Sequelize.INTEGER,
  Average: Sequelize.INTEGER,
  Poor: Sequelize.INTEGER,
  Terrible: Sequelize.INTEGER,
}, { timestamps: false });

const Questions = db.define('User', {
  ID: Sequelize.INTEGER,
  Content: Sequelize.STRING,
  UserID: Sequelize.INTEGER,
  HotelID: Sequelize.INTEGER,
  PostedDate: Sequelize.DATE,
}, { timestamps: false });

const Answers = db.define('User', {
  ID: Sequelize.INTEGER,
  Content: Sequelize.STRING,
  UserID: Sequelize.INTEGER,
  QuestionID: Sequelize.INTEGER,
  Votes: Sequelize.INTEGER,
}, { timestamps: false });

module.exports = {
  Users,
  Reviews,
  Questions,
  Answers,
};
