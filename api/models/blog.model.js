const { default: mongoose, Schema } = require("mongoose");

const BlogModel = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    summary: {
        type: String,
    },
    slug: {
        type: String,
    },
    author: {
        authorId: {
            type: Schema.Types.ObjectId,
        },
        username: {
            type: String,
        },
        displayName: {
            type: String
        }
    },
    category: {
        type: Schema.Types.ObjectId,
    },
    thumbnail: {
        type: String,
    },
    tags: [{
        type: String,
    }],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

const Blog = mongoose.model('Blog', BlogModel);
module.exports = Blog;

