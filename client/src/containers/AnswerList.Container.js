import { connect } from 'react-redux';
import AnswerList from '../Components/AnswerList.jsx';
import addAnswer from '../actions/addQuestion';
import deleteAnswer from '../actions/deleteQuestion';
import upVoteAnswer from '../actions/upVoteAnswer';
import downVoteAnswer from '../actions/downVoteAnswer';

const mapStateToProps = answers => ({
  answers,
});

const mapDispatchToProps = {
  handleAddAnswerClick: addAnswer,
  handleDeleteAnswerClick: deleteAnswer,
  handleUpVoteAnswer: upVoteAnswer,
  handleDownVoteAnswer: downVoteAnswer,
};

const AnswerListContainer = connect(mapStateToProps, mapDispatchToProps)(AnswerList);

export default AnswerListContainer;
