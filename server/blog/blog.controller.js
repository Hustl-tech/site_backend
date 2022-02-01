const httpStatus = require('http-status');
const path = require('path');

const APIError = require('../helpers/APIError');
const Blog = require('../models/blog.model');
const Resize = require('../helpers/resize');

function create(req, res, next) {

    let blog = new Blog({});
    let user = req.user;

    if (req.body.title)
        blog.title = req.body.title;
    if (req.body.description)
        blog.description = req.body.description;
    if (req.body.tags)
        blog.tags = [req.body.tags];

    blog.author = {
        userId: user._id,
        username: user.username,
        email: user.email,
    }

    if (req.file) {
        const imagePath = 'images';
        const fileUpload = new Resize(imagePath);
        fileUpload.save(req.file.buffer)
            .then(result => {
                if (result) {
                    blog.coverImage = 'http://localhost:4040/images/' + result;
                    blog.save()
                        .then(blog => {
                            res.json(blog);
                        })
                        .catch(e => next(e));
                }
            }).catch(e => next(e));
    } else {
        blog.save()
            .then(blog => {
                res.json(blog);
            })
            .catch(e => next(e));
    }
}

function list(req, res, next) {
    const { limit = 15, skip = 0 } = req.query;

    let result = {};

    Blog.find()
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .then(blogs => {
            result.blogs = blogs;
            // Blog.count(query)
            return Blog.count();
        })
        .then(count => {
            result.count = count;
            res.json(result);
        })
        .catch(e => next(e));
}

module.exports = {
    create,
    list
}