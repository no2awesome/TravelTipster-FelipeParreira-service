import React from 'react'; // eslint-disable-line no-unused-vars

const UserStats = (props) => {
  const { user } = props;
  const iconStyle = {
    fontSize: '12px',
    color: '#00a680',
  };

  const msgIconStyle = {
    ...iconStyle,
    fontSize: '14px',
  };

  const wdwIconStyle = {
    ...iconStyle,
    fontSize: '18px',
    float: 'right',
    position: 'absolute',
    left: '49.5%',
    top: '6.5%',
    cursor: 'pointer',
  };


  const userRankStyle = {
    fontSize: '15px',
    fontFamily: 'Arial,Tahoma,"Bitstream Vera Sans",sans-serif',
    color: '#333',
    fontWeight: '100',
  };

  const reviewStyle = {
    textTransform: 'uppercase',
    marginTop: '30px',
  };

  const containerStyle = {
    fontSize: '12px',
    color: '#4a4a4a',
    fontFamily: 'Arial,Tahoma,"Bitstream Vera Sans",sans-serif',
    border: '1px solid #e0e0e0',
    width: '410px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
    padding: '10px 36px',
    postion: 'relative',
  };

  const subSummary = {
    display: 'flex',
    flexDirection: 'column',
    height: '50px',
    justifyContent: 'flex-start',
  };

  const summary = {
    display: 'flex',
    width: '100%',
    marginBottom: '30px',
  };

  const msgBtn = {
    color: '#000a12',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    padding: '8px 16px',
    cursor: 'pointer',
    lineHeight: '18px',
    textAlign: 'center',
    fontSize: '13px',
    float: 'right',
  };

  const firstSumStyle = {
    marginRight: '150px',
  };

  const userHist = {
    marginBottom: '-6px',
  };

  const statsBar = {
    heigth: '12px',
    backgroundColor: '#e5e5e5',
    color: '#e5e5e5',
    width: '100%',
  };

  const filledBar = {
    heigth: '12px',
    backgroundColor: '#00a680',
    color: '#00a680',
    width: '100%',
  };

  const figure = {
    marginLeft: '4px',
  };

  const barTitle = {
    display: 'block',
    width: '60px',
    float: 'left',
  };

  const bar = {
    marginBottom: '10px',
  };

  const heading = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const userName = {
    color: '#069',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '20px',
    cursor: 'pointer',
  };

  const level = {
    backgroundColor: '#00a680',
    color: 'white',
    fontSize: '14px',
    display: 'inline-block',
    width: '16px',
    height: '16px',
    textAlign: 'center',
    borderRadius: '50%',
  };

  return (
    <div style={containerStyle}>
      <a style={userName}>april</a>
      <i className="fa fa-times" style={wdwIconStyle}></i>
      <div style={heading}>
        <p style={userRankStyle}>Level <span style={level}>{user.Ranking}</span> Contributor</p>
        <button style={msgBtn}><i className='far fa-envelope' style={msgIconStyle}></i> Send Message</button>
      </div>
      <p style={userHist}>Trip Advisor member since {user.SignUpDate.split('-')[0]}</p>
      <p>From {user.HomeCity}</p>
      <div style={summary}>
        <div style={subSummary}>
          <p className="top-sum" style={firstSumStyle}><i className='far fa-edit' style={iconStyle}></i> {user.Contributions} Contributions</p>
          <p style={firstSumStyle}><i className='fas fa-thumbs-up' style={iconStyle}></i> {user.HelpfulVotes} Helpful Votes</p>
        </div>
        <div style={subSummary}>
          <p className="top-sum"><i className='fas fa-globe' style={iconStyle}></i> {user.CitiesVisited} Cities Visited</p>
          <p><i className='fas fa-camera' style={iconStyle}></i> {user.Photos} Photos</p>
        </div>
      </div>
      <div>
        <h4 style={reviewStyle}>Review Distribution</h4>
        <div>
          <div style={bar}><span style={barTitle}>Excellent</span> <span style={statsBar}><span style={filledBar}>{'h'.repeat(0)}</span>{'h'.repeat(50)}</span> <span style={figure}>0</span></div>
          <div style={bar}><span style={barTitle}>Very good</span> <span style={statsBar}><span style={filledBar}>{'h'.repeat(10)}</span>{'h'.repeat(40)}</span> <span style={figure}>1</span></div>
          <div style={bar}><span style={barTitle}>Average</span> <span style={statsBar}><span style={filledBar}>{'h'.repeat(20)}</span>{'h'.repeat(30)}</span> <span style={figure}>2</span></div>
          <div style={bar}><span style={barTitle}>Poor</span><span style={statsBar}><span style={filledBar}>{'h'.repeat(10)}</span>{'h'.repeat(40)}</span> <span style={figure}>1</span></div>
          <div style={bar}><span style={barTitle}>Terrible</span><span style={statsBar}><span style={filledBar}>{'h'.repeat(10)}</span>{'h'.repeat(40)}</span> <span style={figure}>1</span></div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
