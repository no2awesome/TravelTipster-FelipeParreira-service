import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './VoteToolTip.css';

const VoteToolTip = (props) => {
  const { message } = props;
  return (
    <div className={styles.container}>
      <div className={styles.msgContainer}>{message}</div>
      <div className={styles['arrow-right']}></div>
    </div>
  );
};

export default VoteToolTip;
