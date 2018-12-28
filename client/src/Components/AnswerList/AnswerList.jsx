import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Answer from '../Answer/Answer.jsx'; // eslint-disable-line no-unused-vars
import AnswerForm from '../AnswerForm/AnswerForm.jsx'; // eslint-disable-line no-unused-vars
import styles from './AnswerList.css';
import genStyles from '../App/App.css';

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswerForm: false,
      showAllAnswers: false,
    };

    this.showAnswerForm = this.showAnswerForm.bind(this);
    this.hideAnswerForm = this.hideAnswerForm.bind(this);
    this.toggleShowAllAnswers = this.toggleShowAllAnswers.bind(this);
  }

  showAnswerForm() {
    this.setState({
      showAnswerForm: true,
    });
  }

  hideAnswerForm() {
    this.setState({
      showAnswerForm: false,
    });
  }

  toggleShowAllAnswers() {
    this.setState({
      showAllAnswers: !this.state.showAllAnswers,
    });
  }

  render() {
    let { answers } = this.props;
    const { users } = this.props;
    answers = answers || [];
    const { length } = answers;
    if (!this.state.showAllAnswers) {
      answers = answers.slice(0, 1);
    }

    return (
      <div className={styles.answerListContainer}>
        <div className={styles.buttonContainer}>
          <button className={`${styles.answerButton} ${genStyles['btn-primary']} ${genStyles.small}`} onClick={this.showAnswerForm}>Answer</button>
          <button className={`${genStyles['btn-secondary']} ${genStyles.small}`} onClick={this.toggleShowAllAnswers}>
            {!this.state.showAllAnswers
              ? `Show all ${length} answers`
              : 'Hide all answers'
            }
          </button>
        </div>
        {this.state.showAnswerForm
          ? <AnswerForm hideAnswerForm={this.hideAnswerForm}
          submitAnswer={this.props.submitAnswer} questionID={this.props.questionID}
          currentUser={this.props.currentUser} />
          : null
        }
        <ul className={styles.listStyle}>
          {answers.map((answer, index) => {
            const key = answer.id || answer.Content.substring(1, 4);
            return (<Answer key={key} answer={answer} user={users[index]}
              voteAnswer={this.props.voteAnswer} currentUser={this.props.currentUser}
              deleteAnswer={() => this.props.deleteAnswer(this.props.questionID, answer.id)} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AnswerList;
