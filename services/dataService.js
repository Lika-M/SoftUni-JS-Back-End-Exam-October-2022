const Blog = require('../models/Blog.js');

async function getLastThree() {
    return Blog.find({}).limit(3).lean();
}

async function getAll() {
    return Blog.find().lean();
}

async function getById(id) {
    return Blog.findById(id).lean();
}

async function getByIdPopulate(id) {
    return Blog.findById(id).populate('owner').populate('followers').lean();
}

async function createItem(data) {
    return Blog.create(data);
}

async function editItem(dataId, data) {
    return Blog.updateOne({ _id: dataId }, { $set: data }, { runValidators: true });
}

async function deleteItem(id) {
    return Blog.findByIdAndDelete(id);
}

async function follow(dataId, userId) {
    const existing = await Blog.findById(dataId);

    existing.followers.push(userId);
    return existing.save();
}

module.exports = {
    getLastThree,
    getAll,
    getByIdPopulate,
    getById,
    createItem,
    editItem,
    deleteItem,
    follow
}