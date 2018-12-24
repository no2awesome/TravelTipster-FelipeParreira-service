import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const addQuestionReducer = (state = [], { type, question }) => {
  if (type === 'ADD_QUESTION') {
    const newState = state.slice();
    return newState.push(question);
  }
  return state;
};

export default addQuestionReducer;
