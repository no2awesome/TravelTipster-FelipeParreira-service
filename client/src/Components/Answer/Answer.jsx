import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './Answer.css';
import genStyles from '../App/App.css';

// import UserStats from '../UserStats/UserStats.jsx'; // eslint-disable-line no-unused-var
// import CssModules from 'react-css-modules';

const Answer = (props) => {
  const { answer, user } = props;

  // <UserStats user={user} />
  return (
    <li className={`${styles.answerItemStyle} answer`}>
      <div>
        <p className={styles.reviewedStyle}>Response from {user.Username} | Reviewed this property | <i className={`${styles.flagStyle} fa fa-flag`}></i> </p>
        <p className={styles.answerStyle}>{answer.Content}</p>
        {answer.UserID === props.currentUser.UserID
          ? <button className="btn-primary small" onClick={props.deleteAnswer}>Delete</button>
          : null
        }
      </div>
      <div className={styles.votingContainer}>
        <button className={genStyles.arrow}
        onClick={() => props.voteAnswer(answer.UserID,
          answer.QuestionID,
          answer.id,
          true)}>
          <i className={`${styles.upArrow} fa fa-chevron-up`}></i></button>
        <span className={styles.voteCountStyle}>
          {answer.Votes}
          <br />
          <span>Votes</span>
        </span>
        <button className={genStyles.arrow}
        onClick={() => props.voteAnswer(answer.UserID,
          answer.QuestionID,
          answer.id,
          false)}>
            <i className={`${styles.downArrow} fa fa-chevron-down`}></i>
        </button>
      </div>
    </li>
  );
};

export default Answer;
