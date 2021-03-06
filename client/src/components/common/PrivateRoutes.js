import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoutes = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest}
        render = {props =>
        auth.isAuthenticated
         ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )} />
)

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(PrivateRoutes))
 