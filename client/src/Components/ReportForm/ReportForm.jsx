import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './ReportForm.css';
import genStyles from '../App/App.css';

const ReportForm = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Report a Problem</div>
        <div><i className={`${styles.wdwIconStyle} fa fa-times`}></i></div>
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <h4>Why are you reporting this?
          <br />
          Add specific details about why you
          feel this question or answer is inappropriate.&nbsp;
          <span className={styles.italic}>(optional)</span></h4>
        </div>
        <textarea className={styles.textInput}></textarea>
        <div className={styles.footNote}>50 characters minimum, 500 maximum</div>
      </div>
      <div className={styles.footer}>
        <button
        className={`${genStyles['btn-primary']} ${genStyles.big} ${styles.submit}`}>Submit</button>
      </div>
    </div>
  );
};

export default ReportForm;
