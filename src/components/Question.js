import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {

    handleViewPoll = (e) => {
        e.preventDefault()
        // TODO: go to question result view or question vote view
    }

    render() {
        const { avatarURL, name, question } = this.props
        return (
            <div className='question'>
                <div className='question-avatar'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <p>{this.props.name} asks: </p>
                </div>
                <hr />
                <div className='question-info'>
                    <div>
                        <span>...{question.optionOne.text}...</span>
                        <button className='view-poll' onClick={this.handleViewPoll}> View Poll </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const user = users[question.author]

    return {
        avatarURL: user.avatarURL,
        name: user.name,
        question,
    }
}

export default connect(mapStateToProps)(Question)