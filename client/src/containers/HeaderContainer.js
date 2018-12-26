import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Header from '../Components/Header.jsx';
import addQuestion from '../actions/addQuestion';

const mapStateToProps = questions => ({
  questions,
});

const mapDispatchToProps = {
  handleAddQuestionClick: addQuestion,
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
