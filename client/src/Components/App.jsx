import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import QuestionList from './QuestionList.jsx'; // eslint-disable-line no-unused-vars

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control"/>
        <QuestionList questions={this.state.questions} hotelId={4}/>
      </div>);
  }
}

export default App;
