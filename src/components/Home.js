import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tabs, Tab } from 'react-bootstrap'

class Home extends Component {
    render() {
        return (
            <div className='container'>
                <Tabs defaultActiveKey='unanswered' className='tab-answer'>
                    <Tab eventKey='unanswered' title="Unanswered Question">
                        <ul className='dashboard-list'>
                            {this.props.unansweredQuestionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id} />
                                </li>
                            ))}
                        </ul>
                    </Tab>
                    <Tab eventKey='answered' title="Answered Question">
                        <ul className='dashboard-list'>
                            {this.props.answeredQuestionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id} />
                                </li>
                            ))}
                        </ul>

                    </Tab>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }) {
    const answeredQuestionIds = authedUser !== null ? Object.keys(users[authedUser].answers) : []
    const unansweredQuestionIds = Object.keys(questions).filter((id) => !answeredQuestionIds.includes(id))
    return {
        unansweredQuestionIds,
        answeredQuestionIds
    }
}

export default connect(mapStateToProps)(Home)