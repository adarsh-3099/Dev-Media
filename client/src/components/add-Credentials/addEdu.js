import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import PropTypes from 'prop-types'
import { addEducation } from '../../actions/profileActions'


class addEdu extends Component {

    constructor(props){
        super(props)
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
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

        const edu = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addEducation(edu,this.props.history)

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
            <div className="add-edu">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashbard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add Any Education Experience You Have</p>
                            <small className="d-block pb-3">* -- Required Fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextField
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextField
                                    placeholder="* Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextField
                                    placeholder="* Field of Study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
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
                                    <label className="form-check-label" htmlFor="current">Current School</label>
                                </div>
                                    <TextArea
                                        placeholder="School Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        error={errors.description}
                                        info="Tell us about your experience"
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

addEdu.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, {addEducation} )(withRouter(addEdu))