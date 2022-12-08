function isAuth() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/users/login');
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect('/'); //TODO see where redirect
        }
    };

}

module.exports = {
    isAuth,
    isGuest
};