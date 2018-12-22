/* eslint no-undef: 0 */ // --> OFF
const request = require('request');
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

  test('it should send an array of all questions', async () => {
    expect(questions).toBeDefined();
    expect(questions).toBeType('array');
  });

  test('it should send an array whose elements are questions', () => {
    expect(questions[0]).toBeDefined();
    expect(questions[0]).toBeType('object');
  });
});
