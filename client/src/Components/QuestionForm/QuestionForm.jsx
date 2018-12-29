import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import moment from 'moment';
import styles from './QuestionForm.css';
import genStyles from '../App/App.css';

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
    return (
      <div className={`${styles.formContainer} question-form`}>
        <p className={styles.titleStyle}>
        Get quick answers from Omni San Francisco Hotel staff and past guests.
        </p>
        <p className={styles.warningStyle}>
        Note: your question will be posted publicly on the Questions & Answers page.
        </p>
        <textarea placeholder={`Hi, ${this.props.currentUser.Username}. What would you like to know about this accomodation?`} value={this.state.questionContent} onChange={this.handleTextAreaChange} className={styles.formTextInput}>
        </textarea>
        <div className={styles.buttonContainer}>
          <button className={`${genStyles['btn-primary']} ${genStyles.small}`} onClick={this.handleSubmitClick}>Submit</button>
          <button className={`${genStyles['btn-secondary']} ${genStyles.small}`}
          onClick={this.props.hideQuestionForm}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
