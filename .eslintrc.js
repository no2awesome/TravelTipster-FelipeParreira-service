/**
 * These rules enforce the AirBnB Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/airbnb/javascript
 */

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "react",
    // "jsx-ally",
    "import"
  ]
};
