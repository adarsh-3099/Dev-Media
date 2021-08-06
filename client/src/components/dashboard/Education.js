import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
    
    onClick(id){
        this.props.deleteEducation(id)
    }
    
    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td><Moment format="DD/MM/YYYY">{edu.from}</Moment> - <Moment format="DD/MM/YYYY">{edu.to ? edu.to : Date.now()}</Moment></td>
                <td><button onClick={this.onClick.bind(this,edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Education</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)