const { verifyToken } = require("../services/userService.js");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.user = userData;
            
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/users/login');

            return;
        }
    }

    next();
};