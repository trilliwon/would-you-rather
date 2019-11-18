import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class QuestionVote extends Component {
    state = {
        option: 'optionOne'
    }

    handleOptionChange = (e) => {
        const option = e.target.value

        this.setState(() => ({
            option
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { handleVoteSubmit } = this.props
        handleVoteSubmit(this.state.option)
        this.setState(() => ({
            option: this.state.option,
            disabled: 'disabled'
        }))
    }

    render() {
        const { avatarURL, name, question, badPath } = this.props
        if (badPath) {
            return <Redirect to="/questions/bad_id" />;
        }
        const { optionOne, optionTwo } = question

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
                        <div className='radio-container'>
                            <div className='radio'>
                                <label>
                                    <input
                                        type='radio'
                                        value='optionOne'
                                        checked={this.state.option === 'optionOne'}
                                        onChange={this.handleOptionChange}
                                    />
                                    {optionOne.text}
                                </label>
                            </div>
                            <div className='radio'>
                                <label>
                                    <input
                                        type='radio'
                                        value='optionTwo'
                                        checked={this.state.option === 'optionTwo'}
                                        onChange={this.handleOptionChange} />
                                    {optionTwo.text}
                                </label>
                            </div>
                        </div>
                        <button className='view-poll' onClick={this.handleSubmit} >Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    if (question === undefined) {
        return {
            badPath: true
        }
    }
    const avatarURL = users[question.author].avatarURL
    const name = users[question.author].name
    return {
        avatarURL,
        name,
        question
    }
}

export default connect(mapStateToProps)(QuestionVote)