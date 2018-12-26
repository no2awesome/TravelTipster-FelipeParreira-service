import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Question from './Question.jsx'; // eslint-disable-line no-unused-vars

const QuestionList = (props) => {
  const { questions } = props;
  const listStyle = {
    listStyleType: 'none',
    width: '850px',
    paddingRight: '35px',
    paddingLeft: '15px',
  };

  return (
    <ul style={listStyle}>
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
