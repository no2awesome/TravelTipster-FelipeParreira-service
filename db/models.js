const Sequelize = require('sequelize');
const db = require('./index');

// defines models
const Users = db.define('User', {
  Username: Sequelize.STRING,
  SignUpDate: Sequelize.DATE,
  CitiesVisited: Sequelize.INTEGER,
  ProfileURL: Sequelize.STRING,
  HelpfulVotes: Sequelize.INTEGER,
  ThumbnailURL: Sequelize.STRING,
  Contributions: Sequelize.INTEGER,
  Photos: Sequelize.INTEGER,
  Ranking: Sequelize.INTEGER,
  HomeCity: Sequelize.STRING,
  Category: Sequelize.STRING,
}, { timestamps: false });

const ReviewDistributions = db.define('ReviewDistributions', {
  UserID: Sequelize.INTEGER,
  Excellent: Sequelize.INTEGER,
  VeryGood: Sequelize.INTEGER,
  Average: Sequelize.INTEGER,
  Poor: Sequelize.INTEGER,
  Terrible: Sequelize.INTEGER,
}, { timestamps: false });

const Questions = db.define('Question', {
  Content: Sequelize.STRING,
  UserID: Sequelize.INTEGER,
  HotelID: Sequelize.INTEGER,
  PostedDate: Sequelize.DATE,
}, { timestamps: false });

const Answers = db.define('Answers', {
  Content: Sequelize.STRING,
  UserID: Sequelize.INTEGER,
  QuestionID: Sequelize.INTEGER,
  Votes: Sequelize.INTEGER,
}, { timestamps: false });

// defines associations among models
Users.hasMany(Questions, { foreignKey: 'UserID' });
Questions.belongsTo(Users, { foreignKey: 'UserID' });

Users.hasMany(Answers, { foreignKey: 'UserID' });
Answers.belongsTo(Users, { foreignKey: 'UserID' });

Questions.hasMany(Answers, { foreignKey: 'QuestionID' });
Answers.belongsTo(Questions, { foreignKey: 'QuestionID' });

Users.hasOne(ReviewDistributions, { foreignKey: 'UserID' });

module.exports = {
  Users,
  ReviewDistributions,
  Questions,
  Answers,
};
