import { connect } from 'react-redux';
import AnswerList from '../Components/AnswerList.jsx';
import addAnswer from '../actions/addQuestion';
import deleteAnswer from '../actions/deleteQuestion';

const mapStateToProps = answers => ({
  answers,
});

const mapDispatchToProps = {
  handleAddAnswerClick: addAnswer,
  handleDeleteAnswerClick: deleteAnswer,
};

const AnswerListContainer = connect(mapStateToProps, mapDispatchToProps)(AnswerList);

export default AnswerListContainer;
