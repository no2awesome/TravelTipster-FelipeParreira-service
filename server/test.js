const {
  Users, ReviewDistributions, Questions, Answers,
} = require('../db/models');

// import the db connection
const db = require('../db/index');

db.sync()
  .then(() => {
    Questions.findAll({
      attributes: ['ID', 'Content', 'PostedDate'],
      where: { HotelID: 1 },
      include: [
        {
          model: Users,
          attributes: ['Username', 'ProfileURL', 'ThumbnailURL'],
        },
        {
          model: Answers,
          attributes: ['Content', 'Votes'],
          include: [{ model: Users, attributes: ['Username', 'ProfileURL', 'SignUpDate', 'CitiesVisited', 'HelpfulVotes', ''] }],
        },
      ],
    })
      .then((data) => {
        console.log('DATA', data[0].dataValues.User.dataValues);
      })
      .then(() => {
        db.close();
      });
  });
