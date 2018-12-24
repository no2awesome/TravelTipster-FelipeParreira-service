import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import QuestionForm from './QuestionForm.jsx'; // eslint-disable-line no-unused-vars

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestionForm: false,
    };

    this.showQuestionForm = this.showQuestionForm.bind(this);
    this.hideQuestionForm = this.hideQuestionForm.bind(this);
  }

  showQuestionForm() {
    this.setState({
      showQuestionForm: true,
    });
  }

  hideQuestionForm() {
    this.setState({
      showQuestionForm: false,
    });
  }

  render() {
    const a = this.state;

    return (
      <div>
        <div>
          <div>Questions & Answers</div>
          <button onClick={this.showQuestionForm}>Ask a question</button>
        </div>
        <span>See all {this.props.questions.length} questions</span>
        {this.state.showQuestionForm
          ? <QuestionForm hideQuestionForm={this.hideQuestionForm} submitQuestion={this.props.submitQuestion} />
          : null
        }
      </div>
    );
  }
}

export default Header;
