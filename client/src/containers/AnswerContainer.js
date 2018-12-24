import { connect } from 'react-redux';
import Answer from '../Components/Answer.jsx';
import upVoteAnswer from '../actions/upVoteAnswer';
import downVoteAnswer from '../actions/downVoteAnswer';

const mapDispatchToProps = {
  handleUpVoteAnswer: upVoteAnswer,
  handleDownVoteAnswer: downVoteAnswer,
};

const AnswerContainer = connect(null, mapDispatchToProps)(Answer);

export default AnswerContainer;
