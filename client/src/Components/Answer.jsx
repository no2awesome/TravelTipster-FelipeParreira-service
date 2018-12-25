import React from 'react'; // eslint-disable-line no-unused-vars

const Answer = (props) => {
  const { answer, user } = props;
  const upArrow = {
    fontSize: '10px',
    textAlign: 'center',
    lineHeight: '50%',
    position: 'absolute',
    top: '20%',
    left: '20%',
  };
  const downArrow = {
    ...upArrow,
    top: '35%',
  };

  return (
    <li>
      {answer.Content}
      <br />
      User: {user.Username}
      <br />
      Votes: {answer.Votes}
      <br />
      {answer.UserID === props.currentUser.UserID
        ? <button className="btn-primary" onClick={props.deleteAnswer}>Delete</button>
        : null
      }
      <button className="arrow"
      onClick={() => props.voteAnswer(answer.UserID,
        answer.QuestionID,
        answer.id,
        true)}>
        <i className="fa fa-chevron-up" style={upArrow}></i></button>
      <button className="arrow"
      onClick={() => props.voteAnswer(answer.UserID,
        answer.QuestionID,
        answer.id,
        false)}>
          <i className="fa fa-chevron-down" style={downArrow}></i>
        </button>
    </li>
  );
};

export default Answer;
