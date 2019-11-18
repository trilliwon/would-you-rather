import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {
    render() {
        const medals = [
            {'symbol': '🥇', 'label': 'gold'}, 
            {'symbol': '🥈', 'label': 'silver'}, 
            {'symbol': '🥉', 'label': 'bronze'}
        ]
        return (
            <div className='leaderboard'>
                <ul>
                    {this.props.users.map((user, index) => (
                        <li key={user.id}>
                            <User user={user} medal={index < 3 && medals[index]} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const formatedUsers = Object.keys(users).map((userId) => {
        const user = users[userId]
        const asks = (user.questions ? user.questions.length : 0)
        const answers = Object.keys(user.answers).length
        const formated = {
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            asks: asks,
            answers: answers,
            score: asks + answers
        }
        return formated
    }).sort((a, b) => b.score - a.score)

    return {
        users: formatedUsers
    }
}

export default connect(mapStateToProps)(LeaderBoard)