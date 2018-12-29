import React, { Component } from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import moment from 'moment';
import AnswerList from '../AnswerList/AnswerList.jsx'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
import QAToolTip from '../QAToolTip/QAToolTip.jsx'; // eslint-disable-line no-unused-vars
import ReportForm from '../ReportForm/ReportForm.jsx'; // eslint-disable-line no-unused-vars
import styles from './Question.css';
import genStyles from '../App/App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserStats: false,
      showToolTip: false,
      showReportForm: false,
      reportWasSubmitted: false,
      reportState: {
        reportContent: '',
        isInvalidInput: false,
      },
    };

    this.toggleShowUserStats = this.toggleShowUserStats.bind(this);
    this.toggleShowToolTip = this.toggleShowToolTip.bind(this);
    this.toggleReportForm = this.toggleReportForm.bind(this);
  }

  toggleShowUserStats() {
    this.setState({
      showUserStats: !this.state.showUserStats,
    });
  }

  toggleShowToolTip(isTheSameUser) {
    if (isTheSameUser) {
      return;
    }
    this.setState({
      showToolTip: !this.state.showToolTip,
    });
  }

  toggleReportForm(reportState, isSubmission) {
    this.setState({
      showReportForm: !this.state.showReportForm,
      reportState,
      reportWasSubmitted: !!isSubmission,
    });

    if (isSubmission) {
      this.props.postReportForQuestion(this.props.question.QuestionID);
    }
  }

  render() {
    const { question } = this.props;
    const isTheSameUser = question.UserID === this.props.currentUser.UserID;
    let reportIconStyle = `${styles.flagStyle} fa fa-flag`;
    if (isTheSameUser) {
      reportIconStyle += ` ${genStyles.disabled}`;
    }

    let reportFormContainerStyles = '';
    if (!this.state.showReportForm) {
      reportFormContainerStyles += `${styles.hidden}`;
    }

    const { reportState } = this.state;
    let subHeaderContent = (
      <div className={styles.dateStyle}>{moment(question.PostedDate).format('LL')} |&nbsp;
        <i onClick={() => this.toggleReportForm(this.state.reportState)}
        onMouseEnter={() => this.toggleShowToolTip(isTheSameUser)}
        onMouseLeave={() => this.toggleShowToolTip(isTheSameUser)} className={reportIconStyle}>
        {this.state.showToolTip
          ? <QAToolTip message={'Problem with this question?'} />
          : null
        }
        </i>
      </div>
    );

    if (this.state.reportWasSubmitted) {
      subHeaderContent = (
        <div className={styles.dateStyle}>
          Thank you. We appreciate your input.
        </div>
      );
    }

    return (
    <li className={styles.questionItemStyle}>
      <div className={reportFormContainerStyles}>
        {this.state.showReportForm
          ? <ReportForm closeForm={this.toggleReportForm} initialState={reportState} />
          : null
        }
      </div>
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
          {subHeaderContent}
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
