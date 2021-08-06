import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Register.css'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authAction'
import TextField from '../common/TextField'

class Register extends Component {
    
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    onChange (e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser)

        // axios.post('/api/users/register',newUser)
        // .then(result => console.log(result.data))
        // .catch(err => this.setState({errors: err.response.data}))

        this.props.registerUser(newUser, this.props.history)

    }

    render() {

        const { errors } = this.state;

        return (
            <div>
                <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto"> 
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevConnector account</p>
                    <form onSubmit={this.onSubmit}>
                        <TextField 
                            placeholder="Name"
                            name="name"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                        />

                        <TextField 
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                        />

                        <TextField 
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                        />

                        <TextField 
                            placeholder="Confirm Password"
                            name="password2"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                        />

                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>

            </div>
        )
    }
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

// this comes from reducers/index
const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));