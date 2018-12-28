import React, { Component } from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import moment from 'moment';
import AnswerList from '../AnswerList/AnswerList.jsx'; // eslint-disable-line no-unused-vars
import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-vars
// import styles from './style4.css';

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
    const questionStyle = {
      width: '700px',
      fontSize: '16px',
      lineHeight: '22px',
      color: '#000a12',
      fontFamily: 'Arial',
    };

    const flagStyle = {
      fontSize: '10px',
      color: '#b7b7b7',
    };

    const dateStyle = {
      fontSize: '12px',
      color: '#4a4a4a',
      fontFamily: 'Arial',
    };

    const questionItemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      width: '850px',
      borderBottom: '1px solid #e5e5e5',
      paddingRight: '25px',
      paddingLeft: '35px',
    };

    const userMiniProfile = {
      display: 'flex',
      flexDirection: 'column',
      width: '70px',
      marginTop: '20px',
      height: '70px',
      position: 'relative',
    };

    const userPicStyle = {
      maxWidth: '70px',
      width: '100%',
      borderRadius: '50%',
    };

    const usernameStyle = {
      color: '#000a12',
      cursor: 'pointer',
      fontFamily: 'Arial',
      fontSize: '11px',
      marginRight: 'auto',
      marginLeft: 'auto',
    };

    const deleteButton = {
      marginBottom: '10px',
    };

    const userStatsStyle = {
      position: 'absolute',
      left: '50%',
      top: '200%',
      overflow: 'visible',
    };

    return (
    <li style={questionItemStyle}>
    <div onMouseEnter={this.toggleShowUserStats} onMouseLeave={this.toggleShowUserStats}
    style={userMiniProfile}>
      <img style={userPicStyle} src={question.User ? question.User.ThumbnailURL : null} />
      <p style={usernameStyle}>{question.User ? question.User.Username : null}</p>
      {this.state.showUserStats
        ? <UserStats style={userStatsStyle} user={question.User} />
        : null
      }
    </div>
      <div>
        <div>
          <p style={questionStyle}>{question.Content}</p>
          <p style={dateStyle}>{moment(question.PostedDate).format('LL')} | <i className="fa fa-flag" style={flagStyle}></i></p>
        </div>
        <br />
        {question.UserID === this.props.currentUser.UserID
          ? <button style={deleteButton} className="btn-primary small" onClick={this.props.deleteQuestion}>Delete</button>
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
