/* eslint no-undef: 0 */ // --> OFF
import { shallow, mount } from 'enzyme';
import React from 'react'; // eslint-disable-line no-unused-vars
import App from '../../client/src/Components/App.jsx'; // eslint-disable-line no-unused-vars
import Header from '../../client/src/Components/Header.jsx'; // eslint-disable-line no-unused-vars
import Question from '../../client/src/Components/Question.jsx'; // eslint-disable-line no-unused-vars
import QuestionList from '../../client/src/Components/QuestionList.jsx'; // eslint-disable-line no-unused-vars
import QuestionForm from '../../client/src/Components/QuestionForm.jsx'; // eslint-disable-line no-unused-vars
import AnswerForm from '../../client/src/Components/AnswerForm.jsx'; // eslint-disable-line no-unused-vars
import Answer from '../../client/src/Components/Answer.jsx'; // eslint-disable-line no-unused-vars
import AnswerList from '../../client/src/Components/AnswerList.jsx'; // eslint-disable-line no-unused-vars

const { toBeType } = require('jest-tobetype'); // eslint-disable-line no-unused-vars

// import test data
const { currentUser, questionData } = require('./TestData');

describe('App Component', () => {
  const wrapper = mount(<App currentHotelID={4} currentUser={currentUser} />);

  it('should start with an empty array of questions', () => {
    const { questions } = wrapper.state();
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBe(0);
  });

  it('should have an outer div and one Header and one QuestionList inner components', () => {
    const div = wrapper.find('div');
    const header = div.find('Header');
    const questionList = div.find('QuestionList');
    expect(div).toBeDefined();
    expect(header).toBeDefined();
    expect(questionList).toBeDefined();
  });

  it('should increase the number of votes of an answer when the proper button is clicked', () => {
    const upVoteBtn = wrapper.find('QuestionList').children();
    // const downVoteBtn = wrapper.find('button.arrow').at(1);
    console.log('upVoteBtn', upVoteBtn.props());
    // let votes = wrapper.find('span').at(0).text();
    // console.log(votes);
    // upVoteBtn.simulate('click');
    // votes = wrapper.find('span').at(0).text();
    // console.log(votes);
    // console.log('upVoteBtn', upVoteBtn.props());
  });
});

describe('Header Component', () => {
  const wrapper = mount(<Header questions={questionData} currentUser={currentUser}
    submitQuestion={() => {}} />);
  const outerDiv = wrapper.find('div');

  it('should show the number of questions', () => {
    const link = outerDiv.find('a');
    expect(link.text()).toBe('See all 1 questions');
  });

  it('should have a button for the question form', () => {
    const button = wrapper.find('button');
    expect(button).toBeDefined();
    expect(button.text()).toBe('Ask a question');
  });

  it('should have a title', () => {
    const title = wrapper.find('div').get(2);
    expect(title).toBeDefined();
    expect(title.props.children).toBe('Questions & Answers');
  });

  it('should start not showing the question form', () => {
    expect(wrapper.state().showQuestionForm).toBeDefined();
    expect(wrapper.state().showQuestionForm).toBeFalsy();
    expect(outerDiv).toBeDefined();
    const questionForm = outerDiv.find('QuestionForm');
    expect(questionForm).toBeDefined();
    expect(questionForm.exists()).toBe(false);
  });

  it('should show the question form when the `question` button is clicked', () => {
    expect(wrapper.state().showQuestionForm).toBeFalsy();
    const questionBtn = wrapper.find('button');
    expect(questionBtn.text()).toBe('Ask a question');
    questionBtn.simulate('click');
    expect(wrapper.state().showQuestionForm).toBeTruthy();
    const questionForm = wrapper.find('QuestionForm');
    expect(questionForm.exists()).toBe(true);
  });

  it('should hide the question form when the `cancel` button is clicked', () => {
    let questionForm = wrapper.find('QuestionForm');
    const cancelBtn = questionForm.find('button').at(1);
    expect(wrapper.state().showQuestionForm).toBeTruthy();
    cancelBtn.simulate('click');
    expect(wrapper.state().showQuestionForm).toBeFalsy();
    questionForm = wrapper.find('QuestionForm');
    expect(questionForm.exists()).toBe(false);
  });

  it('should close the form when the `submit` button is clicked', () => {
    expect(wrapper.state().showQuestionForm).toBeFalsy();
    const questionBtn = wrapper.find('button');
    questionBtn.simulate('click');
    expect(wrapper.state().showQuestionForm).toBeTruthy();
    let questionForm = wrapper.find('QuestionForm');
    const submitBtn = questionForm.find('button').at(0);
    submitBtn.simulate('click');
    expect(wrapper.state().showQuestionForm).toBeFalsy();
    questionForm = wrapper.find('QuestionForm');
    expect(questionForm.exists()).toBe(false);
  });
});

