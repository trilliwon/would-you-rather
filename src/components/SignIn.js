import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {

    handleUserSelection = (e) => {
        const id = e.target.value
        const { dispatch } = this.props
        dispatch(setAuthedUser(id))
    }

    render() {
        const { users } = this.props
        return (
            <div className='signin'>
                <div>
                    <h2>Welcome to the Would You Rather App</h2>
                    <h4>Pease sign in to continue</h4>
                </div>
                <div className='container'>
                    <Form>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Sign In</Form.Label>
                            <Form.Control as="select" onChange={this.handleUserSelection}>
                                <option>Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.keys(users).map((id) => users[id])
    }
}

export default connect(mapStateToProps)(SignIn)