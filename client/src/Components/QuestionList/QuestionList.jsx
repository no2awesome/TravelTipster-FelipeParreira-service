import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Question from '../Question/Question.jsx'; // eslint-disable-line no-unused-vars
import styles from './QuestionList.css';

const QuestionList = (props) => {
  const { questions } = props;

  return (
    <ul className={styles.listStyle}>
      {questions.map((question) => {
        const key = question.QuestionID || question.Content.substring(1, 4);
        return (
          <Question key={key} question={question}
          submitAnswer={props.submitAnswer} voteAnswer={props.voteAnswer}
          currentUser={props.currentUser}
          deleteQuestion={() => props.deleteQuestion(question.QuestionID)}
          deleteAnswer={props.deleteAnswer} />
        );
      })}
    </ul>
  );
};

export default QuestionList;
