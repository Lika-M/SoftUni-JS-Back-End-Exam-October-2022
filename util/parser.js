// transform error messages from string to array of strings

function errorParser(error) {
    if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(x => x.message).reverse(); // mongoose error messages

    } else if (Array.isArray(error)) {
        return error.map(x => x.msg); // Express-validator messages 

    } else {
        return error.message.split('\n');
    }
}

module.exports = {
    errorParser,
}