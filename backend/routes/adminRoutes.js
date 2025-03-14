const express = require('express');
const app = express();

const authMiddleware = require('../middleware/auth'); 
const authController =require('../controllers/authController')

// Admin Login Page
app.get('/login', (req, res) => {
    res.render('admin-login', { title: 'Admin Login' });
});
app.get('/logout', authController.logout);

app.get('/dashboard', authMiddleware, (req, res) => {
    res.render('admin-dashboard', { title: 'Admin Dashboard' });
});

module.exports = app;