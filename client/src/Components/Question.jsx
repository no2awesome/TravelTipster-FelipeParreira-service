import React from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import AnswerList from './AnswerList.jsx'; // eslint-disable-line no-unused-vars

const Question = (props) => {
  const { question } = props;

  return (
    <li>

      User: {question.User ? question.User.Username : null}
      <br />
      <img src={question.User ? question.User.ThumbnailURL : null} />
      <br />
      {question.Content}
      <br />
      {question.PostedDate}
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
