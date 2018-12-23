/* eslint no-undef: 0 */ // --> OFF
const request = require('request-promise');
// const httpMocks = require('node-mocks-http');
const { toBeType } = require('jest-tobetype');
const fetch = require('node-fetch');

expect.extend({ toBeType });

// beforeAll();
// afterAll();

describe('GET all questions', async () => {
  let questions;

  beforeEach(async () => {
    const response = await fetch('http://localhost:3000/hotels/4/questions');
    questions = await response.json();
  });

  test('it should send an array of 10 questions', async () => {
    expect(questions).toBeDefined();
    expect(questions).toBeType('array');
    expect(questions.length).toBe(10);
  });

  test('it should send an array whose elements are questions', () => {
    const question = questions[0];
    expect(question).toBeDefined();
    expect(question).toBeType('object');
    expect(question.QuestionID).toBeDefined();
    expect(question.QuestionID).toBeType('number');
    expect(question.Content).toBeDefined();
    expect(question.Content).toBeType('string');
  });

  test('it should send questions associated with a specific user', () => {
    const userId = questions[0].UserID;
    const user = questions[0].User;
    expect(userId).toBeDefined();
    expect(userId).toBeType('number');
    expect(user).toBeDefined();
    expect(user).toBeType('object');
    expect(user.Username).toBeDefined();
    expect(user.ThumbnailURL).toBeDefined();
    expect(user.SignUpDate).toBeDefined();
  });

  test('it should send 5 answers for each question', () => {
    const question = questions[0];
    const answers = question.Answers;
    const answer = answers[0];
    expect(answers).toBeDefined();
    expect(answers).toBeType('array');
    expect(answers.length).toBe(5);
    expect(answer.Content).toBeDefined();
    expect(answer.UserID).toBeDefined();
    expect(answer.UserID).toBeType('number');
    expect(question.QuestionID).toEqual(answer.QuestionID);
  });

  test('it should send the 5 users associated with each answer', () => {
    const answer = questions[0].Answers[0];
    const users = questions[0].AnswersUsers;
    const user = users[0];
    expect(users).toBeDefined();
    expect(users).toBeType('array');
    expect(users.length).toBe(5);
    expect(user).toBeDefined();
    expect(user).toBeType('object');
    expect(user.Username).toBeDefined();
    expect(user.id).toEqual(answer.UserID);
  });
});

describe('POST a question for a certain hotel', () => {
  let questions;
  let question;
  const body = {
    postedDate: '2018/12/22',
    content: 'Is this route really working?',
    userId: 23,
  };

  beforeEach(async () => {
    await request.post({ url: 'http://localhost:3000/hotels/4/questions' }).form(body)
      .then(async () => {
        questions = await request.get({ url: 'http://localhost:3000/hotels/4/questions' });
        [question] = JSON.parse(questions).slice(-1);
      });
  });

  afterEach(() => {
    request.delete({ url: `http://localhost:3000/hotels/4/questions/${question.QuestionID}` }).form({ userId: 23 });
  });

  test('it should POST a question to a certain hotel', () => {
    expect(question).toBeDefined();
    expect(question.UserID).toBe(body.userId);
    expect(question.Content).toBe(body.content);
    expect(question.PostedDate.split('-').join('/')).toEqual(body.postedDate);
  });
});

describe('DELETE a question for a certain hotel', async () => {
  let questions;
  const body = {
    postedDate: '2018/12/22',
    content: 'Is this route really working?',
    userId: 23,
  };

  beforeEach(async () => {
    let question;

    await request.post({ url: 'http://localhost:3000/hotels/4/questions' }).form(body)
      .then(async () => {
        questions = await request.get({ url: 'http://localhost:3000/hotels/4/questions' });
        [question] = JSON.parse(questions).slice(-1);
      })
      .then(async () => {
        await request.delete({ url: `http://localhost:3000/hotels/4/questions/${question.QuestionID}` }).form({ userId: 23 })
          .then(async () => {
            const response = await fetch('http://localhost:3000/hotels/4/questions');
            questions = await response.json();
          });
      });
  });

  test('it should not send back a deleted question', () => {
    expect(questions).toBeDefined();
    expect(questions).toBeType('array');
    expect(questions.length).toBe(10);
    expect(questions.slice(-1)[0].Content).not.toBe(body.content);
  });
});

