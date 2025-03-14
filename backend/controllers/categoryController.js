 // Start of Selection
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const cloudinary = require('../utils/cloudinary');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) return res.status(400).json({ message: "Category image is required" });

        const result = await cloudinary.uploader.upload(req.file.path);
        const newCategory = new Category({
            name,
            image: result.secure_url,
            cloudinary_id: result.public_id
        });

        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    const categories = await Category.find().populate('subCategories');
    res.status(200).json(categories);
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('subCategories');
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving category", error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        if (req.file) {
            await cloudinary.uploader.destroy(category.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            category.image = result.secure_url;
            category.cloudinary_id = result.public_id;
        }

        category.name = name || category.name;

        await category.save();
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        await cloudinary.uploader.destroy(category.cloudinary_id);
        await category.remove();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};

exports.createSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        if (!req.file) return res.status(400).json({ message: "Subcategory image is required" });

        const result = await cloudinary.uploader.upload(req.file.path);
        const newSubCategory = new SubCategory({
            name,
            categoryId,
            image: result.secure_url,
            cloudinary_id: result.public_id
        });

        await newSubCategory.save();
        res.status(201).json({ message: "Subcategory created successfully", newSubCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating subcategory", error: error.message });
    }
};

exports.getAllSubCategories = async (req, res) => {
    const subcategories = await SubCategory.find().populate('categoryId');
    res.status(200).json(subcategories);
};

exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate('categoryId');
        if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory", error: error.message });
    }
};

exports.updateSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const subCategory = await SubCategory.findById(req.params.id);
        if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });

        if (req.file) {
            await cloudinary.uploader.destroy(subCategory.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            subCategory.image = result.secure_url;
            subCategory.cloudinary_id = result.public_id;
        }

        subCategory.name = name || subCategory.name;
        subCategory.categoryId = categoryId || subCategory.categoryId;

        await subCategory.save();
        res.status(200).json({ message: "Subcategory updated successfully", subCategory });
    } catch (error) {
        res.status(500).json({ message: "Error updating subcategory", error: error.message });
    }
};

exports.deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });

        await cloudinary.uploader.destroy(subCategory.cloudinary_id);
        await subCategory.remove();
        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subcategory", error: error.message });
    }
};
