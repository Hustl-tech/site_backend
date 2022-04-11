const Blog = require('../models/blog.model');
const Resize = require('../helpers/resize');
const { result } = require('lodash');

function create(req, res, next) {

    let blog = new Blog({});
    let user = req.user;

    if (req.body.title)
        blog.title = req.body.title;
    if (req.body.description)
        blog.description = req.body.description;
    if (req.body.tags)
        blog.tags = req.body.tags;

    blog.author = {
        userId: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
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
    let query = {}
    let sort = {
        createdAt: -1
    }

    if (req.query.key) {
        // let val = req.query.key;
        // query.name = new RegExp(val, 'i')
        query = { $text: { $search: req.query.key, $caseSensitive: false } }, { score: { $meta: 'textScore' } }

        sort['score'] = {
            $meta: "textScore"
        }
    }

    Blog.find(query)
        .sort(sort)
        .skip(+skip)
        .limit(+limit)
        .then(blogs => {
            result.blogs = blogs;
            // Blog.count(query)
            return Blog.count(query);
        })
        .then(count => {
            result.count = count;
            res.json(result);
        })
        .catch(e => next(e));
}

function listUserPosts(req, res, next) {
    const { limit = 15, skip = 0 } = req.query;

    let result = {};
    let query = {
        'author.userId': req.user._id
    }

    Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .then(blogs => {
            result.blogs = blogs;
            // Blog.count(query)
            return Blog.count(query);
        })
        .then(count => {
            result.count = count;
            res.json(result);
        })
        .catch(e => next(e));
}

function update(req, res, next) {
    let blog = {};

    if (req.body.title)
        blog.title = req.body.title;
    if (req.body.description)
        blog.description = req.body.description;
    if (req.body.tags)
        blog.tags = req.body.tags;

    Blog.findByIdAndUpdate(req.params.id, blog)
        .then(result => {
            res.json(result);
        })
        .catch(e => next(e));
}


function detail(req, res, next) {
    Blog.findById(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(e => next(e));
}

function remove(req, res, next) {
    Blog.findByIdAndRemove(req.params.id)
        .then(result => {
            res.send(result);
        })
        .catch(e => next(e));
}

module.exports = {
    create,
    list,
    detail,
    listUserPosts,
    update,
    remove
}