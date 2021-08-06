const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Profile Model
const Profile = require('../../models/Profile')

// Load User Model
const User = require('../../models/User')

const validateProfileInput = require('../../validation/profile')
const validateExperinceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// @route GET api/users/test
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.get('/test',(req,res) =>{
    res.json({
        msg: 'Profile Adarsh'
    })
})

// @route GET api/users
// @desc Get Current User Profile
// @access Private (As some routes need to be protected)
// Each routes will have these

router.get('/',passport.authenticate('jwt',{ session: false }),(req,res) =>{

    const errors = {}

    Profile.findOne({ user: req.user.id })
    .populate('user',['name', 'avatar'])
    .then((profile) => {
        if(!profile){
            errors.noprofile = 'There is no profile associated with the user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch((err) => res.status(404).json(err))
})

// @route GET api/users/profile/all
// @desc Get all profile
// @access Public (As some routes need to be protected)

router.get('/all',(req,res) =>{

    const errors = {}

    Profile.find()
    .populate('user',['name', 'avatar'])
    .then(profiles =>{
        if(!profiles){
            errors.noprofile = 'There is no profile associated with the user'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    })
    .catch(err => res.status(404).json({profile: 'There is No Profiles'}))
}) 

// @route GET api/users/profile/handle/:handle
// @desc Get Profile by handle
// @access Public (As some routes need to be protected)

router.get('/handle/:handle',(req,res)=>{
    
    const errors = {}

    Profile.findOne({ handle: req.params.handle })
    .populate('user',['name', 'avatar'])
    .then((profile) =>{
        if(!profile){
            errors.noprofile = 'There is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route POST api/users/profile/user/:user_id
// @desc Get Profile by handle
// @access Private (As some routes need to be protected)

router.get('/user/:user_id',(req,res)=>{
    
    const errors = {}

    Profile.findOne({ user: req.params.user_id })
    .populate('user',['name', 'avatar'])
    .then((profile) =>{
        console.log(req.params.user_id)
        if(!profile){
            errors.noprofile = 'There is no profile for this user'
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json({profile: 'There is No Profile for this user'}))
})

// @route POST api/profile
// @desc Create or Edit User Profile
// @access Private (As some routes need to be protected)
// Each routes will have these

router.post('/',passport.authenticate('jwt',{ session: false }),(req,res) =>{

    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid){
        return res.status(404).json(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
    
    // split in arrya
    if(typeof req.body.skills !== "undefined"){
        profileFields.skills = req.body.skills.split(',')
    }

    // Social 
    profileFields.social = {}

    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({ user: req.user.id })
    .then((profile) => {
        if(profile){
            // Update
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            .then((profile) => res.json(profile))
        }else{
            // Create

            // Check if handle exists
            Profile.findOne({ handle: req.body.handle })
            .then((profile) =>{
                if(profile){
                    errors.handle = "That Handle Already Exists"
                    res.status(404).json(errors)
                }else{
                    new Profile(profileFields).save().then((profile) => res.json(profile))
                }
            })
        }
    })
})

// @route POST api/users/profile/experience
// @desc Add exp. for the user
// @access Private (As some routes need to be protected)

router.post('/experience',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    
    const { errors, isValid } = validateExperinceInput(req.body)

    if(!isValid){
        res.status(404).json(errors)
    }

    Profile.findOne({ user:req.user.id })
    .then((profile) =>{
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description 
        }

        // Add to exp array
        profile.experience.unshift(newExp)

        profile.save().then(profile => res.json(profile))
    })
    .catch(err => console.log(err))
})

router.post('/education',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    
    const { errors, isValid } = validateEducationInput(req.body)

    if(!isValid){
        res.status(404).json(errors)
    }

    Profile.findOne({ user:req.user.id })
    .then((profile) =>{
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description 
        }

        // Add to exp array
        profile.education.unshift(newEdu)

        profile.save().then(profile => res.json(profile))
    })
    .catch(err => console.log(err))
})
// @route POST api/users/profile/experience/:exp_id
// @desc Delete exp. for the user
// @access Private (As some routes need to be protected)

router.delete('/experience/:exp_id',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    

    Profile.findOne({ user:req.user.id })
    .then((profile) =>{
        // Get remove index
        const remove_idx = profile.experience.map((item) => item.id)
        .indexOf(req.params.exp_id)

        // splice out the item
        console.log(remove_idx)
        profile.experience.splice(remove_idx,1)

        profile.save().then((profile) => res.json(profile))
    })
    .catch((err) => res.json(err)) 
})

// @route POST api/users/profile/education/:edu_id
// @desc Delete exp. for the user
// @access Private (As some routes need to be protected)

router.delete('/education/:edu_id',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    
    Profile.findOne({ user:req.user.id })
    .then((profile) =>{
        // Get remove index
        const remove_idx = profile.education.map((item) => item.id)
        .indexOf(req.params.edu_id)

        console.log(remove_idx)

        // splice out the item
        profile.education.splice(remove_idx,1)

        profile.save().then((profile) => res.json(profile))
    })
    .catch((err) => res.json(err)) 
})

// @route POST api/users/profile/
// @desc Delete user and profile
// @access Private (As some routes need to be protected)

router.delete('/',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() =>{
        User.findOneAndRemove({ _id: req.user.id })
        .then((result) => res.json({ success: 'User deleted' }))
    })
})


module.exports = router;