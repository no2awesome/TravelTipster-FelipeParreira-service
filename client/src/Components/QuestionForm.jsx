import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import moment from 'moment';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionContent: '',
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleTextAreaChange(e) {
    this.setState({
      questionContent: e.target.value,
    });
  }

  handleSubmitClick() {
    this.props.hideQuestionForm();
    const content = this.state.questionContent;
    const date = moment().format('YYYY-MM-DD');
    this.props.submitQuestion(content, date);
  }

  render() {
    const formContainer = {
      display: 'flex',
      flexDirection: 'column',
    };

    const buttonContainer = {
      display: 'flex',
      width: '133px',
      justifyContent: 'space-between',
      marginTop: '10px',
    };

    const titleStyle = {
      fontSize: '20px',
      color: '#000a12',
      fontFamily: 'Arial',
    };

    const warningStyle = {
      fontSize: '12px',
      color: '#4a4a4a',
      fontFamily: 'Arial',
      marginTop: '-10px',
    };

    return (
      <div className="question-form" style={formContainer}>
        <p style={titleStyle}>
        Get quick answers from Omni San Francisco Hotel staff and past guests.
        </p>
        <p style={warningStyle}>
        Note: your question will be posted publicly on the Questions & Answers page.
        </p>
        <textarea placeholder={`Hi, ${this.props.currentUser.Username}. What would you like to know about this accomodation?`} value={this.state.questionContent} onChange={this.handleTextAreaChange}>
        </textarea>
        <div style={buttonContainer}>
          <button className="btn-primary small" onClick={this.handleSubmitClick}>Submit</button>
          <button className="btn-secondary small"
          onClick={this.props.hideQuestionForm}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
