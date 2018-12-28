import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Radium from 'radium'; // eslint-disable-line no-unused-vars
import QuestionForm from '../QuestionForm/QuestionForm.jsx'; // eslint-disable-line no-unused-vars
import styles from './Header.css';
import genStyles from '../App/App.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestionForm: false,
    };

    this.showQuestionForm = this.showQuestionForm.bind(this);
    this.hideQuestionForm = this.hideQuestionForm.bind(this);
  }

  showQuestionForm() {
    this.setState({
      showQuestionForm: true,
    });
  }

  hideQuestionForm() {
    this.setState({
      showQuestionForm: false,
    });
  }

  render() {
    return (
      <div className={styles.blockStyle}>
        <div className={styles.containerStyle}>
          <div className={styles.titleStyle}>Questions & Answers</div>
          <button className={`${genStyles['btn-primary']} ${genStyles.big}`} onClick={this.showQuestionForm}>Ask a question</button>
        </div>
        <a href="#">See all {this.props.questions.length} questions</a>
        {this.state.showQuestionForm
          ? <QuestionForm hideQuestionForm={this.hideQuestionForm}
          submitQuestion={this.props.submitQuestion} currentUser={this.props.currentUser} />
          : null
        }
      </div>
    );
  }
}

export default Header;
