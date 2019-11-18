import { 
    saveQuestionAnswer, 
    saveQuestion 
} from '../utils/api'
import { addAnswerToUser, addNewQuestionToUser } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'
export const SAVE_NEW_QUESTION = 'SAVE_NEW_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function saveNewQuestion(question) {
    return {
        type: SAVE_NEW_QUESTION,
        question
    }
}

export function handleSaveNewQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author
        })
        .then((question) => {
            dispatch(addNewQuestionToUser(author, question.id))
            dispatch(saveNewQuestion(question))
        })
        .then(() => dispatch(hideLoading()))
    }
}

export function addAnswerToQuestion(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authedUser,
        qid,
        answer,
    }
}

export function handleSaveQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        dispatch(addAnswerToUser(authedUser, qid, answer))
        dispatch(addAnswerToQuestion(authedUser, qid, answer))

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(() => dispatch(hideLoading()))
    }
}