import React from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import AnswerList from './AnswerList.jsx'; // eslint-disable-line no-unused-vars

const Question = (props) => {
  const { question } = props;

  return (
    <li>
      User: {question.User.Username}
      <br />
      <img src={question.User.ThumbnailURL} />
      <br />
      {question.Content}
      <br />
      {question.PostedDate}
      <AnswerList answers={props.question.Answers} users={props.question.AnswersUsers} />
    </li>
  );
};

export default Question;
