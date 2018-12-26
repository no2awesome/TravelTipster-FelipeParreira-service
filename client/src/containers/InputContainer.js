import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Input from '../Components/Input.jsx';
import changeAnswerList from '../actions/changeAnswerList';
import changeQuestionList from '../actions/changeQuestionList';

const mapStateToProps = questions => ({
  questions,
});

const mapDispatchToProps = {
  handleQuestionListChange: changeQuestionList,
  handleAnswerListChange: changeAnswerList,
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps)(Input);

export default InputContainer;
