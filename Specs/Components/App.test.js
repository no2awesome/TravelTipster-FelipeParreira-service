/* eslint no-undef: 0 */ // --> OFF
import { shallow, mount } from 'enzyme';
import React from 'react'; // eslint-disable-line no-unused-vars
import App from '../../client/src/Components/App/App.jsx'; // eslint-disable-line no-unused-vars
import Header from '../../client/src/Components/Header/Header.jsx'; // eslint-disable-line no-unused-vars
import Question from '../../client/src/Components/Question/Question.jsx'; // eslint-disable-line no-unused-vars
import QuestionList from '../../client/src/Components/QuestionList/QuestionList.jsx'; // eslint-disable-line no-unused-vars
import QuestionForm from '../../client/src/Components/QuestionForm/QuestionForm.jsx'; // eslint-disable-line no-unused-vars
import AnswerForm from '../../client/src/Components/AnswerForm/AnswerForm.jsx'; // eslint-disable-line no-unused-vars
import Answer from '../../client/src/Components/Answer/Answer.jsx'; // eslint-disable-line no-unused-vars
import AnswerList from '../../client/src/Components/AnswerList/AnswerList.jsx'; // eslint-disable-line no-unused-vars
import VoteToolTip from '../../client/src/Components/VoteToolTip/VoteToolTip.jsx'; // eslint-disable-line no-unused-vars
import UserStats from '../../client/src/Components/UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import QAToolTip from '../../client/src/Components/QAToolTip/QAToolTip.jsx'; // eslint-disable-line no-unused-vars
import ReportForm from '../../client/src/Components/ReportForm/ReportForm.jsx'; // eslint-disable-line no-unused-vars
import NavBar from '../../client/src/Components/NavBar/NavBar.jsx'; // eslint-disable-line no-unused-vars

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
  const wrapper = shallow(<QuestionList questions={questionData} currentPage={0} />);
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
    const date = wrapper.find('.date');
    expect(content.props.children).toBe('Animi nemo rerum. Quia maiores ea saepe. Temporibus dicta dolor ipsa omnis.?');
    expect(date.props().children[0]).toBe('July 1, 2018');
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
    const title = wrapper.find('.title').get(0);
    const titleContent = title.props.children.slice(0, 3).join('');
    expect(titleContent).toBe('Response from Ruby.Buckridge |');
  });

  it('should have buttons to up/down-vote an answer', () => {
    const upVoteButton = wrapper.find('button').get(0);
    const downVoteButton = wrapper.find('button').get(1);
    expect(upVoteButton.props.className.split(' ').slice(-1)[0]).toBe('arrow-up');
    expect(downVoteButton.props.className.split(' ').slice(-1)[0]).toBe('arrow-down');
    expect(upVoteButton.props.children.props.className.split(' ').slice(-2).join(' ')).toBe('fa fa-chevron-up');
    expect(downVoteButton.props.children.props.className.split(' ').slice(-2).join(' ')).toBe('fa fa-chevron-down');
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

describe('Vote Tool Tip Component', () => {
  const messageContent = 'Helpful answer';
  const wrapper = shallow(<VoteToolTip message={messageContent} />);

  it('should have a message passed to it', () => {
    const message = wrapper.find('.message');
    expect(message.props().children).toBe(messageContent);
  });

  it('should have three internal divs', () => {
    expect(wrapper.find('div div').length).toBe(3);
  });

  it('should have an arrow right div', () => {
    expect(wrapper.find('.arrow-right').length).toBe(1);
  });

  it('should have a dummy div', () => {
    expect(wrapper.find('.dummy').length).toBe(1);
  });
});

describe('User Stats Component', () => {
  const user = questionData[0].User;
  const wrapper = shallow(<UserStats user={user} />);

  it('should have a send message button', () => {
    const btn = wrapper.find('button');
    expect(btn).toBeDefined();
    expect(btn.length).toBe(1);
    expect(btn.props().children.slice(-1)[0].trim()).toBe('Send Message');
  });

  it('should show a brief history of the user', () => {
    const userHist = wrapper.find('.userHist');
    expect(userHist).toBeDefined();
    expect(userHist.length).toBe(1);
    expect(userHist.props().children.join('')).toBe('Trip Advisor member since 2018');
  });

  it('should have an icon to close the floating window', () => {
    const closeIcon = wrapper.find('.fa-times');
    expect(closeIcon).toBeDefined();
    expect(closeIcon.length).toBe(1);
  });

  it('should contain a summary of the user stats', () => {
    const summary = wrapper.find('.summary');
    const items = summary.find('p');
    expect(items.length).toBe(4);
    const contributions = items.at(0);
    const helpfulVotes = items.at(1);
    const citiesVisited = items.at(2);
    const photos = items.at(3);
    expect(contributions.props().children.slice(-2).join('').trim()).toBe('3 Contributions');
    expect(helpfulVotes.props().children.slice(-2).join('').trim()).toBe('12 Helpful Votes');
    expect(citiesVisited.props().children.slice(-2).join('').trim()).toBe('4 Cities Visited');
    expect(photos.props().children.slice(-2).join('').trim()).toBe('10 Photos');
  });

  it('should contain a review distribution', () => {
    const reviewDistro = wrapper.find('.review-distribution');
    expect(reviewDistro).toBeDefined();
    expect(reviewDistro.length).toBe(1);
    const reviewData = reviewDistro.find('span');
    expect(reviewData.at(0).props().children).toBe('Excellent');
    expect(reviewData.at(3).props().children).toBe(10);
    expect(reviewData.at(4).props().children).toBe('Very good');
    expect(reviewData.at(7).props().children).toBe(1);
    expect(reviewData.at(8).props().children).toBe('Average');
    expect(reviewData.at(11).props().children).toBe(1);
    expect(reviewData.at(12).props().children).toBe('Poor');
    expect(reviewData.at(15).props().children).toBe(7);
    expect(reviewData.at(16).props().children).toBe('Terrible');
    expect(reviewData.at(19).props().children).toBe(1);
  });
});

describe('QA Tool Tip', () => {
  const messageContent = 'Problem with this answer?';
  const wrapper = shallow(<QAToolTip message={messageContent} />);

  it('should have a message passed to it', () => {
    const message = wrapper.find('.message');
    expect(message.props().children).toBe(messageContent);
  });

  it('should have three internal divs', () => {
    expect(wrapper.find('div div').length).toBe(3);
  });

  it('should have an arrow left div', () => {
    expect(wrapper.find('.arrow-left').length).toBe(1);
  });

  it('should have a dummy div', () => {
    expect(wrapper.find('.dummy').length).toBe(1);
  });
});

describe('Report Form Component', () => {
  const initialState = {
    reportContent: '',
    isInvalidInput: false,
  };
  const wrapper = shallow(<ReportForm initialState={initialState} closeForm={() => {}} />);

  it('should have a close window icon', () => {
    const icon = wrapper.find('.fa-times');
    expect(icon).toBeDefined();
    expect(icon.length).toBe(1);
  });

  it('should have a description/warning to the user', () => {
    const description = wrapper.find('h4');
    expect(description).toBeDefined();
    expect(description.length).toBe(1);
    const descriptContent = description.props().children;
    expect(`${descriptContent[0]} ${descriptContent[2]}`.trim()).toBe('Why are you reporting this? Add specific details about why you feel this question or answer is inappropriate.');
  });

  it('should contain a text area and a warning next to it', () => {
    const textarea = wrapper.find('textarea');
    const warning = wrapper.find('textarea + div');
    expect(textarea).toBeDefined();
    expect(textarea.length).toBe(1);
    expect(warning).toBeDefined();
    expect(warning.length).toBe(1);
    expect(warning.props().children).toBe('50 characters minimum, 500 maximum');
  });

  it('should contain a submit button', () => {
    const btn = wrapper.find('button');
    expect(btn).toBeDefined();
    expect(btn.length).toBe(1);
    expect(btn.props().children).toBe('Submit');
  });
});

describe('NavBar Component', () => {
  const wrapper = shallow(<NavBar currentPage={0} numOfQuestions={10}
    handlePageClick={() => {}} />);

  it('should have a previous and next buttons', () => {
    const prevBtn = wrapper.find('button').at(0);
    const nextBtn = wrapper.find('button').at(1);
    expect(prevBtn).toBeDefined();
    expect(prevBtn.length).toBe(1);
    expect(prevBtn.props().children).toBe('Previous');
    expect(nextBtn).toBeDefined();
    expect(nextBtn.length).toBe(1);
    expect(nextBtn.props().children).toBe('Next');
  });

  it('should contain a pagination list', () => {
    const paginationList = wrapper.find('.pagination-list');
    expect(paginationList).toBeDefined();
    expect(paginationList.length).toBe(1);
  });
});
