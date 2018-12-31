import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styles from './AnswerForm.css';
import genStyles from '../App/App.css';

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
      <div className={styles.formContainer}>
        <p className={styles.promptStyle}>WHAT IS YOUR ANSWER?</p>
        <textarea className={'answer-input'} rows="2" cols="50" placeholder={`Hi, ${this.props.currentUser.Username}. Answer this traveler's question here.`} value={this.state.answerContent} onChange={this.handleTextAreaChange}>
        </textarea>
        <div className={styles.buttonContainer}>
          <button className={`${genStyles['btn-primary']} ${genStyles.small} submit-answer`} onClick={this.handleSubmitClick}>Submit</button>
          <button className={`${genStyles['btn-secondary']} ${genStyles.small}`} onClick={this.props.hideAnswerForm} >Cancel</button>
        </div>
      </div>
    );
  }
}

export default AnswerForm;
