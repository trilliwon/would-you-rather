import React, { Component } from 'react'

class User extends Component {
    render() {
        const { user, medal } = this.props
        const { name, avatarURL, asks, answers, score } = user
        const { symbol, label } = medal
        return (
            <div className='user-info'>
                <span className='medal-sign' role='img' aria-label={label}>{symbol}</span>
                <div className='avatar'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                </div>
                <div className='user-info-content'>
                    <h3>{name}</h3>
                    <div className='description'>
                        <p>Answered questions:</p>
                        <p>{answers}</p>
                    </div>
                    <div className='divider'></div>
                    <div className='description'>
                        <p>Created questions:</p>
                        <p>{asks}</p>
                    </div>
                </div>
                <div className='score-content'>
                    <p className='score-description'>Score</p>
                    <p className='score-box'>{score}</p>
                </div>
            </div>
        )
    }
}

export default User