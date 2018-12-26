import Redux from 'redux'; // eslint-disable-line no-unused-vars,import/no-unresolved

const questionsReducer = (state = [], { type, question, questions }) => {
  if (type === 'CHANGE_QUESTION_LIST') {
    const newState = questions;
    return newState;
  }

  if (type === 'ADD_QUESTION') {
    const newState = state.slice();
    return newState.push(question);
  }

  if (type === 'DELETE_QUESTION') {
    const newState = state.slice();
    for (let i = 0; i < newState.length; i += 1) {
      if (newState[i].QuestionID === question.QuestionID) {
        newState.splice(i, 1);
        break;
      }
    }
    return newState;
  }

  return state;
};

export default questionsReducer;
