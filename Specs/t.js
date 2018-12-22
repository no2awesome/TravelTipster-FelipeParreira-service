// /* eslint import/no-extraneous-dependencies: 0 */ // --> OFF
// /* eslint no-undef: 0 */ // --> OFF
// const puppeteer = require('puppeteer');

// const pageURL = 'http://localhost:3000';

// let page;
// let browser;
// const width = 1280;
// const height = 720;

// beforeAll(async () => {
//   browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 80,
//     args: [`--window-size=${width},${height}`],
//   });
//   page = await browser.newPage();
//   await page.setViewport({ width, height });
// });

// afterAll(() => {
//   browser.close();
// });

// describe('search function', async () => {
//   beforeEach(async () => {
//     await page.goto(pageURL, { waitUntil: 'networkidle2' });
//   });

//   // this is a simple end-to-end test
//   test('Initial title is correct', async () => {
//   //   const h1 = 'h1';
//   //   const title = await page.$eval(h1, e => e.textContent);
//   //   expect(title).toEqual('Q&A section');
//   });

//   test('can search for cats', async () => {
//   //   const selector = 'input.form-control[type=text]';
//   //   await page.click(selector);
//   //   await page.type(selector, 'cats');
//   });
// });
