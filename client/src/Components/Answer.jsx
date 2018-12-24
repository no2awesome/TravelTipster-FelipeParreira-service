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
    </li>
  );
};

export default Answer;
