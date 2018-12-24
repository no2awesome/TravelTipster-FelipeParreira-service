import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const deleteQuestionReducer = (state = [], { type, question }) => {
  if (type === 'DELETE_QUESTION') {
    const newState = state.slice();
    for (let i = 0; i < newState.length; i += 1) {
      if (newState[i].QuestionID === question.QuestionID) {
        newState.splice(i, 1);
        break;
      }
    }
    return newState.push(question);
  }
  return state;
};

export default deleteQuestionReducer;
