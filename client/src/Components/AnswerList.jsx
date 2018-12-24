import React from 'react'; // eslint-disable-line no-unused-vars
import Answer from './Answer.jsx'; // eslint-disable-line no-unused-vars

const AnswerList = (props) => {
  const { answers, users } = props;

  return (
    <ul>
      {answers.map((answer, index) => (
          <Answer key={answer.id} answer={answer} user={users[index]} />
      ))}
    </ul>
  );
};

export default AnswerList;
