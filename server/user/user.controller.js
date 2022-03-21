const User = require('../models/user.model');

function me(req, res, next) {

    User.findById(req.user._id)
        .then(user => {
            res.send(user);
        })
        .catch(e => next(e));
}

module.exports = {
    me
}