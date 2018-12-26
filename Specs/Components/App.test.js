/* eslint no-undef: 0 */ // --> OFF
import { shallow } from 'enzyme';
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

const currentUser = {
  UserID: 1,
  Username: 'Ewald23',
  ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/bowbrick/128.jpg',
};
const app = shallow(<App currentHotelID={4} currentUser={currentUser} />);
const questionData = [
  {
    QuestionID: 21,
    Content: 'Animi nemo rerum. Quia maiores ea saepe. Temporibus dicta dolor ipsa omnis.?',
    PostedDate: '2018-07-01',
    UserID: 8,
    User: {
      Username: 'Genesis.Kunde93',
      ProfileURL: 'https://localhost:3000/users/8/profile',
      ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/brandonflatsoda/128.jpg',
      SignUpDate: '2018-11-08',
      CitiesVisited: 4,
      HelpfulVotes: 12,
      HomeCity: 'Lake Imaside, Alaska',
      Category: 'Contributor',
      Ranking: 2,
      'ReviewDistribution.Excellent': 10,
      'ReviewDistribution.VeryGood': 1,
      'ReviewDistribution.Average': 1,
      'ReviewDistribution.Poor': 7,
      'ReviewDistribution.Terrible': 1,
    },
    Answers: [
      {
        id: 101,
        Content: 'Repellendus et non harum molestias aut sit. Omnis corrupti temporibus esse. Non sunt nisi velit enim mollitia. Quibusdam voluptate aut rem perferendis nostrum possimus quia omnis.',
        UserID: 40,
        QuestionID: 21,
        Votes: 9,
      },
      {
        id: 102,
        Content: 'Numquam tempora et repudiandae. Veritatis quasi eligendi facilis eum repellat commodi ut officiis. Quia velit veritatis illo necessitatibus. Aliquid pariatur quibusdam eaque.',
        UserID: 78,
        QuestionID: 21,
        Votes: 1,
      },
      {
        id: 103,
        Content: 'Fugit quia a. Laboriosam nesciunt minus expedita quia quasi optio id. Rerum ut dolorem. Quia dolorem blanditiis. Culpa pariatur qui quia consequatur quaerat totam assumenda ut et. Non cupiditate dolor libero ipsum suscipit itaque accusantium.',
        UserID: 83,
        QuestionID: 21,
        Votes: 0,
      },
      {
        id: 104,
        Content: 'Consequuntur facere consequuntur ullam. Laudantium maiores asperiores aperiam. Exercitationem consequatur qui perspiciatis magni.',
        UserID: 74,
        QuestionID: 21,
        Votes: 17,
      },
      {
        id: 105,
        Content: 'Nisi ut voluptatem quos quidem et mollitia. Asperiores ratione eaque perspiciatis suscipit quia tempore minima. Error exercitationem temporibus cum enim nulla et non illo.',
        UserID: 49,
        QuestionID: 21,
        Votes: 17,
      },
    ],
    AnswersUsers: [
      {
        id: 40,
        Username: 'Ruby.Buckridge',
        SignUpDate: '2018-10-02',
        CitiesVisited: 11,
        ProfileURL: 'https://localhost:3000/users/40/profile',
        HelpfulVotes: 1,
        ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/cadikkara/128.jpg',
        Contributions: 3,
        Photos: 1,
        Ranking: 1,
        HomeCity: 'Port Marinaton, Wisconsin',
        Category: 'Contributor',
        'ReviewDistribution.Excellent': 8,
        'ReviewDistribution.VeryGood': 3,
        'ReviewDistribution.Average': 4,
        'ReviewDistribution.Poor': 3,
        'ReviewDistribution.Terrible': 0,
      },
      {
        id: 78,
        Username: 'Stephanie_Ledner12',
        SignUpDate: '2018-11-08',
        CitiesVisited: 3,
        ProfileURL: 'https://localhost:3000/users/78/profile',
        HelpfulVotes: 9,
        ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/haydn_woods/128.jpg',
        Contributions: 10,
        Photos: 15,
        Ranking: 2,
        HomeCity: 'East Tavaresberg, Wyoming',
        Category: 'Contributor',
        'ReviewDistribution.Excellent': 3,
        'ReviewDistribution.VeryGood': 14,
        'ReviewDistribution.Average': 2,
        'ReviewDistribution.Poor': 8,
        'ReviewDistribution.Terrible': 11,
      },
      {
        id: 83,
        Username: 'Laila.Simonis',
        SignUpDate: '2018-05-02',
        CitiesVisited: 1,
        ProfileURL: 'https://localhost:3000/users/83/profile',
        HelpfulVotes: 9,
        ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/kucingbelang4/128.jpg',
        Contributions: 10,
        Photos: 3,
        Ranking: 4,
        HomeCity: 'Antoniaville, Connecticut',
        Category: 'Contributor',
        'ReviewDistribution.Excellent': 10,
        'ReviewDistribution.VeryGood': 6,
        'ReviewDistribution.Average': 1,
        'ReviewDistribution.Poor': 8,
        'ReviewDistribution.Terrible': 4,
      },
      {
        id: 74,
        Username: 'Daphnee.Runolfsson72',
        SignUpDate: '2018-05-12',
        CitiesVisited: 10,
        ProfileURL: 'https://localhost:3000/users/74/profile',
        HelpfulVotes: 4,
        ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/VMilescu/128.jpg',
        Contributions: 10,
        Photos: 12,
        Ranking: 2,
        HomeCity: 'East Keenanland, Alaska',
        Category: 'Contributor',
        'ReviewDistribution.Excellent': 12,
        'ReviewDistribution.VeryGood': 6,
        'ReviewDistribution.Average': 10,
        'ReviewDistribution.Poor': 15,
        'ReviewDistribution.Terrible': 12,
      },
      {
        id: 49,
        Username: 'Leopoldo_Graham',
        SignUpDate: '2017-12-21',
        CitiesVisited: 8,
        ProfileURL: 'https://localhost:3000/users/49/profile',
        HelpfulVotes: 18,
        ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/evanshajed/128.jpg',
        Contributions: 9,
        Photos: 4,
        Ranking: 3,
        HomeCity: 'New Tremaynemouth, Arkansas',
        Category: 'Contributor',
        'ReviewDistribution.Excellent': 11,
        'ReviewDistribution.VeryGood': 10,
        'ReviewDistribution.Average': 6,
        'ReviewDistribution.Poor': 0,
        'ReviewDistribution.Terrible': 0,
      },
    ],
  }];

