import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  newQuestion,
  modifyQuestion,
  removeAllQuestions,
  sortAllQuestions,
  deleteQuestion } from '../../actions/questions'
import CreatedQuestions from './CreatedQuestions'
import QuestionAnswerForm from './QuestionAnswerForm'
import { Typography, Grid } from '@material-ui/core'
import uniqueId from 'lodash.uniqueid'

class QuestionAnswerContainer extends Component {
  state = {
    id: null,
    question: "",
    answer: "",
    errorQuestion: false,
    errorAnswer: false,
    editQuestion: false,
    questionDelay: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.name === 'questionDelay' ?  event.target.checked : event.target.value
    })
  }

  handleValidation = () => {
    const error = {
      question: false,
      answer: false
    }
    let hasError = false

    if (this.state.question === '') {
      error.question = true
      hasError = true
    }
    if (this.state.answer === '') {
      error.answer = true
      hasError = true
    }
    this.setState({
      errorQuestion: error.question,
      errorAnswer: error.answer
    })

    return hasError
  }

  handleResetForm = () => {
    this.setState({
      id: null,
      question: "",
      answer: "",
      errorQuestion: false,
      errorAnswer: false,
      editQuestion: false,
      questionDelay: false
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const checkValidationError = this.handleValidation()
    if (!checkValidationError) {
      if (this.state.editQuestion) {

        // editing question
        const QAEditData = {
          id: this.state.id,
          question: this.state.question,
          answer: this.state.answer
        }
        
        if (this.state.questionDelay) {
          setTimeout( async () => {
            await this.props.modifyQuestion(QAEditData)
          }, 5000)
        } else {
          await this.props.modifyQuestion(QAEditData)
        }

        this.handleResetForm()

      } else {

        // creating new question
        const QAData = {
          id: uniqueId(),
          question: this.state.question,
          answer: this.state.answer
        }

        if (this.state.questionDelay) {
          setTimeout( async () => {
            await this.props.newQuestion(QAData)
          }, 5000)
        } else {
          await this.props.newQuestion(QAData)
        }
        this.handleResetForm()
      }
    }
  }
  
  handleDeleteQuestions = async (event) => {
    event.preventDefault()
    await this.props.removeAllQuestions()
    this.handleResetForm()
  }

  handleRemoveQuestion = async (questionId) => {
    await this.props.deleteQuestion(questionId)
    if (this.state.id === questionId) {
      this.handleResetForm()
    }
  }

  handleSortQuestions = async () => {
    await this.props.sortAllQuestions()
  }

  handleEditQuestion = (data) => {
    this.setState({
      editQuestion: true,
      id: data.id,
      question: data.question,
      answer: data.answer,
    })
  }

  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={10} style={{ textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginTop: "20px" }}>
              The Awesome QA Tool
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Feel free to create your own questions!
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <CreatedQuestions
              questions={this.props.questions}
              handleEditQuestion={this.handleEditQuestion}
              handleRemoveQuestion={this.handleRemoveQuestion}
              handleRemoveQuestions={this.handleDeleteQuestions}
              handleSortQuestions={this.handleSortQuestions} />
            
            <QuestionAnswerForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              questionDelay={this.state.questionDelay}
              editQuestion={this.state.editQuestion}
              answer={this.state.answer}
              question={this.state.question}
              errorAnswer={this.state.errorAnswer}
              errorQuestion={this.state.errorQuestion} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions
  }
}

const mapDispatchToProps = {
  newQuestion,
  removeAllQuestions,
  sortAllQuestions,
  deleteQuestion,
  modifyQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswerContainer)
