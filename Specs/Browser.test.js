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
  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
    await browser.close();
  });
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

describe('Sending reports to questions', async () => {
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

describe('Sending reports to answers', async () => {
  test('can send report to answers', async () => {
    const flagIcon = '.fa-flag:last-of-type';
    const reportInput = '.report-input';
    const submitBtn = '.submit-report';
    await page.click(flagIcon);
    await page.type(reportInput, 'This is a report test This is a report test This is a report test');
    await page.click(submitBtn);
    const reportResponse = await page.$eval('.report-response:last-of-type', e => e.textContent);
    expect(reportResponse).toBe('Thank you. We appreciate your input.');
  });
});

describe('Using the nav bar to move to other pages', async () => {
  let firstQuestion;
  let secondQuestion;

  test('can move forward to another pages when clicking the next button', async () => {
    firstQuestion = await page.$eval('.question-content', e => e.textContent);
    const nextBtn = '.next';
    await page.click(nextBtn);
    secondQuestion = await page.$eval('.question-content', e => e.textContent);
    const prevBtn = '.previous';
    await page.click(prevBtn);
    await page.click(nextBtn);
    const questionContent = await page.$eval('.question-content', e => e.textContent);
    expect(questionContent).toBe(secondQuestion);
  });

  test('can move backwards to another pages when clicking the previous button', async () => {
    const prevBtn = '.previous';
    await page.click(prevBtn);
    const questionContent = await page.$eval('.question-content', e => e.textContent);
    expect(questionContent).toBe(firstQuestion);
  });

  test('can click in a displayed page number and move to that page', async () => {
    const nextBtn = '.next';
    await page.click(nextBtn);
    await page.click(nextBtn);
    await page.click(nextBtn);
    await page.click(nextBtn);
    const thirdQuestion = await page.$eval('.question-content', e => e.textContent);
    const prevBtn = '.previous';
    await page.click(prevBtn);
    await page.click(prevBtn);
    await page.click(prevBtn);
    await page.click(prevBtn);
    const page5Btn = '.page-num:last-of-type';
    await page.click(page5Btn);
    const questionContent = await page.$eval('.question-content', e => e.textContent);
    expect(questionContent).toBe(thirdQuestion);
  });
});

describe('Sending a message to another user', () => {
  jest.setTimeout(30000);

  it('can hover over the user picture and see the stats', async () => {
    const userProfilePic = '.userMiniProfile';
    await page.click(userProfilePic);
    const sendMessageBtn = '.send-message';
    await page.click(sendMessageBtn);
  });

  it('can type a message and subject and send them', async () => {
    const messageInput = '.message-input';
    const subjectInput = '.subject-input';
    const submitBtn = '.submit-message';
    await page.type(subjectInput, 'This is a subject test');
    await page.type(messageInput, 'This is a message test');
    await page.click(submitBtn);
  });
});
