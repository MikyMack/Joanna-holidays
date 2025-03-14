const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const packageController = require('../controllers/packageController');
const blogController = require('../controllers/blogController');
const bannerController = require('../controllers/bannerController');
const toggleController = require('../controllers/toggleController');
const  upload  = require('../utils/multer');

// 🏷️ Categories Routes
router.post('/categories', upload.single('image'), categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// 📍 Subcategories Routes
router.post('/subcategories', upload.single('image'), categoryController.createSubCategory);
router.get('/subcategories', categoryController.getAllSubCategories);
router.get('/subcategories/:id', categoryController.getSubCategoryById);
router.put('/subcategories/:id', upload.single('image'), categoryController.updateSubCategory);
router.delete('/subcategories/:id', categoryController.deleteSubCategory);

// 🏖️ Packages Routes
router.post('/packages', upload.array('images', 5), packageController.createPackage);
router.get('/packages', packageController.getAllPackages);
router.get('/packages/:id', packageController.getPackageById);
router.put('/packages/:id', upload.array('images', 5), packageController.updatePackage);
router.delete('/packages/:id', packageController.deletePackage);

// 📰 Blogs Routes
router.post('/blogs', upload.single('image'), blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.put('/blogs/:id', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

// 🎭 Banners Routes
router.post('/banners', upload.single('image'), bannerController.createBanner);
router.get('/banners', bannerController.getAllBanners);
router.get('/banners/:id', bannerController.getBannerById);
router.put('/banners/:id', upload.single('image'), bannerController.updateBanner);
router.delete('/banners/:id', bannerController.deleteBanner);

// ✅ Toggle isActive API
router.patch('/toggle/:model/:id', toggleController.toggleIsActive);

module.exports = router;
