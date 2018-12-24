import { connect } from 'react-redux';
import QuestionList from '../Components/QuestionList.jsx';
import deleteQuestion from '../actions/deleteQuestion';

const mapStateToProps = questions => ({
  questions,
});

const mapDispatchToProps = {
  handleDeleteQuestionClick: deleteQuestion,
};

const QuestionListContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionList);

export default QuestionListContainer;
