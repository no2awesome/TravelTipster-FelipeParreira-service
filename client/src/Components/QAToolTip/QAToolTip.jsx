import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './QAToolTip.css';

const QAToolTip = (props) => {
  const { message } = props;

  return (
    <div className={styles.container}>
      <div className={styles.dummy}></div>
      <div className={styles['arrow-left']}></div>
      <div className={styles.msgContainer}>{message}</div>
    </div>
  );
};

export default QAToolTip;
