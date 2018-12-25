import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Answer from './Answer.jsx'; // eslint-disable-line no-unused-vars
import AnswerForm from './AnswerForm.jsx'; // eslint-disable-line no-unused-vars

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswerForm: false,
    };

    this.showAnswerForm = this.showAnswerForm.bind(this);
    this.hideAnswerForm = this.hideAnswerForm.bind(this);
  }

  showAnswerForm() {
    this.setState({
      showAnswerForm: true,
    });
  }

  hideAnswerForm() {
    this.setState({
      showAnswerForm: false,
    });
  }

  render() {
    const { answers, users } = this.props;

    return (
      <div>
        <button onClick={this.showAnswerForm}>Answer</button>
        <button>See all {answers.length} answers</button>
        {this.state.showAnswerForm
          ? <AnswerForm hideAnswerForm={this.hideAnswerForm}
          submitAnswer={this.props.submitAnswer} questionID={this.props.questionID} />
          : null
        }
        <ul>
          {answers ? answers.map((answer, index) => (
              <Answer key={answer.id} answer={answer} user={users[index]}
              voteAnswer={this.props.voteAnswer} />
          )) : null}
        </ul>
      </div>
    );
  }
}

export default AnswerList;
