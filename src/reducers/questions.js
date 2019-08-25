import {
  NEW_QUESTION,
  REMOVE_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTIONS,
  SORT_QUESTIONS } from '../actions/questions'

export default function (state = [], action = {}) {
  switch (action.type) {
    case NEW_QUESTION:
      return [action.payload, ...state]
    case DELETE_QUESTIONS:
      return state = []
    case SORT_QUESTIONS:
      const sortState = state.slice().sort((a, b) => {
        const textA = a.question.toUpperCase()
        const textB = b.question.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
      return state = sortState
    case EDIT_QUESTION:
      const editData = action.payload
      const updatedQuestion = state.map(question => question.id === editData.id ? editData : question)
      return state = updatedQuestion
    case REMOVE_QUESTION:
      const questionId = action.payload
      const filter = state.filter(({ id }) => id !== questionId)
      return state = filter
    default:
      return state
  }
}