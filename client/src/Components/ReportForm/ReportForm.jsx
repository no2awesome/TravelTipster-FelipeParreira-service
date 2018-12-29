import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styles from './ReportForm.css';
import genStyles from '../App/App.css';

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialState;

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  handleTextAreaChange(e) {
    const input = e.target.value;
    const inputLength = input.length;

    this.setState({
      reportContent: input,
      isInvalidInput: inputLength < 50 || inputLength > 500,
    });
  }

  render() {
    const { closeForm } = this.props;
    let footNoteStyles = `${styles.footNote}`;
    let textareaStyles = `${styles.textInput}`;
    let btnStyles = `${genStyles['btn-primary']} ${genStyles.big} ${styles.submit}`;
    if (this.state.isInvalidInput) {
      footNoteStyles += ` ${styles.invalidInput}`;
      textareaStyles += ` ${styles.invalidInput}`;
      btnStyles += ` ${genStyles.disabled}`;
    }
    console.log('state', this.state);
    if (this.state.reportContent.length === 0 && !this.state.isInvalidInput) {
      btnStyles += ` ${genStyles.disabled}`;
    }

    return (
      <div>
        <div className={styles.backGround} onClick={() => closeForm(this.state)}>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>Report a Problem</div>
            <div onClick={() => closeForm(this.state)} ><i className={`${styles.wdwIconStyle} fa fa-times`}></i></div>
          </div>
          <div className={styles.body}>
            <div className={styles.description}>
              <h4>Why are you reporting this?
              <br />
              Add specific details about why you
              feel this question or answer is inappropriate.&nbsp;
              <span className={styles.italic}>(optional)</span></h4>
            </div>
            <textarea value={this.state.reportContent}
            onChange={this.handleTextAreaChange} className={textareaStyles}></textarea>
            <div className={footNoteStyles}>50 characters minimum, 500 maximum</div>
          </div>
          <div className={styles.footer}>
            <button
            onClick={() => closeForm()}
            className={btnStyles}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportForm;
