import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextArea from '../common/TextArea'
import { addComment } from '../../actions/postActions'

class CommentForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            text: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }
    
    onSubmit(e){
        e.preventDefault();

        const { user } = this.props.auth;
        const { post_id } = this.props

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }

        this.props.addComment(post_id, newComment)
        this.setState({text:""})
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Write Your Comment
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextArea
                        placeholder="Reply to Post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                    />
                  </div>
                  <button onClick={this.onSubmit.bind(this)} type="submit" className="btn btn-dark">comment</button>
                </form>
              </div>
              </div>
              </div>
        )
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    post_id: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps,{ addComment })(CommentForm)