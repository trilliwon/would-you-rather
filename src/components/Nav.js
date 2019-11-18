import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
    }

    render() {
        
        const { name, avatarURL } = this.props

        if (name === null || avatarURL === null) {
            return <p> SignIn Required </p>
        }

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'> New Question </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'> Leader Board </NavLink>
                    </li>
                </ul>
                <div className='profile'>
                    <p>Hello, {name}</p>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <button className='logout' onClick={this.handleLogout}>Log Out</button>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    const name = users[authedUser].name
    const avatarURL = users[authedUser].avatarURL
    return {
        name,
        avatarURL
    }
}

export default connect(mapStateToProps)(Nav)