describe('QuestionList Component', () => {
  const wrapper = shallow(<QuestionList questions={questionData} />);
  const list = wrapper.find('ul');

  it('should contain an unordered list', () => {
    expect(list).toBeDefined();
    expect(list.props().children.length).toBe(1);
  });

  it('should contain questions as its list items', () => {
    const questionItem = list.find('Question').get(0);
    expect(questionItem).toBeDefined();
    expect(questionItem.props.question).toBeDefined();
    expect(questionItem.props.question.QuestionID).toEqual(21);
  });
});

describe('QuestionForm Component', () => {
  const wrapper = shallow(<QuestionForm currentUser={currentUser} />);

  it('should start with an empty question content and a placeholder message', () => {
    expect(wrapper.state().questionContent).toBe('');
    const textarea = wrapper.find('textarea');
    expect(textarea.props().placeholder).toBe('Hi, Ewald23. What would you like to know about this accomodation?');
    expect(textarea.props().value).toBe('');
  });

  it('should have a cancel and a submit button', () => {
    const submitButton = wrapper.find('button').get(0);
    const cancelButton = wrapper.find('button').get(1);
    expect(submitButton.props.children).toBe('Submit');
    expect(cancelButton.props.children).toBe('Cancel');
  });

  it('should contain a title and a warning note', () => {
    const title = wrapper.find('p').get(0);
    const warning = wrapper.find('p').get(1);
    expect(title.props.children).toBe('Get quick answers from Omni San Francisco Hotel staff and past guests.');
    expect(warning.props.children).toBe('Note: your question will be posted publicly on the Questions & Answers page.');
  });
});

describe('Question Component', () => {
  const wrapper = shallow(<Question question={questionData[0]} currentUser={currentUser} />);

  it('should contain a thumbnail image of the user', () => {
    const image = wrapper.find('img');
    expect(image.props().src)
      .toBe('https://s3.amazonaws.com/uifaces/faces/twitter/brandonflatsoda/128.jpg');
  });

  it('should contain a paragraph with user name', () => {
    const paragraph = wrapper.find('p').get(0);
    expect(paragraph.props.children).toBe('Genesis.Kunde93');
  });

  it('should contain the question content and date', () => {
    const content = wrapper.find('p').get(1);
    const date = wrapper.find('p').get(2);
    expect(content.props.children).toBe('Animi nemo rerum. Quia maiores ea saepe. Temporibus dicta dolor ipsa omnis.?');
    expect(date.props.children[0]).toBe('July 1, 2018');
  });

  it('should contain an answer list', () => {
    const answerList = wrapper.find('AnswerList');
    expect(answerList).toBeDefined();
    expect(answerList.exists()).toBe(true);
  });
});

