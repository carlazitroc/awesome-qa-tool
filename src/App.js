import React, { Component } from 'react'
import './App.css';
import QuestionAnswerContainer from './components/QuestionAnswer/QuestionAnswerContainer';
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={QuestionAnswerContainer} />
      </Router>
    )
  }
}

export default App;
