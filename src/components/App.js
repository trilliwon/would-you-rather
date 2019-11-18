import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Nav from './Nav'
import SignIn from './SignIn'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './Leaderboard';
import NoMatch from './NoMatch'

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
                  <Route path='/questions/bad_id' component={NoMatch} />
                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/leaderboard' component={LeaderBoard} />
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