describe('AnswerList Component', () => {
  const wrapper = mount(<AnswerList answers={questionData[0].Answers}
    users={questionData[0].AnswersUsers}
    submitAnswer={() => {}} questionID={questionData[0].QuestionID}
    voteAnswer={() => {}} currentUser={currentUser}
    deleteAnswer={() => {}} />);

  it('should not show all answers neither the answer form initially', () => {
    expect(wrapper.state().showAnswerForm || wrapper.state().showAllAnswers).toBe(false);
    const answerForm = wrapper.find('AnswerForm');
    expect(answerForm.exists()).toBe(false);
  });

  it('it should contain buttons to answer and to show all answers', () => {
    const answerButton = wrapper.find('button').get(0);
    const showAnswersButton = wrapper.find('button').get(1);
    expect(answerButton.props.children).toBe('Answer');
    expect(showAnswersButton.props.children).toBe('Show all 5 answers');
  });

  it('should contain a list of answers', () => {
    const list = wrapper.find('ul');
    expect(list.props().children.length).toBe(1);
  });

  it('should show the answer form when the `answer` button is clicked', () => {
    expect(wrapper.state().showAnswerForm).toBeFalsy();
    const answerBtn = wrapper.find('button').at(0);
    expect(answerBtn.text()).toBe('Answer');
    answerBtn.simulate('click');
    expect(wrapper.state().showAnswerForm).toBeTruthy();
    const answerForm = wrapper.find('AnswerForm');
    expect(answerForm.exists()).toBe(true);
  });

  it('should hide the answer form when the `cancel` button is clicked', () => {
    let answerForm = wrapper.find('AnswerForm');
    const cancelBtn = answerForm.find('button').at(1);
    expect(wrapper.state().showAnswerForm).toBeTruthy();
    cancelBtn.simulate('click');
    expect(wrapper.state().showAnswerForm).toBeFalsy();
    answerForm = wrapper.find('AnswerForm');
    expect(answerForm.exists()).toBe(false);
  });

  it('should close the form when the `submit` button is clicked', () => {
    expect(wrapper.state().showAnswerForm).toBeFalsy();
    const answerBtn = wrapper.find('button').at(0);
    answerBtn.simulate('click');
    expect(wrapper.state().showAnswerForm).toBeTruthy();
    let answerForm = wrapper.find('AnswerForm');
    const submitBtn = answerForm.find('button').at(0);
    submitBtn.simulate('click');
    expect(wrapper.state().showAnswerForm).toBeFalsy();
    answerForm = wrapper.find('AnswerForm');
    expect(answerForm.exists()).toBe(false);
  });

  it('should show more answers when the correspondent button is clicked', () => {
    expect(wrapper.state().showAllAnswers).toBeFalsy();
    const showMoreBtn = wrapper.find('button').at(1);
    let answers = wrapper.find('Answer');
    expect(answers.length).toBe(1);
    expect(showMoreBtn.text()).toBe('Show all 5 answers');
    showMoreBtn.simulate('click');
    expect(wrapper.state().showAllAnswers).toBeTruthy();
    answers = wrapper.find('Answer');
    expect(answers.length).toBe(5);
    expect(showMoreBtn.text()).toBe('Hide all answers');
  });
});

describe('Answer Component', () => {
  const [answer] = questionData[0].Answers;
  const [user] = questionData[0].AnswersUsers;

  const wrapper = shallow(<Answer answer={answer} user={user} currentUser={currentUser} />);

  it('should have a title', () => {
    const title = wrapper.find('p').get(0);
    const titleContent = title.props.children.slice(0, 3).join('');
    expect(titleContent).toBe('Response from Ruby.Buckridge | Reviewed this property | ');
  });

  it('should have buttons to up/down-vote an answer', () => {
    const upVoteButton = wrapper.find('button').get(0);
    const downVoteButton = wrapper.find('button').get(1);
    expect(upVoteButton.props.className).toBe('arrow');
    expect(downVoteButton.props.className).toBe('arrow');
    expect(upVoteButton.props.children.props.className).toBe('fa fa-chevron-up');
    expect(downVoteButton.props.children.props.className).toBe('fa fa-chevron-down');
  });

  it('should display the number of votes', () => {
    const voteCounter = wrapper.find('span').get(0);
    const votesWord = wrapper.find('span').get(1);
    expect(voteCounter.props.children[0]).toBe(9);
    expect(votesWord.props.children).toBe('Votes');
  });
});

describe('AnswerForm Component', () => {
  const wrapper = shallow(<AnswerForm currentUser={currentUser} />);

  it('should contain a title', () => {
    const title = wrapper.find('p');
    expect(title.props().children).toBe('WHAT IS YOUR ANSWER?');
  });

  it('should start with an empty answer content and a placeholder message', () => {
    expect(wrapper.state().answerContent).toBe('');
    const textarea = wrapper.find('textarea');
    expect(textarea.props().placeholder).toBe('Hi, Ewald23. Answer this traveler\'s question here.');
    expect(textarea.props().value).toBe('');
  });

  it('should have a cancel and a submit button', () => {
    const submitButton = wrapper.find('button').get(0);
    const cancelButton = wrapper.find('button').get(1);
    expect(submitButton.props.children).toBe('Submit');
    expect(cancelButton.props.children).toBe('Cancel');
  });
});
