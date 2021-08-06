const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport  = require('passport')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Validate Post Input
const validatePostInput = require('../../validation/post')

// @route GET api/posts/test
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.get('/test',(req,res) =>{
    res.json({
        msg: 'Posts Adarsh'
    })
})

// @route GET api/posts
// @desc Get Posts
// @access Public (As some routes need to be protected)

router.get('/',(req,res) =>{
    Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: 'No Posts Found' }))
})

// @route GET api/posts/:id
// @desc Get Posts
// @access Public (As some routes need to be protected)

router.get('/:id',(req,res) =>{
    Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ nopostfound: 'No Post Found with the given Id' }))
})

// @route POST api/posts
// @desc Create Posts
// @access Private (As some routes need to be protected)

router.post('/',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    
    const { errors, isValid } = validatePostInput(req.body)

    if(!isValid){
        res.status(400).json(errors)
    }
    
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save()
    .then((post) => res.json(post))
    .catch((err) => console.log(err))
})

// @route DELETE api/posts/:id
// @desc Delete Posts
// @access Private (As some routes need to be protected)

router.delete('/:id',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    Profile.findOne({ user: req.user.id })
    .then((profile) =>{
        Post.findById(req.params.id)
        .then((post) =>{
            // Check the post owner
            if(post.user.toString() !== req.user.id ){
                return res.status(401).json({ notauthorized: 'User Not Autherized' })
            }
            post.remove().then(() => res.json({ success: true }))
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No Post Found' }))
    })
})

// @route POST api/posts/like/:id
// @desc Like Post
// @access Private (As some routes need to be protected)

router.post('/like/:id',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    Profile.findOne({ user: req.user.id })
    .then((profile) =>{
        Post.findById(req.params.id)
        .then((post) =>{
            if(post.likes.filter(like => like.user.toString() === req.user.id ).length > 0){
                return res.status(400).json({ alreadyliked: 'User Already Liked the Post' })
            }

            // Add the user id to like array
            post.likes.unshift({ user: req.user.id })

            post.save().then((post) => res.json(post))
 
        }) 
        .catch((err) => res.status(404).json({ postnotfound: 'No Post Found' }))
    })
})

// @route POST api/posts/unlike/:id
// @desc Unlike Post
// @access Private (As some routes need to be protected)

router.post('/unlike/:id',passport.authenticate('jwt',{ session: false }),(req,res) =>{
    Profile.findOne({ user: req.user.id })
    .then((profile) =>{
        Post.findById(req.params.id)
        .then((post) =>{
            if(post.likes.filter(like => like.user.toString() === req.user.id ).length === 0){
                return res.status(400).json({ notliked: 'User has not Liked the Post' })
            }

            // Add the user id to like array
            const removeidx = post.likes.map((item) => item.user.toString()).indexOf(req.user.id)

            post.likes.splice(removeidx,1)

            post.save().then((post) => res.json(post))
 
        }) 
        .catch((err) => res.status(404).json({ postnotfound: 'No Post Found' }))
    })
})

// @route POST api/posts/comment/:id/:comment_id
// @desc Comment Post
// @access Private (As some routes need to be protected)

router.post('/comment/:id',passport.authenticate('jwt',{ session: false }),(req,res) =>{

    const { errors, isValid } = validatePostInput(req.body)

    if(!isValid){
        res.status(400).json(errors)
    }


    Post.findById(req.params.id)
    .then((post) =>{
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        // add to comments
        post.comment.unshift(newComment)

        post.save().then(post => res.json(post))

    })
    .catch(err => res.status(404).json(err))
})

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment from post
// @access Private (As some routes need to be protected)

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{ session: false }),(req,res) =>{

    const { errors, isValid } = validatePostInput(req.body)

    if(!isValid){
        res.status(400).json(errors)
    }

    Post.findById(req.params.id)
    .then(post =>{
        // check if comment exists
        if(post.comment.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
            return res.status(404).json({ commentnotexist: "Comment Does Not Exist" })
        }
        const removeidx = post.comment.map(item => item._id.toString()).indexOf(req.params.comment_id)

        post.comment.splice(removeidx,1)

        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No Post Found' }))
  
})
module.exports = router; 