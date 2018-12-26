import React from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import moment from 'moment';
import AnswerList from './AnswerList.jsx'; // eslint-disable-line no-unused-vars

const Question = (props) => {
  const { question } = props;
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

  return (
    <li style={questionItemStyle}>
      <div style={userMiniProfile}>
        <img style={userPicStyle} src={question.User ? question.User.ThumbnailURL : null} />
        <p style={usernameStyle}>{question.User ? question.User.Username : null}</p>
      </div>
      <div>
        <div>
          <p style={questionStyle}>{question.Content}</p>
          <p style={dateStyle}>{moment(question.PostedDate).format('LL')} | <i className="fa fa-flag" style={flagStyle}></i></p>
        </div>
        <br />
        {question.UserID === props.currentUser.UserID
          ? <button style={deleteButton} className="btn-primary small" onClick={props.deleteQuestion}>Delete</button>
          : null
        }
        <AnswerList answers={props.question.Answers} users={props.question.AnswersUsers}
        submitAnswer={props.submitAnswer} questionID={question.QuestionID}
        voteAnswer={props.voteAnswer} currentUser={props.currentUser}
        deleteAnswer={props.deleteAnswer} />
      </div>
    </li>
  );
};

export default Question;
