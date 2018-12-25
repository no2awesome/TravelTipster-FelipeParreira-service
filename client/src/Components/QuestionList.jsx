import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Question from './Question.jsx'; // eslint-disable-line no-unused-vars

const QuestionList = (props) => {
  const { questions } = props;

  return (
    <ul>
      {questions.map(question => (
          <Question key={question.QuestionID} question={question}
          submitAnswer={props.submitAnswer} />
      ))}
    </ul>
  );
};

export default QuestionList;
