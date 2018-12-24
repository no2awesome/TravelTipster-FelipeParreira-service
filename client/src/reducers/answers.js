import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const answersReducer = (state = [], { type, answer }) => {
  if (type === 'ADD_ANSWER') {
    const newState = state.slice();
    return newState.push(answer);
  }

  if (type === 'DELETE_ANSWER') {
    const newState = state.slice();
    for (let i = 0; i < newState.length; i += 1) {
      if (newState[i].id === answer.id) {
        newState.splice(i, 1);
        break;
      }
    }
    return newState;
  }

  if (type === 'UP_VOTE_ANSWER' || type === 'DOWN_VOTE_ANSWER') {
    const newState = state.slice();
    for (let i = 0; i < newState.length; i += 1) {
      if (newState[i].id === answer.id) {
        if (type === 'UP_VOTE_ANSWER') {
          newState[i].Votes += 1;
        } else {
          newState[i].Votes -= 1;
        }
        break;
      }
    }
    return newState;
  }

  return state;
};

export default answersReducer;
