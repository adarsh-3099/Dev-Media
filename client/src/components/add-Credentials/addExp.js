import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profileActions'


class addExp extends Component {

    constructor(props){
        super(props)
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

        this.onCheck = this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }

    onSubmit(e){
        e.preventDefault();

        const exp = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(exp,this.props.history)

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.disabled
        })
    }

    render() {

        const { errors } = this.state

        return (
            <div className="add-exp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashbard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add Any Job Experience You Have</p>
                            <small className="d-block pb-3">* -- Required Fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextField
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextField
                                    placeholder="* Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextField
                                    placeholder="* Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From Date</h6>
                                <TextField
                                    placeholder="* from"
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextField
                                    placeholder="* to"
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input 
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                    />
                                    <label className="form-check-label" htmlFor="current">Current Job</label>
                                </div>
                                    <TextArea
                                        placeholder="Job Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        error={errors.description}
                                        info="Tell us about your Position"
                                    />
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

addExp.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, {addExperience} )(withRouter(addExp))