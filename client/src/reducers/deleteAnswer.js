import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const deleteAnswerReducer = (state = [], { type, answer }) => {
  if (type === 'DELETE_ANSWER') {
    const newState = state.slice();
    for (let i = 0; i < newState.length; i += 1) {
      if (newState[i].id === answer.id) {
        newState.splice(i, 1);
        break;
      }
    }
    return newState.push(answer);
  }
  return state;
};

export default deleteAnswerReducer;
