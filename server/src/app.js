const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const test = require("../model/test");

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://TestUser:PwdIsChu123@159.89.172.57:27017/test')

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error occured connecting to mongo!', err);
});

db.once('open', () => {
    console.info('Yay! Mongo connected :)');
});

app.get('/posts',(req,res) => { 
    console.log('Posts endpoint was called');
   test.find({}, (err,posts)=>{
       if(err){
           console.err(err);
       }
       res.json(posts); 
   })
})
app.post('/post',(req,res) =>{
    const title = req.body.title;
    console.log(req.body);
    const description = req.body.description;
    const new_post = new test({
        title: title,
        description: description,
    })
    new_post.save(function (error) {
        if(error){
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Post saved successfully!'
        })
    })
})
//Fetch single post
app.get('/post/:id',(req,res) => {
    test.findById(req.params.id, function(error, post){
        if(error) { console.log(error); }
        res.send(post)
    })
})

//Update a post
app.put('/posts/:id',(req,res) => {
    test.findById(req.params.id, function(error, post){
        if(error){ console.log(error) };

        post.title = req.body.title;
        post.description = req.body.description;
        post.save(function(error){
            if(error) { console.log(error) }
            res.send({
                success: true
            })
        })
    })
})

//Delete a post
app.delete('/posts/:id', (req, res) => {
    test.remove({
        _id: req.params.id
    },function(err, post){
        if(err){
            res.send(err);
        }
        res.send({
            success: true
        })
    })
})
app.listen(process.env.PORT||8081)