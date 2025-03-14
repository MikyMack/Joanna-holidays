require('dotenv').config({ path: '.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
// Import Routes
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '../assets')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);

// Use Routes
app.use('/', publicRoutes);
app.use('/', adminRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/', apiRoutes); 

// Error Handling for 404
// app.use(async (req, res) => {
//     const logos = await Logo.find();
//     const categories = await Category.find();
//     res.status(404).render('errorPage', { title: 'Page Not Found', logos,categories });
// });
module.exports = app;
