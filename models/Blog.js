const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const blogSchema = new Schema({

    title: {
        type: String,
        required: true,
        minLength: [5, 'Title should be at least 5 characters'],
        maxLength: [50, 'Title should be no longer than 50 characters']
    },

    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'The Blog Image should starts with http or https'
        }
    },

    content: {
        type: String,
        required: true,
        minLength: [10, 'The Content should be a minimum of 10 characters long'],
    },
    category: {
        type: String,
        required: true,
        minLength: [3, 'The Category should be a minimum of 3 characters long'],
    },

    followers: { type: [Types.ObjectId], 
        ref: 'User', 
        default: [] },
        
    owner: { type: Types.ObjectId, ref: 'User' },

});



const Blog = model('Blog', blogSchema);

module.exports = Blog;