import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'

class QuestionResults extends Component {
    render() {
        const {
            name,
            avatarURL,
            answered,
            optionOneText,
            optionTwoText,
            optionOneCount,
            optionTwoCount,
            totalAnswerCount } = this.props

        const optionOneNow = Math.floor(optionOneCount / totalAnswerCount * 100)
        const optionTwoNow = Math.floor(optionTwoCount / totalAnswerCount * 100)
        return (
            <div className='question'>
                <div className='header'>
                    <h5>Asked by {name} </h5>
                </div>
                <div className='question-content'>
                    <div className='avatar'>
                        <img
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                            className='avatar'
                        />
                    </div>
                    <hr />
                    <div className='info'>
                        <h5 className='would-you-rather'>Results:</h5>
                        <div className='result-container'>
                            <div className='detail'>
                                {answered === 'optionOne' && <div className='your-vote'>Your Vote </div>}
                                <p className='question-detail'> {optionOneText}</p>
                                <ProgressBar now={optionOneNow} label={`${optionOneNow}%`} />
                                <p className='question-desciption'>{optionOneCount} out of {totalAnswerCount} {totalAnswerCount === 1 ? 'vote' : 'votes'}</p>
                            </div>

                            <div className='detail'>
                                {answered === 'optionTwo' && <p className='your-vote'>Your Vote</p>}
                                <p className='question-detail'>{optionTwoText}</p>
                                <ProgressBar now={optionTwoNow} label={`${optionTwoNow}%`} />
                                <p className='question-desciption'>{optionTwoCount} out of {totalAnswerCount} {totalAnswerCount === 1 ? 'vote' : 'votes'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const name = users[question.author].name
    const avatarURL = users[question.author].avatarURL
    const answered = users[authedUser].answers[id]
    const optionOneText = question.optionOne.text
    const optionTwoText = question.optionTwo.text
    const optionOneCount = question.optionOne.votes.length
    const optionTwoCount = question.optionTwo.votes.length
    const totalAnswerCount = optionOneCount + optionTwoCount
    return {
        name,
        avatarURL,
        answered,
        optionOneText,
        optionTwoText,
        optionOneCount,
        optionTwoCount,
        totalAnswerCount
    }
}

export default connect(mapStateToProps)(QuestionResults)