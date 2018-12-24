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

  submitQuestion(question) {
    
  }


  render() {
    return (
      <div>
        <Header questions={this.state.questions} submitQuestion={this.submitQuestion} />
        <QuestionList questions={this.state.questions} />
      </div>);
  }
}

export default App;
