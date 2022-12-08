const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = 'secret';

async function register(username, email, password) {
    
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        throw new Error('Email already exist');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        hashedPass
    });

    return createSession(user);
}


async function login(email, password) {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password.');
    }

    const match = await bcrypt.compare(password, user.hashedPass);

    if (!match) {
        throw new Error('Incorrect email or password.');
    }

    return createSession(user);
}

function verifyToken(token) {
    const userData = jwt.verify(token, JWT_SECRET);
    return userData;
}


function createSession({ _id, email, username }) {
    const payload = {
        _id,
        username,
        email
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken
}