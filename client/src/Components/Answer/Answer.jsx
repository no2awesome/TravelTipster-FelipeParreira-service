import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import VoteToolTip from '../VoteToolTip/VoteToolTip.jsx'; // eslint-disable-line no-unused-vars
import styles from './Answer.css';
import genStyles from '../App/App.css';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserStats: false,
      showUpVoteToolTip: false,
      showDownVoteToolTip: false,
    };

    this.toggleShowUserStats = this.toggleShowUserStats.bind(this);
    this.toggleToolTip = this.toggleToolTip.bind(this);
  }

  toggleShowUserStats() {
    this.setState({
      showUserStats: !this.state.showUserStats,
    });
  }

  toggleToolTip(isUp) {
    if (isUp) {
      this.setState({
        showUpVoteToolTip: !this.state.showUpVoteToolTip,
      });
    } else {
      this.setState({
        showDownVoteToolTip: !this.state.showDownVoteToolTip,
      });
    }
  }

  render() {
    const { answer, user } = this.props;

    return (
      <li className={`${styles.answerItemStyle} answer`}>
        <div className={styles.answerSum}>
          <div className={styles.reviewedStyle}>
            <div onMouseEnter={this.toggleShowUserStats}
            onMouseLeave={this.toggleShowUserStats}>
              <div>Response from {user.Username} |</div>
              <div className={styles.UserStatsContainer}>
                {this.state.showUserStats
                  ? <UserStats user={user} toggleShowUserStats={this.toggleShowUserStats}
                  styles={styles.userStatsStyle}/>
                  : null
                }
              </div>
            </div>
            <div>&nbsp;Reviewed this property | <i className={`${styles.flagStyle} fa fa-flag`}></i></div>
          </div>


          <p className={styles.answerStyle}>{answer.Content}</p>
          {answer.UserID === this.props.currentUser.UserID
            ? <button className={`${genStyles['btn-primary']} ${genStyles.small}`} onClick={this.props.deleteAnswer}>Delete</button>
            : null
          }
        </div>
        <div className={styles.votingContainer}>
          <div className={styles.btnContainer} onMouseEnter={() => this.toggleToolTip(true)}
          onMouseLeave={() => this.toggleToolTip(true)}>
            <button className={genStyles.arrow}
            onClick={() => this.props.voteAnswer(answer.UserID,
              answer.QuestionID,
              answer.id,
              true)}>
              <i className={`${styles.upArrow} fa fa-chevron-up`}></i></button>
              {this.state.showUpVoteToolTip
                ? <VoteToolTip message={'Helpful answer'} />
                : null
              }
          </div>
          <span className={styles.voteCountStyle}>
            {answer.Votes}
            <br />
            <span>Votes</span>
          </span>
          <div className={styles.btnContainer} onMouseEnter={() => this.toggleToolTip(false)}
          onMouseLeave={() => this.toggleToolTip(false)}>
            <button className={genStyles.arrow}
            onClick={() => this.props.voteAnswer(answer.UserID,
              answer.QuestionID,
              answer.id,
              false)}>
                <i className={`${styles.downArrow} fa fa-chevron-down`}></i>
            </button>
            {this.state.showDownVoteToolTip
              ? <VoteToolTip message={'Not as helpful'} />
              : null
            }
          </div>
        </div>
      </li>
    );
  }
}

export default Answer;
