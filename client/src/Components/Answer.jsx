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

  const answerStyle = {
    fontSize: '14px',
    lineHeight: '18px',
    color: '#4a4a4a',
    fontFamily: 'Arial',
  };

  const reviewedStyle = {
    ...answerStyle,
    color: '#000a12',
  };

  const flagStyle = {
    fontSize: '14px',
    color: '#b7b7b7',
  };

  const answerItemStyle = {
    borderLeft: '1px solid #e5e5e5',
    paddingLeft: '30px',
    display: 'flex',
    width: '700px',
    justifyContent: 'space-between',
    marginBottom: '30px',
    position: 'relative',
  };

  const voteCountStyle = {
    textAlign: 'center',
    fontSize: '12px',
    color: '#4a4a4a',
    fontFamily: 'Arial',
  };

  const votingContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100px',
    float: 'right',
    marginLeft: '20px',
    marginTop: '20px',
  };

  return (
    <li style={answerItemStyle}>
      <div>
        <p style={reviewedStyle}>Response from {user.Username} | Reviewed this property | <i className="fa fa-flag" style={flagStyle}></i> </p>
        <p style={answerStyle}>{answer.Content}</p>
        {answer.UserID === props.currentUser.UserID
          ? <button className="btn-primary small" onClick={props.deleteAnswer}>Delete</button>
          : null
        }
      </div>
      <div style={votingContainer}>
        <button className="arrow"
        onClick={() => props.voteAnswer(answer.UserID,
          answer.QuestionID,
          answer.id,
          true)}>
          <i className="fa fa-chevron-up" style={upArrow}></i></button>
        <span style={voteCountStyle}>
          {answer.Votes}
          <br />
          <span>Votes</span>
        </span>
        <button className="arrow"
        onClick={() => props.voteAnswer(answer.UserID,
          answer.QuestionID,
          answer.id,
          false)}>
            <i className="fa fa-chevron-down" style={downArrow}></i>
        </button>
      </div>
    </li>
  );
};

export default Answer;
