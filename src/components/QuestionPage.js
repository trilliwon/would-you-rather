import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionResults from './QuestionResults'
import QuestionVote from './QuestionVote'
import { handleSaveQuestionAnswer } from '../actions/questions'

class QuestionPage extends Component {

    handleVoteSubmit = (selectedOption) => {
        const { dispatch, id } = this.props
        dispatch(handleSaveQuestionAnswer(id, selectedOption))
    }

    render() {
        const { id, isAnswered } = this.props;
        return (
            <div>
                {isAnswered
                    ? <QuestionResults id={id} />
                    : <QuestionVote id={id} handleVoteSubmit={this.handleVoteSubmit} />
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }, props) {
    const { id } = props.match.params
    const isAnswered = Object.keys(users[authedUser].answers).includes(id)
    return {
        id,
        isAnswered
    }
}

export default connect(mapStateToProps)(QuestionPage)