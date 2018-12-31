/* eslint import/no-extraneous-dependencies: 0 */ // --> OFF
/* eslint no-undef: 0 */ // --> OFF
const puppeteer = require('puppeteer');

const pageURL = 'http://localhost:3000';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

// describe('Up/Down-voting an answer', async () => {
//   beforeEach(async () => {
//     await page.goto(pageURL, { waitUntil: 'networkidle2' });
//   });

//   test('can upvote an answer', async () => {
//     const btn = 'button.arrow-up';
//     let previousVotes = await page.$eval('span', e => e.textContent);
//     [previousVotes] = previousVotes.split('Votes');
//     previousVotes = Number(previousVotes);
//     await page.click(btn);
//     let currentVotes = await page.$eval('span', e => e.textContent);
//     [currentVotes] = currentVotes.split('Votes');
//     currentVotes = Number(currentVotes);
//     expect(currentVotes).toBe(previousVotes + 1);
//   });

//   test('can downvote an answer', async () => {
//     const btn = 'button.arrow-down';
//     let previousVotes = await page.$eval('span', e => e.textContent);
//     [previousVotes] = previousVotes.split('Votes');
//     previousVotes = Number(previousVotes);
//     await page.click(btn);
//     let currentVotes = await page.$eval('span', e => e.textContent);
//     [currentVotes] = currentVotes.split('Votes');
//     currentVotes = Number(currentVotes);
//     expect(currentVotes).toBe(previousVotes - 1);
//   });

//   test('cannot upvote an answer twice (without page refresh)', async () => {
//     const btn = 'button.arrow-up';
//     let previousVotes = await page.$eval('span', e => e.textContent);
//     [previousVotes] = previousVotes.split('Votes');
//     previousVotes = Number(previousVotes);
//     await page.click(btn);
//     await page.click(btn);
//     let currentVotes = await page.$eval('span', e => e.textContent);
//     [currentVotes] = currentVotes.split('Votes');
//     currentVotes = Number(currentVotes);
//     expect(currentVotes).toBe(previousVotes + 1);
//   });

//   test('cannot downvote an answer twice (without page refresh)', async () => {
//     const btn = 'button.arrow-down';
//     let previousVotes = await page.$eval('span', e => e.textContent);
//     [previousVotes] = previousVotes.split('Votes');
//     previousVotes = Number(previousVotes);
//     await page.click(btn);
//     await page.click(btn);
//     let currentVotes = await page.$eval('span', e => e.textContent);
//     [currentVotes] = currentVotes.split('Votes');
//     currentVotes = Number(currentVotes);
//     expect(currentVotes).toBe(previousVotes - 1);
//   });
// });

// describe('Asking and deleting a question', async () => {
//   jest.setTimeout(30000);
//   beforeEach(async () => {
//     await page.goto(pageURL, { waitUntil: 'networkidle2' });
//   });

//   test('can ask a question', async () => {
//     const askBtn = '.ask';
//     await page.click(askBtn);
//     const textarea = '.ask-input';
//     const submitBtn = '.submit-question';
//     await page.type(textarea, 'Is this a test question?');
//     await page.click(submitBtn);
//     const questionContent = await page.$eval('.question-content', e => e.textContent);
//     expect(questionContent).toBe('Is this a test question?');
//   });

//   test('can delete a question', async () => {
//     const deleteBtn = '.delete-question';
//     await page.click(deleteBtn);
//     const questionContent = await page.$eval('.question-content', e => e.textContent);
//     expect(questionContent).not.toBe('Is this a test question?');
//   });
// });

describe('Writing and deleting an answer', async () => {
  jest.setTimeout(30000);
  beforeEach(async () => {
    await page.goto(pageURL, { waitUntil: 'networkidle2' });
  });

  test('can write an answer', async () => {
    const answerBtn = 'button.answer-btn';
    await page.click(answerBtn);
    const textarea = '.answer-input';
    const submitBtn = '.submit-answer';
    await page.type(textarea, 'This is a test answer');
    await page.click(submitBtn);
    const answerContent = await page.$eval('.answer-content', e => e.textContent);
    expect(answerContent).toBe('This is a test answer');
  });

  test('can delete an answer', async () => {
    const showMoreAnswersBtn = '.showMoreAnswersBtn';
    const deleteBtn = '.delete-answer';
    await page.click(showMoreAnswersBtn);
    await page.click(deleteBtn);
    const answerContent = await page.$eval('.answer-content:last-of-type', e => e.textContent);
    expect(answerContent).not.toBe('This is a test answer');
  });
});

describe('Sending reports to a questions and answers', async () => {
  jest.setTimeout(30000);

  test('can send report to questions', async () => {
    const flagIcon = '.fa-flag';
    const reportInput = '.report-input';
    const submitBtn = '.submit-report';
    await page.click(flagIcon);
    await page.type(reportInput, 'This is a test report This is a test report This is a test report');
    await page.click(submitBtn);
    const reportResponse = await page.$eval('.report-response', e => e.textContent);
    expect(reportResponse).toBe('Thank you. We appreciate your input.');
  });
});

// describe('Moving to another page', async () => {

// });
