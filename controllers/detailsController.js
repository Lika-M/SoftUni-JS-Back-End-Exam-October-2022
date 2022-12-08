const { createItem, getByIdPopulate, getById, editItem, deleteItem,follow } = require('../services/dataService.js');
const { errorParser } = require('../util/parser.js');

const { isAuth} = require('../middlewares/guards.js');

const detailsController = require('express').Router();

detailsController.get('/create', isAuth(), (req, res) => {
    res.render('create', {
        user: req.user
    });
});

detailsController.post('/create', isAuth(), async (req, res) => {

    try {
        await createItem({ ...req.body, owner: req.user._id });
        res.redirect(`/catalog`);

    } catch (err) {
        res.render('create', { ...req.body, errors: errorParser(err) });
    }

});

detailsController.get('/edit/:id', isAuth(), async (req, res) => {

    const item = await getById(req.params.id);
    const isOwner = req.user && item.owner.toString() == req.user._id;

    if (!isOwner) {
        return res.render('404');
    }

    res.render('edit', { ...item });
});

detailsController.post('/edit/:id', isAuth(), async (req, res) => {

    const item = await getById(req.params.id);
    const isOwner = req.user && item.owner.toString() == req.user._id;

    if (!isOwner) {
        return res.render('404');
    }

    try {
        await editItem(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);

    } catch (err) {
        res.render('edit', { ...req.body, errors: errorParser(err) });
    }
});

detailsController.get('/delete/:id', isAuth(), async (req, res) => {
    const item = await getById(req.params.id);
    const isOwner = req.user && item.owner.toString() == req.user._id;

    if (!isOwner) {
        return res.render('404');
    }

    await deleteItem(req.params.id);
    res.redirect('/catalog');
});

detailsController.get('/follow/:id', isAuth(), async (req, res) => {
    const item = await getById(req.params.id);

    const isOwner = item.owner._id.toString() == req.user._id;
    const isFollowed = item.followers.map(x => x._id.toString()).includes(req.user._id);
   

    if (isOwner || isFollowed) {
        return res.render('404');
    }
    await follow(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

detailsController.get('/:id', async (req, res) => {
    const item = await getByIdPopulate(req.params.id);
    
    const isOwner = req.user && item.owner._id.toString() == req.user._id;
    const isFollowed =  req.user && item.followers.map(x => x._id.toString()).includes(req.user._id);
    const followers = item.followers.map(x => x.email).join(', ')

    res.render('details', {
        ...item,
        user: req.user,
        isOwner,
        isFollowed,
        followers
    });
});

module.exports = detailsController;