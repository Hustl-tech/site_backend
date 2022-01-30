const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');

const Blog = require('../models/blog.model');

function create(req, res, next) {

    let blog = new Blog({});
    let user = req.user;

    if (req.body.title)
        blog.title = req.body.title;
    if (req.body.description)
        blog.description = req.body.description;
    if (req.body.tags)
        blog.tags = req.body.tags;
    if (req.file)
        blog.coverImage = 'http://localhost:4040/' + req.file.path;

    blog.author = {
        userId: user._id,
        username: user.username,
        email: user.email,
    }

    blog.save()
        .then(blog => {
            res.json(blog);
        })
        .catch(e => next(e));
}

module.exports = {
    create
}