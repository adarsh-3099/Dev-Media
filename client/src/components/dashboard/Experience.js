import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
    
    onClick(id){
        this.props.deleteExperience(id)
    }
    
    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td><Moment format="DD/MM/YYYY">{exp.from}</Moment> - <Moment format="DD/MM/YYYY">{exp.to ? exp.to : Date.now()}</Moment></td>
                <td><button onClick={this.onClick.bind(this,exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Experience</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        {experience}
                    </thead>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)