describe('POST a report for a question of a certain hotel', () => {
  test('it should receive a succesful response after trying to post a repot', async () => {
    await request.post('http://localhost:3000/hotels/3/questions/1/reports')
      .on('response', (response) => {
        expect(response.statusCode).toBe(201);
      });
  });
});

describe('POST an answer for a certain question', () => {
  let questions;
  let question;
  let answer;
  const body = {
    content: 'Is this route really working for answers?',
    userId: 23,
  };

  beforeEach(async () => {
    await request.post({ url: 'http://localhost:3000/hotels/4/questions/31/answers' }).form(body)
      .then(async () => {
        questions = await request.get({ url: 'http://localhost:3000/hotels/4/questions' });
        [question] = JSON.parse(questions);
        [answer] = question.Answers.slice(-1);
      });
  });

  afterEach(() => {
    request.delete({ url: `http://localhost:3000/hotels/4/questions/31/answers/${answer.id}` }).form({ userId: 23 });
  });

  test('it should POST an answer to a certain question', () => {
    expect(answer).toBeDefined();
    expect(answer.Content).toEqual(body.content);
    expect(answer.UserID).toEqual(body.userId);
  });
});

describe('DELETE an answer for a certain question', () => {
  let questions;
  let answers;
  const body = {
    content: 'Is this route really working for answers?',
    userId: 23,
  };

  beforeEach(async () => {
    let question;
    let answer;

    await request.post({ url: 'http://localhost:3000/hotels/4/questions/31/answers' }).form(body)
      .then(async () => {
        questions = await request.get({ url: 'http://localhost:3000/hotels/4/questions' });
        [question] = JSON.parse(questions);
        [answer] = question.Answers.slice(-1);
      })
      .then(async () => {
        await request.delete({ url: `http://localhost:3000/hotels/4/questions/31/answers/${answer.id}` }).form({ userId: 23 })
          .then(async () => {
            const response = await fetch('http://localhost:3000/hotels/4/questions');
            questions = await response.json();
            answers = questions[0].Answers;
          });
      });
  });

  test('it should not send back a deleted answer', () => {
    expect(answers).toBeDefined();
    expect(answers).toBeType('array');
    expect(answers.length).toBe(5);

    expect(answers.slice(-1)[0].Content).not.toBe(body.content);
  });
});

describe('UPDATE number of votes for an answer', () => {
  let previousVotes;
  let questions;

  beforeEach(async () => {
    const response = await fetch('http://localhost:3000/hotels/4/questions');
    questions = await response.json();
    previousVotes = questions[0].Answers[0].Votes;
  });

  test('it should upvote an answer', async () => {
    await request.patch({ url: 'http://localhost:3000/hotels/4/questions/31/answers/151/votes' }).form({ vote: '1' })
      .then(async () => {
        const response = await fetch('http://localhost:3000/hotels/4/questions');
        questions = await response.json();
        const currentVotes = questions[0].Answers[0].Votes;
        console.log('currentVotes', currentVotes);
        console.log('previousVotes', previousVotes);
        expect(currentVotes).toBe(previousVotes + 1);
        previousVotes = currentVotes;
      });
  });

  test('it should downvote an answer', async () => {
    await request.patch({ url: 'http://localhost:3000/hotels/4/questions/31/answers/151/votes' }).form({ vote: '-1' })
      .then(async () => {
        const response = await fetch('http://localhost:3000/hotels/4/questions');
        questions = await response.json();
        const currentVotes = questions[0].Answers[0].Votes;
        console.log('currentVotes', currentVotes);
        console.log('previousVotes', previousVotes);
        expect(currentVotes).toBe(previousVotes - 1);
        previousVotes = currentVotes;
      });
  });
});
