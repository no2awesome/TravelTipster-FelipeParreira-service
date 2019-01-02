import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './VoteToolTip.css';

const VoteToolTip = (props) => {
  const { message } = props;
  return (
    <div className={`${styles.container} tool-tip`}>
      <div className={`${styles.msgContainer} message`}>{message}</div>
      <div className={`${styles['arrow-right']} arrow-right`}></div>
      <div className={`${styles.dummy} dummy`}></div>
    </div>
  );
};

export default VoteToolTip;
