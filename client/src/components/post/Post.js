import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import PostItem from '../posts/PostItem'
import { getPost } from '../../actions/postActions'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class Post extends Component {

    componentDidMount(){
        this.props.getPost(this.props.match.params.id)
    }
    
    render() {

        const { post, loading } = this.props.post;

        let postContent;
        if(post===null || Object.keys(post).length===0 || loading){
            postContent = <Spinner />
        }else{
            postContent = (<div>
                <PostItem post={post} showActions={false} />
                <CommentForm post_id={post._id} />
                <CommentFeed comment={post.comment} postId={post._id} />
            </div>)
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
                        </div>
                    </div>
                </div>
                {postContent}
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    post: state.post 
})

export default connect(mapStateToProps, { getPost })(Post) 