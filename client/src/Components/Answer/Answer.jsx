import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import VoteToolTip from '../VoteToolTip/VoteToolTip.jsx'; // eslint-disable-line no-unused-vars
import QAToolTip from '../QAToolTip/QAToolTip.jsx'; // eslint-disable-line no-unused-vars
import ReportForm from '../ReportForm/ReportForm.jsx'; // eslint-disable-line no-unused-vars
import styles from './Answer.css';
import genStyles from '../App/App.css';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserStats: false,
      showUpVoteToolTip: false,
      showDownVoteToolTip: false,
      showReportToolTip: false,
      showReportForm: false,
      reportWasSubmitted: false,
      reportState: {
        reportContent: '',
        isInvalidInput: false,
      },
    };

    this.toggleShowUserStats = this.toggleShowUserStats.bind(this);
    this.toggleVoteToolTip = this.toggleVoteToolTip.bind(this);
    this.toggleReportToolTip = this.toggleReportToolTip.bind(this);
    this.toggleReportForm = this.toggleReportForm.bind(this);
  }

  toggleShowUserStats() {
    this.setState({
      showUserStats: !this.state.showUserStats,
    });
  }

  toggleVoteToolTip(isUp, isTheSameUser) {
    if (isTheSameUser) {
      return;
    }
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

  toggleReportToolTip(isTheSameUser) {
    if (isTheSameUser) {
      return;
    }
    this.setState({
      showReportToolTip: !this.state.showReportToolTip,
    });
  }

  toggleReportForm(reportState, isSubmission) {
    this.setState({
      showReportForm: !this.state.showReportForm,
      reportState,
      reportWasSubmitted: !!isSubmission,
    });

    if (isSubmission) {
      const { answer } = this.props;
      this.props.postReport(answer.QuestionID, answer.id);
    }
  }

  render() {
    const { answer, user } = this.props;

    let arrowBtnStyles = `${genStyles.arrow}`;
    let reportIconStyle = `${styles.flagStyle}`;
    const isTheSameUser = answer.UserID === this.props.currentUser.UserID;
    if (isTheSameUser) {
      arrowBtnStyles += ` ${styles.disabled}`;
      reportIconStyle += ` ${genStyles.disabled}`;
    }

    const { reportState } = this.state;
    let reviewedHeader = (
      <div className={styles.reviewedStyle}>
        <div onMouseEnter={this.toggleShowUserStats}
        onMouseLeave={this.toggleShowUserStats}>
          <div className="title">Response from {user.Username} |</div>
          <div className={styles.UserStatsContainer}>
            {this.state.showUserStats
              ? <UserStats user={user} toggleShowUserStats={this.toggleShowUserStats}
              styles={styles.userStatsStyle}/>
              : null
            }
          </div>
        </div>
        <div>&nbsp;Reviewed this property | <i
        onClick={() => this.toggleReportForm(this.state.reportState)}
        onMouseEnter={() => this.toggleReportToolTip(isTheSameUser)}
        onMouseLeave={() => this.toggleReportToolTip(isTheSameUser)}
        className={`${reportIconStyle} fa fa-flag`}>
        <div className={styles.reportToolTipContainer}>
          {this.state.showReportToolTip
            ? <QAToolTip message={'Problem with this answer?'} />
            : null
          }
        </div>
        </i></div>
      </div>
    );

    if (this.state.reportWasSubmitted) {
      reviewedHeader = (
        <div className={styles.reviewedStyle}>
          Thank you. We appreciate your input.
        </div>
      );
    }

    return (
      <li className={`${styles.answerItemStyle} answer`}>
        {this.state.showReportForm
          ? <ReportForm closeForm={this.toggleReportForm} initialState={reportState} />
          : null
        }
        <div className={styles.answerSum}>
          {reviewedHeader}
          <p className={`${styles.answerStyle} answer-content`}>{answer.Content}</p>
          {answer.UserID === this.props.currentUser.UserID
            ? <button className={`delete-answer ${genStyles['btn-primary']} ${genStyles.small}`} onClick={this.props.deleteAnswer}>Delete</button>
            : null
          }
        </div>
        <div className={styles.votingContainer}>
          <div className={styles.btnContainer}
          onMouseEnter={() => this.toggleVoteToolTip(true, isTheSameUser)}
          onMouseLeave={() => this.toggleVoteToolTip(true, isTheSameUser)}>
            <button className={`${arrowBtnStyles} arrow-up`}
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
          <div className={styles.btnContainer}
          onMouseEnter={() => this.toggleVoteToolTip(false, isTheSameUser)}
          onMouseLeave={() => this.toggleVoteToolTip(false, isTheSameUser)}>
            <button className={`${arrowBtnStyles} arrow-down`}
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
