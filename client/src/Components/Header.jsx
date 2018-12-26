import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Radium from 'radium'; // eslint-disable-line no-unused-vars
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
    const titleStyle = {
      color: '#000a12',
      fontWeight: 700,
      fontFamily: 'Arial',
      fontSize: '28px',
    };

    const containerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
    };

    const blockStyle = {
      padding: '0 0 18px',
      borderBottom: '1px solid #e5e5e5',
      width: '850px',
      paddingRight: '35px',
      paddingLeft: '35px',
    };

    return (
      <div style={blockStyle}>
        <div style={containerStyle}>
          <div style={titleStyle}>Questions & Answers</div>
          <button className="btn-primary big" onClick={this.showQuestionForm}>Ask a question</button>
        </div>
        <a href="#">See all {this.props.questions.length} questions</a>
        {this.state.showQuestionForm
          ? <QuestionForm hideQuestionForm={this.hideQuestionForm}
          submitQuestion={this.props.submitQuestion} currentUser={this.props.currentUser} />
          : null
        }
      </div>
    );
  }
}

export default Header;