describe('App Component', () => {
  const wrapper = shallow(<App />);

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

// Todo: test for each of the functions inside app.jsx

describe('Header Component', () => {
  const wrapper = shallow(<Header questions={[]} />);
  const outerDiv = wrapper.find('div');

  it('should show the number of questions', () => {
    const link = outerDiv.find('a');
    expect(link.text()).toBe('See all 0 questions');
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
    expect(questionForm).toEqual({});
  });
});

describe('QuestionList Component', () => {
  const wrapper = shallow(<QuestionList questions={questionData} />);
  const list = wrapper.find('ul');

  it('should contain an unordered list', () => {
    expect(list).toBeDefined();
    expect(list.props().children.length).toBe(1);
  });

  // todo solve this test later
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
    expect(answerList.props()).not.toEqual({});
  });
});

describe('AnswerList Component', () => {
  const wrapper = shallow(<AnswerList answers={questionData[0].Answers}
    users={questionData[0].AnswersUsers}
    submitAnswer={() => {}} questionID={questionData[0].QuestionID}
    voteAnswer={() => {}} currentUser={currentUser}
    deleteAnswer={() => {}} />);

  it('should not show all answers neither the answer form initially', () => {
    expect(wrapper.state().showAnswerForm || wrapper.state().showAllAnswers).toBe(false);
    const answerForm = wrapper.find('AnswerForm');
    expect(answerForm).toEqual({});
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
});

describe('Answer Component', () => {
  const answer = {
    id: 101,
    Content: 'Repellendus et non harum molestias aut sit. Omnis corrupti temporibus esse. Non sunt nisi velit enim mollitia. Quibusdam voluptate aut rem perferendis nostrum possimus quia omnis.',
    UserID: 40,
    QuestionID: 21,
    Votes: 9,
  };
  const user = {
    id: 40,
    Username: 'Ruby.Buckridge',
    SignUpDate: '2018-10-02',
    CitiesVisited: 11,
    ProfileURL: 'https://localhost:3000/users/40/profile',
    HelpfulVotes: 1,
    ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/cadikkara/128.jpg',
    Contributions: 3,
    Photos: 1,
    Ranking: 1,
    HomeCity: 'Port Marinaton, Wisconsin',
    Category: 'Contributor',
    'ReviewDistribution.Excellent': 8,
    'ReviewDistribution.VeryGood': 3,
    'ReviewDistribution.Average': 4,
    'ReviewDistribution.Poor': 3,
    'ReviewDistribution.Terrible': 0,
  };

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
