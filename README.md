# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

#### 1. Data Base
  ###### In order to create the Data Base in your local machine and populate it with dummy data:

  1.1 Copy `db/config.example.js`, renaming it to `config.js` (keep it in the same folder);

  1.2 Inside `config.js`, insert the data for your DB credentials;

  1.3 If your username is not `root`, change also the username in the db script inside of `package.json` (the username is the word after `-u`);

  1.4 Run `npm run db` in terminal to create the DB and populate it with dummy data.


> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
