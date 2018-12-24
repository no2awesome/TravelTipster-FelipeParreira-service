import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

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

    const question = {

    };
    this.props.submitQuestion(question);
  }

  render() {
    return (
      <div>
        <h3>Get quick answers from Omni San Francisco Hotel staff and past guests.</h3>
        <p>Note: your question will be posted publicly on the Questions & Answers page.</p>
        <textarea placeholder="What would you like to know about this accomodation?" value={this.state.questionContent} onChange={this.handleTextAreaChange}>
        </textarea>
        <button onClick={this.handleSubmitClick}>Submit</button>
        <button onClick={this.props.hideQuestionForm}>Cancel</button>
      </div>
    );
  }
}

export default QuestionForm;
