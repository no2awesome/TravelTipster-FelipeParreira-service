import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import styles from './Answer.css';
import genStyles from '../App/App.css';

// import CssModules from 'react-css-modules';

class Answer extends Component {
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
    const { answer, user } = this.props;

    return (
      <li className={`${styles.answerItemStyle} answer`}>
        <div className={styles.answerSum} onMouseEnter={this.toggleShowUserStats}
        onMouseLeave={this.toggleShowUserStats}>
          <p className={styles.reviewedStyle}>Response from {user.Username} | Reviewed this property | <i className={`${styles.flagStyle} fa fa-flag`}></i> </p>
          <p className={styles.answerStyle}>{answer.Content}</p>
          {answer.UserID === this.props.currentUser.UserID
            ? <button className={`${genStyles['btn-primary']} ${genStyles.small}`} onClick={this.props.deleteAnswer}>Delete</button>
            : null
          }
          {this.state.showUserStats
            ? <UserStats user={user} toggleShowUserStats={this.toggleShowUserStats} 
            className={styles.userStatsStyle}/>
            : null
          }
        </div>
        <div className={styles.votingContainer}>
          <button className={genStyles.arrow}
          onClick={() => this.props.voteAnswer(answer.UserID,
            answer.QuestionID,
            answer.id,
            true)}>
            <i className={`${styles.upArrow} fa fa-chevron-up`}></i></button>
          <span className={styles.voteCountStyle}>
            {answer.Votes}
            <br />
            <span>Votes</span>
          </span>
          <button className={genStyles.arrow}
          onClick={() => this.props.voteAnswer(answer.UserID,
            answer.QuestionID,
            answer.id,
            false)}>
              <i className={`${styles.downArrow} fa fa-chevron-down`}></i>
          </button>
        </div>
      </li>
    );
  }
}

export default Answer;
