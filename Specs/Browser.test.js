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

describe('Up/Down-voting an answer', async () => {
  beforeEach(async () => {
    await page.goto(pageURL, { waitUntil: 'networkidle2' });
  });

  test('can upvote an answer', async () => {
    const btn = 'button.arrow';
    let previousVotes = await page.$eval('span', e => e.textContent);
    [previousVotes] = previousVotes.split('Votes');
    previousVotes = Number(previousVotes);
    await page.click(btn);
    let currentVotes = await page.$eval('span', e => e.textContent);
    [currentVotes] = currentVotes.split('Votes');
    currentVotes = Number(currentVotes);
    expect(currentVotes).toBe(previousVotes + 1);
  });

  test('can downvote an answer', async () => {
    const btn = 'button.arrow:nth-of-type(2)';
    let previousVotes = await page.$eval('span', e => e.textContent);
    [previousVotes] = previousVotes.split('Votes');
    previousVotes = Number(previousVotes);
    await page.click(btn);
    let currentVotes = await page.$eval('span', e => e.textContent);
    [currentVotes] = currentVotes.split('Votes');
    currentVotes = Number(currentVotes);
    expect(currentVotes).toBe(previousVotes - 1);
  });

  test('cannot upvote an answer twice (without page refresh)', async () => {
    const btn = 'button.arrow';
    let previousVotes = await page.$eval('span', e => e.textContent);
    [previousVotes] = previousVotes.split('Votes');
    previousVotes = Number(previousVotes);
    await page.click(btn);
    await page.click(btn);
    let currentVotes = await page.$eval('span', e => e.textContent);
    [currentVotes] = currentVotes.split('Votes');
    currentVotes = Number(currentVotes);
    expect(currentVotes).toBe(previousVotes + 1);
  });

  test('cannot downvote an answer twice (without page refresh)', async () => {
    const btn = 'button.arrow:nth-of-type(2)';
    let previousVotes = await page.$eval('span', e => e.textContent);
    [previousVotes] = previousVotes.split('Votes');
    previousVotes = Number(previousVotes);
    await page.click(btn);
    await page.click(btn);
    let currentVotes = await page.$eval('span', e => e.textContent);
    [currentVotes] = currentVotes.split('Votes');
    currentVotes = Number(currentVotes);
    expect(currentVotes).toBe(previousVotes - 1);
  });
});
