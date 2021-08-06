import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from "./types";

// Get current profile
export const getCurrentProfile = () => (dispatch) =>{
    dispatch(setProfileLoading())
    axios.get('/api/profile')
    .then(res =>{
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }) 
}

// Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) =>{
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
    .then(res =>{
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    }) 
}

// Create Profile
export const createProfile = (profile,history) => (dispatch) =>{
    axios.post('/api/profile', profile)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Profile loading
export const setProfileLoading = () =>{
    return {
        type: PROFILE_LOADING,
    }
}

// Clear Profile
export const clearCurrentProfile = () =>{
    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}

// Add experience 
export const addExperience = (exp,history) => (dispatch) =>{
    axios.post('/api/profile/experience', exp)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Add Education 
export const addEducation = (edu,history) => (dispatch) =>{
    axios.post('/api/profile/education', edu)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}


// Delete experience 
export const deleteExperience = (id) => (dispatch) =>{
    axios.delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}


// Delete Education
export const deleteEducation = (id) => (dispatch) =>{
    axios.delete(`/api/profile/education/${id}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Get Profiles
export const getProfiles = () => (dispatch) =>{
    dispatch(setProfileLoading())
    axios.get(`/api/profile/all`)
    .then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: null
    }))
}

// Delete Profile and Account
export const deleteAccount = () => (dispatch) =>{
    if(window.confirm('Are You Sure??')){
        axios.delete('/api/profile')
        .then(res => dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        }))
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    }
}
