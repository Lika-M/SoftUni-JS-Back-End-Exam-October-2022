const userController = require("../controllers/userController.js");
const homeController = require("../controllers/homeController.js");
const detailsController = require("../controllers/detailsController.js");
// const { isAuth, isGuest } = require('../middlewares/guards.js');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/users', userController);
    app.use('/details', detailsController);
};