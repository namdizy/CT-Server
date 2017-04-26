var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    commentBody: String,
    post: {}
});

module.exports = mongoose.model('Comment', CommentSchema);