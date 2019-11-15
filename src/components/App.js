import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Nav from './Nav'
import SignIn from './SignIn'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Router>
            <div className='container'>
              {this.props.authedUser === null
                ? <SignIn />
                : <div>
                  <Nav />
                  <Route path='/' exact component={Home} />
                </div>}
            </div>
          </Router>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(App);
