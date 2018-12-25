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
    const promptStyle = {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#767676',
      fontFamily: 'Arial',
    };

    const formContainer = {
      display: 'flex',
      flexDirection: 'column',
      height: '150px',
      justifyContent: 'space-between',
      marginBottom: '20px',
    };

    const buttonContainer = {
      display: 'flex',
      width: '133px',
      justifyContent: 'space-between',
    };

    return (
      <div style={formContainer}>
        <p style={promptStyle}>WHAT IS YOUR ANSWER?</p>
        <textarea rows="2" cols="50" placeholder={`Hi, ${this.props.currentUser.Username}. Answer this traveler's question here.`} value={this.state.answerContent} onChange={this.handleTextAreaChange}>
        </textarea>
        <div style={buttonContainer}>
          <button className="btn-primary small" onClick={this.handleSubmitClick}>Submit</button>
          <button className="btn-secondary small" onClick={this.props.hideAnswerForm} >Cancel</button>
        </div>
      </div>
    );
  }
}

export default AnswerForm;
