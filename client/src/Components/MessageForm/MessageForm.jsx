import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './MessageForm.css';
import genStyles from '../App/App.css';

const MessageForm = (props) => {
  const btnStyles = `${genStyles['btn-primary']} ${genStyles.big} ${styles.submit} ${styles.large}`;
  const { user } = props;

  return (
    <div>
      <div onClick={props.closeForm} className={styles.backGround}>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleDiv}>Send message to {user.Username}</div>
          <div onClick={props.closeForm} className={styles.wdwIconDiv}><i className={`${styles.wdwIconStyle} fa fa-times`}></i></div>
        </div>
        <div className={styles.body}>
          <div>
            <div className={styles.fromTitleContainer}>From</div>
            <div className={styles.fromContainer}>
              <div className={styles.miniProfileContainer}>
                <img className={styles.image} src={props.currentUser.ThumbnailURL} />
                <div className={styles.username}>{props.currentUser.Username}</div>
              </div>
              <div><i className={`${styles.arrowIconStyle} fa fa-angle-down`}></i></div>
            </div>
          </div>
          <div>
            <h4>Subject</h4>
            <textarea className={styles.subjectInput} placeholder="Enter Subject"></textarea>
          </div>
          <div>
            <h4>Message</h4>
            <textarea className={styles.messageInput} placeholder="Enter Message"></textarea>
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={props.closeForm} className={btnStyles}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
