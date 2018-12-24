import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const upVoteAnswerReducer = (state = [], { type, answer }) => {
  if (type === 'UP_VOTE_ANSWER') {
    const newState = state.slice();
    for (let i = 0; i < newState.length; i += 1) {
      if (newState[i].id === answer.id) {
        newState[i].Votes += 1;
        break;
      }
    }
    return newState;
  }
  return state;
};

export default upVoteAnswerReducer;
