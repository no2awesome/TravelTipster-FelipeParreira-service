import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import $ from 'jquery';
import Question from './Question.jsx'; // eslint-disable-line no-unused-vars

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/hotels/${this.props.hotelId}/questions`,
      success: (questions) => {
        console.log('questions', questions);
        this.setState({
          questions,
        });
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  render() {
    return (
      <ul>
       {this.state.questions.map(question => (
           <Question key={question.QuestionID} data={question}/>
       ))}
      </ul>
    );
  }
}

export default QuestionList;
