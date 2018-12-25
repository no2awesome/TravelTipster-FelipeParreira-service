import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import $ from 'jquery';
import QuestionList from './QuestionList.jsx'; // eslint-disable-line no-unused-vars
import Header from './Header.jsx'; // eslint-disable-line no-unused-vars

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      votedAnswers: [],
    };

    this.submitQuestion = this.submitQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.voteAnswer = this.voteAnswer.bind(this);
    // setInterval(this.componentDidMount, 1000);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/hotels/${this.props.currentHotelID}/questions`,
      success: (questions) => {
        console.log('questions[questions.length - 1]', questions[questions.length - 1]);
        this.setState({
          questions,
        });
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  submitQuestion(content, date) {
    console.log(content, date);
    $.ajax({
      type: 'POST',
      url: `http://localhost:3000/hotels/${this.props.currentHotelID}/questions`,
      data: {
        content,
        postedDate: date,
        userId: this.props.currentUser.UserID,
      },
      success: () => {
        const updatedQuestions = this.state.questions.slice();
        const question = {
          Content: content,
          PostedDate: date,
          UserID: this.props.currentUser.UserID,
          User: this.props.currentUser,
          Answers: [],
          AnswersUsers: [],
        };

        updatedQuestions.unshift(question);
        console.log(updatedQuestions);
        this.setState({
          questions: updatedQuestions,
        });
      },
      error: err => console.log('ERROR', err),
    });
  }

  submitAnswer(content, questionID) {
    console.log(content, questionID);
    $.ajax({
      type: 'POST',
      url: `http://localhost:3000/hotels/${this.props.currentHotelID}/questions/${questionID}/answers`,
      data: {
        content,
        userId: this.props.currentUser.UserID,
      },
      success: () => {
        const updatedQuestions = this.state.questions.slice();
        let [answeredQuestion] = updatedQuestions
          .filter(question => question.QuestionID === questionID);
        answeredQuestion = { ...answeredQuestion };

        console.log('answeredQuestion', answeredQuestion);

        const answer = {
          Content: content,
          UserID: this.props.currentUser.UserID,
          QuestionID: questionID,
          Votes: 0,
        };

        answeredQuestion.Answers = answeredQuestion.Answers || [];
        answeredQuestion.Answers.unshift(answer);
        answeredQuestion.AnswersUsers = answeredQuestion.AnswersUsers || [];
        answeredQuestion.AnswersUsers.unshift(this.props.currentUser);

        console.log(updatedQuestions);
        this.setState({
          questions: updatedQuestions,
        });
      },
      error: err => console.log('ERROR', err),
    });
  }

  voteAnswer(questionID, answerID, isUp) {
    if (this.state.votedAnswers.includes(answerID)) {
      return;
    }

    const vote = isUp ? 1 : -1;
    $.ajax({
      type: 'PATCH',
      url: `http://localhost:3000/hotels/${this.props.currentHotelID}/questions/${questionID}/answers/${answerID}/votes`,
      data: { vote },
      success: () => {
        const updatedQuestions = this.state.questions.slice();
        let [selectedQuestion] = updatedQuestions
          .filter(question => question.QuestionID === questionID);
        selectedQuestion = { ...selectedQuestion };

        console.log('selectedQuestion', selectedQuestion);

        const [votedAnswer] = selectedQuestion.Answers.filter(answer => answer.id === answerID);
        votedAnswer.Votes += vote;

        console.log(updatedQuestions);
        const votedAnswers = this.state.votedAnswers.slice();
        votedAnswers.push(answerID);

        this.setState({
          questions: updatedQuestions,
          votedAnswers,
        });
      },
      error: err => console.log('Error', err),
    });
  }


  render() {
    return (
      <div>
        <Header questions={this.state.questions} submitQuestion={this.submitQuestion} />
        <QuestionList questions={this.state.questions} submitAnswer={this.submitAnswer}
        voteAnswer={this.voteAnswer} />
      </div>);
  }
}

export default App;
