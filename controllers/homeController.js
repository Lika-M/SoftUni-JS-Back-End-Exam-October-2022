const { getLastThree, getAll} =  require('../services/dataService.js');

const homeController = require('express').Router();


homeController.get('/', async (req, res) => {
    const items = await getLastThree();
    res.render('home', {
        items
    });
});

homeController.get('/catalog', async (req, res) => {
    const items = await getAll();
    res.render('catalog', {
        items
    });
});

homeController.get('/profile', async (req, res) => {

    res.render('profile');
});

module.exports = homeController;

