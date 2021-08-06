const express = require('express');
const path = require('path')
const app = express();

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// body parser middleware
// now we can user req.body.whatever
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to mongo db
const db = require('./config/keys').mongoURI;
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => console.log('Mongo DB connected'))
.catch((err) => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport)


// Use Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

// serve static assets if in production 
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`Server Running on ${port}`))
