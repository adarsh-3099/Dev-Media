import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

class CommentFeed extends Component {
    render() {

        const { comment, postId } = this.props

        console.log('Comments--------------->>>>>>>>>>>>',comment)

        return (
            comment.map(cmnt =>(
                <CommentItem key={cmnt._id} comment={cmnt} postId={postId} />
            ))
        )
    }
}

CommentFeed.propTypes = {
    comment: PropTypes.array.isRequired
}

export default CommentFeed