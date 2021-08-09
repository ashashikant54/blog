const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

/*
We are not going to use any DB
We will stor all of this in the memory
Note : Downside of this approach , anytime we will restart the application , we will loose the data. 
*/

// Create object posts_obj, that will be incharge to store all posts that will be created
const posts_obj = {};


app.get('/posts',(req, res) => {
    res.send(posts_obj);
});


app.post('/posts',(req,res) =>{

    //We need ability to create id , which we can assoicate with new posts. Hence create randomly generated id , for this we require 'crypto' package
    const id = randomBytes(4).toString('hex'); //k5lk3j3jpiapiaj46h

    //Take req {title : string}, and place that into posts_obj
    const { title } = req.body;

    posts_obj[id] = {
        id,title
    };

    res.status(201).send(posts_obj[id]);
});

//To make sure , my express application listens on specific port
app.listen(4000,() => {
    //Callback
    console.log('Listening on 4000 port')
});