import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerContent: '',
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleTextAreaChange(e) {
    this.setState({
      answerContent: e.target.value,
    });
  }

  handleSubmitClick() {
    this.props.hideAnswerForm();
    this.props.submitAnswer(this.state.answerContent, this.props.questionID);
  }

  render() {
    return (
      <div>
        <p>WHAT IS YOUR ANSWER?</p>
        <textarea placeholder="Answer this traveler's question here." value={this.state.answerContent} onChange={this.handleTextAreaChange}>
        </textarea>
        <button onClick={this.handleSubmitClick}>Submit</button>
        <button onClick={this.props.hideAnswerForm} >Cancel</button>
      </div>
    );
  }
}

export default AnswerForm;
