const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * Blog Schema
 */
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    coverImage: {
        type: String
    },
    tags: [String],
    author: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: String,
        avatar: String
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Blog', BlogSchema);