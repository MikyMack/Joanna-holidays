const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('index', { title: 'home page'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading home page data');
    }
});
router.get('/about', async (req, res) => {
    try {
        res.render('about', { title: 'about US'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading about us page data');
    }
});
router.get('/blogs', async (req, res) => {
    try {
        res.render('blogs', { title: 'Blogs'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading blogs page data');
    }
});
router.get('/gallery', async (req, res) => {
    try {
        res.render('gallery', { title: 'Gallery'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading gallery page data');
    }
});
router.get('/contact', async (req, res) => {
    try {
        res.render('contact', { title: 'contact us'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading contact page data');
    }
});

module.exports = router;