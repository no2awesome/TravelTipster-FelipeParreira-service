import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styles from './MessageForm.css';
import genStyles from '../App/App.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialState;

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
  }

  handleMessageChange(e) {
    this.setState({
      messageContent: e.target.value,
    });
  }

  handleSubjectChange(e) {
    this.setState({
      subjectContent: e.target.value,
    });
  }


  render() {
    const btnStyles = `${genStyles['btn-primary']} ${genStyles.big} ${styles.submit} ${styles.large}`;
    const { user } = this.props;
    const userID = user.ProfileURL.split('/')[4];

    return (
    <div>
      <div onClick={() => this.props.closeForm(this.state)} className={`background ${styles.backGround}`}>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleDiv}>Send message to {user.Username}</div>
          <div onClick={() => this.props.closeForm(this.state)} className={styles.wdwIconDiv}><i className={`fa fa-times ${styles.wdwIconStyle}`}></i></div>
        </div>
        <div className={styles.body}>
          <div>
            <div className={styles.fromTitleContainer}>From</div>
            <div className={styles.fromContainer}>
              <div className={`mini-profile ${styles.miniProfileContainer}`}>
                <img className={styles.image} src={this.props.currentUser.ThumbnailURL} />
                <div className={styles.username}>{this.props.currentUser.Username}</div>
              </div>
              <div><i className={`${styles.arrowIconStyle} fa fa-angle-down`}></i></div>
            </div>
          </div>
          <div>
            <h4>Subject</h4>
            <textarea value={this.state.subjectContent}
            onChange={this.handleSubjectChange} className={`subject-input ${styles.subjectInput}`} placeholder="Enter Subject"></textarea>
          </div>
          <div>
            <h4>Message</h4>
            <textarea value={this.state.messageContent} onChange={this.handleMessageChange} className={`message-input ${styles.messageInput}`} placeholder="Enter Message"></textarea>
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={() => this.props.closeForm(this.state, true, userID)}
          className={`submit-message ${btnStyles}`}>Send Message</button>
        </div>
      </div>
    </div>
    );
  }
}

export default MessageForm;
