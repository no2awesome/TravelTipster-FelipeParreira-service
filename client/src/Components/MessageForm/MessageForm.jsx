import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './MessageForm.css';
import genStyles from '../App/App.css';

const MessageForm = (props) => {
  const btnStyles = `${genStyles['btn-primary']} ${genStyles.big} ${styles.submit} ${styles.large}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleDiv}>Send message to [USER]</div>
        <div className={styles.wdwIconDiv}><i className={`${styles.wdwIconStyle} fa fa-times`}></i></div>
      </div>
      <div className={styles.body}>
        <div>
          <div className={styles.fromTitleContainer}>From</div>
          <div className={styles.fromContainer}>
            <div className={styles.miniProfileContainer}>
              <div className={styles.image}></div>
              <div className={styles.username}>Felipe P</div>
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
        <button className={btnStyles}>Send Message</button>
      </div>
    </div>
  );
};

export default MessageForm;
