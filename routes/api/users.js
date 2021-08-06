const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load User Model
const User = require('../../models/User')


// Load Validation Input
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route GET api/posts/users
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.get('/test',(req,res) =>{
    res.json({
        msg: 'Users Adarsh'
    })
})

// @route GET api/posts/register
// @desc Register
// @access Public (As some routes need to be protected)

router.post('/register',(req,res) =>{
    
    const { errors, isValid } = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
    .then((user) =>{
        if(user){
            errors.email = 'Email Already Exists'
            return res.status(400).json(errors)
        }else{
            
            const avatar = gravatar.url(req.body.email,{
                s: '200', //size
                r: 'pg',  //rating
                d: 'mm'   // default
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            })

            bycrypt.genSalt(10, (err, salt) =>{
                bycrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then((user) => res.json(user))
                    .catch((err) => console.log(err))
                })
            })
        }
    })
})

// @route GET api/posts/login
// @desc Login User / Returning JWT token
// @access Public (As some routes need to be protected)

router.post('/login',(req,res) =>{

    const { errors, isValid } = validateLoginInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
    .then((user) =>{
        // check for user
        if(!user){
            errors.email = "User Not Found"
            return res.status(404).json(errors)
        }
        // check password
        bycrypt.compare(password, user.password)
        .then((isMatch) =>{
            if(isMatch){
                //res.json({ msg: 'Success' })
                // user matched
                
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                } // create jwt payload

                // sign token
                jwt.sign(payload,keys.scretOrKey,{ expiresIn: 3600 }, (err,token) =>{
                    res.json({ 
                        success: true,
                        token: 'Bearer ' + token
                     })
                })
            }else{
                errors.password = 'Incorrect Password'
                return res.status(404).json(errors)
            }
        })
    })
})


// @route GET api/posts/current
// @desc Return current user
// @access Private (As some routes need to be protected)

router.get('/current',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    })
})

module.exports = router;