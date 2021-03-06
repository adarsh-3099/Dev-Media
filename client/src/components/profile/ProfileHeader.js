import React, { Component } from 'react'
import isEmpty from '../../validation/is_empty';
import './ProfileHeader.css'

class ProfileHeader extends Component {
    render() {

        const { profile } = this.props;

        return (
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3" >
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.status} 
                  {isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
                  <p className="lead text-center"> 
                  {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                  
                  <p>
                      {isEmpty(profile.website) ? null : (
                          <a className="text-white p-2" href={profile.website} target="_blank">
                          website
                        </a>
                      )}

                      {isEmpty(profile.social && profile.social.twitter) ? null : (
                          <a className="text-white p-2" href={profile.social.twitter} target="_blank">
                          twitter
                        </a>
                      )}

                      {isEmpty(profile.social && profile.social.facebook) ? null : (
                          <a className="text-white p-2" href={profile.social.facebook} target="_blank">
                          facebook
                        </a>
                      )}
                      
                      {isEmpty(profile.social && profile.social.linkedin) ? null : (
                          <a className="text-white p-2" href={profile.social.linkedin} target="_blank">
                          linkedin
                        </a>
                      )}

                      {isEmpty(profile.social && profile.social.instagram) ? null : (
                          <a className="text-white p-2" href={profile.social.instagram} target="_blank">
                          instagram
                        </a>
                      )}
                  </p>
                </div>
                </div>
              </div>
            </div>

        )
    }
}

export default ProfileHeader