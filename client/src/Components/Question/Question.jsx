import React, { Component } from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import moment from 'moment';
import AnswerList from '../AnswerList/AnswerList.jsx'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import styles from './Question.css';
import genStyles from '../App/App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserStats: false,
    };

    this.toggleShowUserStats = this.toggleShowUserStats.bind(this);
  }

  toggleShowUserStats() {
    this.setState({
      showUserStats: !this.state.showUserStats,
    });
  }

  render() {
    const { question } = this.props;

    return (
    <li className={styles.questionItemStyle}>
    <div onMouseEnter={this.toggleShowUserStats} onMouseLeave={this.toggleShowUserStats}
    className={styles.userMiniProfile}>
      <img className={styles.userPicStyle}
      src={question.User ? question.User.ThumbnailURL : null} />
      <p className={styles.usernameStyle}>{question.User ? question.User.Username : null}</p>
      {this.state.showUserStats
        ? <UserStats toggleShowUserStats={this.toggleShowUserStats}
        className={styles.userStatsStyle} user={question.User} />
        : null
      }
    </div>
      <div>
        <div>
          <p className={styles.questionStyle}>{question.Content}</p>
          <p className={styles.dateStyle}>{moment(question.PostedDate).format('LL')} | <i className={`${styles.flagStyle} fa fa-flag`}></i></p>
        </div>
        <br />
        {question.UserID === this.props.currentUser.UserID
          ? <button className={`${styles.deleteButton} ${genStyles['btn-primary']} ${genStyles.small}`} onClick={this.props.deleteQuestion}>Delete</button>
          : null
        }
        <AnswerList answers={this.props.question.Answers} users={this.props.question.AnswersUsers}
        submitAnswer={this.props.submitAnswer} questionID={question.QuestionID}
        voteAnswer={this.props.voteAnswer} currentUser={this.props.currentUser}
        deleteAnswer={this.props.deleteAnswer} />
      </div>
    </li>
    );
  }
}

export default Question;
