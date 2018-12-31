import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './NavBar.css';
import genStyles from '../App/App.css';

const NavBar = (props) => {
  const { currentPage, numOfQuestions, handlePageClick } = props;
  const numOfPages = Math.ceil(numOfQuestions / 2);
  const pages = [1];
  if (currentPage === 0 || currentPage === 1) {
    pages.push(2, '...');
  } else if (currentPage >= numOfPages - 2) {
    pages.push('...', numOfPages - 1);
  } else {
    pages.push('...', currentPage + 1, '...');
  }

  pages.push(numOfPages);

  const handleNextClick = (pageNum) => {
    if (pageNum < numOfPages - 1) {
      handlePageClick(currentPage + 1);
    }
  };
  const handlePreviousClick = (pageNum) => {
    if (pageNum > 0) {
      handlePageClick(currentPage - 1);
    }
  };

  let previousBtnClasses = `${genStyles['btn-secondary']} ${genStyles.big}`;
  let nextBtnClasses = `${genStyles['btn-primary']} ${genStyles.big}`;
  if (currentPage === 0) {
    previousBtnClasses += ` ${genStyles.disabled}`;
  }
  if (currentPage + 1 === numOfPages) {
    nextBtnClasses += ` ${genStyles.disabled}`;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => handlePreviousClick(currentPage)}
      className={`previous ${previousBtnClasses}`}>Previous</button>
      <div className={`${styles.pagContainer} pagination-list`}>
        {pages.map((page, index) => {
          let style = page === currentPage + 1 ? styles.numMod : styles.num;
          let handleClick = () => handlePageClick(page - 1);
          if (page === '...') {
            style = styles.reticences;
            handleClick = () => {};
          }

          return (<div onClick={handleClick}
          key={`${page}${index}`} className={`page-num ${style}`}>{page}</div>);
        })}
      </div>
      <button onClick={() => handleNextClick(currentPage)} className={`next ${nextBtnClasses}`}>Next</button>
    </div>
  );
};

export default NavBar;
