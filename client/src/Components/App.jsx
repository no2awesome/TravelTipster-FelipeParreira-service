import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import $ from 'jquery';
import QuestionList from './QuestionList.jsx'; // eslint-disable-line no-unused-vars
import Header from './Header.jsx'; // eslint-disable-line no-unused-vars
import QuestionForm from './QuestionForm.jsx'; // eslint-disable-line no-unused-vars

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };

    this.submitQuestion = this.submitQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    // setInterval(this.componentDidMount, 1000);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/hotels/${this.props.currentHotelID}/questions`,
      success: (questions) => {
        console.log('questions[0]', questions[0]);
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
      url: `http://localhost:3000/hotels/${this.props.currentHotelID}/questions`,
      data: {
        content,
        userId: this.props.currentUser.UserID,
      },
      success: () => {
        const updatedQuestions = this.state.questions.slice();
        const question = {
          Content: content,
          UserID: this.props.currentUser.UserID,
          User: this.props.currentUser,
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


  render() {
    return (
      <div>
        <Header questions={this.state.questions} submitQuestion={this.submitQuestion} />
        <QuestionList questions={this.state.questions} submitAnswer={this.submitAnswer} />
      </div>);
  }
}

export default App;
