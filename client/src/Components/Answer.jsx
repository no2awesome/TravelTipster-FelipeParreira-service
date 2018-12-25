import React from 'react'; // eslint-disable-line no-unused-vars

const Answer = (props) => {
  const { answer, user } = props;

  return (
    <li>
      {answer.Content}
      <br />
      User: {user.Username}
      <br />
      Votes: {answer.Votes}
      <button onClick={() => props.voteAnswer(answer.QuestionID, answer.id, true)}>Up</button>
      <button onClick={() => props.voteAnswer(answer.QuestionID, answer.id, false)}>Down</button>
    </li>
  );
};

export default Answer;
