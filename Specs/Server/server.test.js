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

describe('POST question for a certain hotel', () => {
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
