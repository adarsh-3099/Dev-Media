import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike, addUnLike } from '../../actions/postActions'

class PostItem extends Component {

    onDeleteClick(id){
        console.log(id)
        this.props.deletePost(id)
    }


    OnClickLike(id){
        this.props.addLike(id)
    }

    OnClickUnLike(id){
        this.props.addUnLike(id)
    }

    render() {

        const { post, auth, showActions } = this.props;
       

        return (
            <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img className="rounded-circle d-none d-md-block" src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text}</p>
                {
                    showActions ? (
                        <span><button onClick={this.OnClickLike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-info fas fa-thumbs-up" />
                    <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button onClick={this.OnClickUnLike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-info fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                </Link>
                {post.user === auth.user.id ? (
                    <button type="button" onClick={this.onDeleteClick.bind(this, post._id)} className="btn btn-danger">
                        <i className="fas fa-times" />
                    </button>
                ) : null}
                   </span> ) : null
                }
              </div>
            </div>
          </div>
          
        )
    }
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    addUnLike: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, addUnLike })(PostItem)