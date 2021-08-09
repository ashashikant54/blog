const express = require('express');
const bodyParser = require('body-parser');
const { rabdomBytes, randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId_obj = {};

app.get('/posts/:id/comments', (req,res) => {
    res.send(commentsByPostId_obj[req.params.id] || []);

});

app.post('/posts/:id/comments', (req,res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId_obj[req.params.id] || [];

    comments.push({id: commentId,content});

    commentsByPostId_obj[req.params.id] = comments;

    res.status(201).send(comments);

});

app.listen(4001, () => {
    console.log('Listening on 4001 port');
})