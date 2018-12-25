import React from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import moment from 'moment';
import AnswerList from './AnswerList.jsx'; // eslint-disable-line no-unused-vars

const Question = (props) => {
  const { question } = props;
  const questionStyle = {
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

  return (
    <li>
      User: {question.User ? question.User.Username : null}
      <br />
      <img src={question.User ? question.User.ThumbnailURL : null} />
      <br />
      <p style={questionStyle}>{question.Content}</p>
      <p style={dateStyle}>{moment(question.PostedDate).format('LL')} | <i className="fa fa-flag" style={flagStyle}></i></p>
      <br />
      {question.UserID === props.currentUser.UserID
        ? <button className="btn-primary small" onClick={props.deleteQuestion}>Delete</button>
        : null
      }
      <AnswerList answers={props.question.Answers} users={props.question.AnswersUsers}
      submitAnswer={props.submitAnswer} questionID={question.QuestionID}
      voteAnswer={props.voteAnswer} currentUser={props.currentUser}
      deleteAnswer={props.deleteAnswer} />
    </li>
  );
};

export default Question;
