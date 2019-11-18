import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleSaveNewQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { optionOneText, optionTwoText } = this.state
        dispatch(handleSaveNewQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        }))
    }

    handleOptionOneTextChange = (e) => {
        const optionOneText = e.target.value
        this.setState(() => ({
            optionOneText
        }))
    }

    handleOptionTwoTextChange = (e) => {
        const optionTwoText = e.target.value
        this.setState(() => ({
            optionTwoText
        }))
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state
        const disabled = (optionOneText === '' || optionTwoText === '' || optionOneText === optionTwoText)
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className='question'>
                <div className='header'>
                    <h5> Create a New Poll </h5>
                </div>
                <div className='question-content'>
                    <div className='input-forms'>
                        <p className='top-description'>Complete the question: </p>
                        <h3 className='would-you-rather'>Would you rather ... </h3>
                        <Form.Group controlId="formEnterOption">
                            <Form.Control type="text" placeholder="Enter Option One Text Here" value={this.state.optionOneText} onChange={this.handleOptionOneTextChange} />
                        </Form.Group>
                        <div className='question-divider'>
                            <div className='divider' />
                            <h5>OR</h5>
                            <div className='divider' />
                        </div>
                        <Form.Group controlId="formEnterOption">
                            <Form.Control type="text" placeholder="Enter Option Two Text Here" value={this.state.optionTwoText} onChange={this.handleOptionTwoTextChange} />
                        </Form.Group>

                        <button className='view-poll' disabled={disabled} onClick={this.handleSubmit}> Submit </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(NewQuestion)