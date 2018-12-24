import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const addAnswerReducer = (state = [], { type, answer }) => {
  if (type === 'ADD_ANSWER') {
    const newState = state.slice();
    return newState.push(answer);
  }
  return state;
};

export default addAnswerReducer;
