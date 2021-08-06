import React, { Component } from 'react'
import isEmpty from '../../validation/is_empty';

class ProfileAbout extends Component {
    render() {

        const { profile } = this.props;

        return (
            <div className="row">
            <div className="col-md-12">
              <div className=" card-body bg-light mb-3">
                <h3 className="text-center text-info"></h3>
                <p className="lead">{
                    isEmpty(profile.bio) ?  null : (<span> {profile.bio}</span>)}

                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {
                        profile.skills.map((skill, idx) => (
                            <div className="p-3">
                                <i class="fa fa-check"></i>{skill}
                            </div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

        )
    }
}

export default ProfileAbout