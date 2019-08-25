
export const NEW_QUESTION = 'NEW_QUESTION'
export const EDIT_QUESTION = 'EDIT_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const DELETE_QUESTIONS = 'DELETE_QUESTIONS'
export const SORT_QUESTIONS = 'SORT_QUESTIONS'

export function newQuestion(payload) {
	return {
		type: NEW_QUESTION,
		payload
	}
}

export function removeAllQuestions(payload) {
	return {
		type: DELETE_QUESTIONS,
		payload
	}
}

export function sortAllQuestions(payload) {
	return {
		type: SORT_QUESTIONS,
		payload
	}
}

export function modifyQuestion(payload) {
	return {
		type: EDIT_QUESTION,
		payload
	}
}

export function deleteQuestion(payload) {
	return {
		type: REMOVE_QUESTION,
		payload
	}
}