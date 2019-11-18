import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {

    toQuestionDetail = (e, id) => {
        e.preventDefault()
        this.props.history(`/question/${id}`)
    }

    render() {
        const { isAnswered, user, question } = this.props
        const { name, avatarURL } = user;

        return (
            <div className='question'>
                <div className='header'>
                    <p>{name} asks: </p>
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
                        <h5 className='would-you-rather'>Would you rather</h5>
                        <p>...{question.optionOne.text}...</p>
                        <Link to={`/question/${question.id}`} className={isAnswered ? 'results' : 'view-poll'}> { isAnswered ? 'Results' : 'View Poll'} </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const user = users[question.author]
    const isAnswered = Object.keys(users[authedUser].answers).includes(id)

    return {
        isAnswered,
        user,
        question,
    }
}

export default withRouter(connect(mapStateToProps)(Question))