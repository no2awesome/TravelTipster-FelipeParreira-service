import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './UserStats.css';
import genStyles from '../App/App.css';

const UserStats = (props) => {
  const { user } = props;

  const excellent = user['ReviewDistribution.Excellent'];
  const veryGood = user['ReviewDistribution.VeryGood'];
  const average = user['ReviewDistribution.Average'];
  const poor = user['ReviewDistribution.Poor'];
  const terrible = user['ReviewDistribution.Terrible'];

  const total = excellent + veryGood + average + poor + terrible;

  // those are the equivalent values in terms of 50 units (eq. 100%)
  const excel = Math.round(50 * excellent / total);
  const vg = Math.round(50 * veryGood / total);
  const avg = Math.round(50 * average / total);
  const pr = Math.round(50 * poor / total);
  const tb = Math.round(50 * terrible / total);

  return (
    <div className={styles.containerStyle}>
      <div className={styles.dummy}></div>
      <div className={styles['arrow-left']}></div>
      <a className={styles.userName}>{user.Username}</a>
      <i onClick={props.toggleShowUserStats} className={`${styles.wdwIconStyle} fa fa-times`}></i>
      <div className={styles.heading}>
        <p className={styles.userRankStyle}>Level <span
        className={styles.level}>{user.Ranking}</span> Contributor</p>
        <button className={styles.msgBtn}><i className={`${styles.msgIconStyle} far fa-envelope`}></i> Send Message</button>
      </div>
      <p className={styles.userHist}>Trip Advisor member since {user.SignUpDate.split('-')[0]}</p>
      <p>From {user.HomeCity}</p>
      <div className={styles.summary}>
        <div className={styles.subSummary}>
          <p className={`${styles.firstSumStyle} ${genStyles['top-sum']}`}><i className={`${styles.iconStyle} far fa-edit`}></i> {user.Contributions} Contributions</p>
          <p className={styles.firstSumStyle}><i className={`${styles.iconStyle} fas fa-thumbs-up`}></i> {user.HelpfulVotes} Helpful Votes</p>
        </div>
        <div className={styles.subSummary}>
          <p className={genStyles['top-sum']}><i className={`${styles.iconStyle} fas fa-globe`}></i> {user.CitiesVisited} Cities Visited</p>
          <p><i className={`${styles.iconStyle} fas fa-camera`}></i> {user.Photos} Photos</p>
        </div>
      </div>
      <div>
        <h4 className={styles.reviewStyle}>Review Distribution</h4>
        <div>
          <div className={styles.bar}><span className={styles.barTitle}>Excellent</span> <span className={styles.statsBar}><span className={styles.filledBar}>{'h'.repeat(excel)}</span>{'h'.repeat(50 - excel)}</span> <span className={styles.figure}>{excellent}</span></div>
          <div className={styles.bar}><span className={styles.barTitle}>Very good</span> <span className={styles.statsBar}><span className={styles.filledBar}>{'h'.repeat(vg)}</span>{'h'.repeat(50 - vg)}</span> <span className={styles.figure}>{veryGood}</span></div>
          <div className={styles.bar}><span className={styles.barTitle}>Average</span> <span className={styles.statsBar}><span className={styles.filledBar}>{'h'.repeat(avg)}</span>{'h'.repeat(50 - avg)}</span> <span className={styles.figure}>{average}</span></div>
          <div className={styles.bar}><span className={styles.barTitle}>Poor</span><span className={styles.statsBar}><span className={styles.filledBar}>{'h'.repeat(pr)}</span>{'h'.repeat(50 - pr)}</span> <span className={styles.figure}>{poor}</span></div>
          <div className={styles.bar}><span className={styles.barTitle}>Terrible</span><span className={styles.statsBar}><span className={styles.filledBar}>{'h'.repeat(tb)}</span>{'h'.repeat(50 - tb)}</span> <span className={styles.figure}>{terrible}</span></div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
