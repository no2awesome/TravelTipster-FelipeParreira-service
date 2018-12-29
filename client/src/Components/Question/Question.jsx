import React, { Component } from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import moment from 'moment';
import AnswerList from '../AnswerList/AnswerList.jsx'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import QAToolTip from '../QAToolTip/QAToolTip.jsx'; // eslint-disable-line no-unused-vars
import styles from './Question.css';
import genStyles from '../App/App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserStats: false,
      showToolTip: false,
    };

    this.toggleShowUserStats = this.toggleShowUserStats.bind(this);
    this.toggleShowToolTip = this.toggleShowToolTip.bind(this);
  }

  toggleShowUserStats() {
    this.setState({
      showUserStats: !this.state.showUserStats,
    });
  }

  toggleShowToolTip() {
    this.setState({
      showToolTip: !this.state.showToolTip,
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
        ? <UserStats toggleShowUserStats={this.toggleShowUserStats} user={question.User}
        styles={styles.userStatsStyle} />
        : null
      }
    </div>
      <div>
        <div className={styles.headerContainer}>
          <p className={styles.questionStyle}>{question.Content}</p>
          <p className={styles.dateStyle}>{moment(question.PostedDate).format('LL')} |&nbsp;
          <i onMouseEnter={this.toggleShowToolTip} onMouseLeave={this.toggleShowToolTip} className={`${styles.flagStyle} fa fa-flag`}>
          {this.state.showToolTip
            ? <QAToolTip message={'Problem with this question?'} />
            : null
          }
          </i>
          </p>
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
