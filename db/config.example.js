// 1 - copy this file, renaming it to config.js (keep it in the same folder);
// ---- [in config.js] ----
// 2 - insert the data for your DB credentials;
// 3 - if your username is not 'root', change also the username in the db script inside of
// package.json (the username is the word after '-u');
// 4 - run 'npm run db' in terminal to create the DB and populate it with dummy data.

module.exports = {
  username: 'YOUR_USERNAME_HERE',
  password: 'YOUR_PASSWORD_HERE',
};
