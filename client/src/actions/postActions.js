import axios from 'axios'
import { DELETE_POST, GET_ERRORS, GET_POST, POST_LOADING } from './types'
import { ADD_POST, GET_POSTS } from './types'

// Add post
export const addPost = (postData) => (dispatch) =>{
    axios.post('/api/posts', postData)
    .then(res =>{
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// GET posts
export const getPosts = () => (dispatch) =>{
    dispatch(setPostLoading())
    axios.get('/api/posts')
    .then(res =>{
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    })
}

// GET post
export const getPost = (id) => (dispatch) =>{
    dispatch(setPostLoading())
    axios.get(`/api/posts/${id}`)
    .then(res =>{
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POST,
            payload: {}
        })
    })
}



// DELETE post
export const deletePost = (id) => (dispatch) =>{
    axios.delete(`/api/posts/${id}`)
    .then(res =>{
        dispatch({
            type: DELETE_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


// ADD Like
export const addLike = (id) => (dispatch) =>{
    axios.post(`/api/posts/like/${id}`)
    .then(res =>{
        dispatch(getPosts())
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// Remove Like
export const addUnLike = (id) => (dispatch) =>{
    axios.post(`/api/posts/unlike/${id}`)
    .then(res =>{
        dispatch(getPosts())
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// Set loading
export const setPostLoading = () => {
    return {
        type: POST_LOADING,
    }
}

// Add comment
export const addComment = (post_id, commentData) => (dispatch) =>{
    axios.post(`/api/posts/comment/${post_id}`, commentData)
    .then(res =>{
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}
