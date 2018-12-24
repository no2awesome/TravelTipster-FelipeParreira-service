import { connect } from 'react-redux';
import QuestionList from '../Components/QuestionList.jsx';
import addQuestion from '../actions/addQuestion';
import deleteQuestion from '../actions/deleteQuestion';

const mapStateToProps = questions => ({
  questions,
});

const mapDispatchToProps = {
  handleAddQuestionClick: addQuestion,
  handleDeleteQuestionClick: deleteQuestion,
};

const QuestionListContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionList);

export default QuestionListContainer;
