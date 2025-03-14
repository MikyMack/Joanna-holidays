const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Package = require('../models/Package');
const Blog = require('../models/Blog');
const Banner = require('../models/Banner');


const models = {
    category: Category,
    subcategory: SubCategory,
    package: Package,
    blog: Blog,
    banner: Banner
};

// Toggle isActive Status
exports.toggleIsActive = async (req, res) => {
    try {
        const { model, id } = req.params;
        const Model = models[model.toLowerCase()];

        if (!Model) {
            return res.status(400).json({ message: "Invalid model type" });
        }

        const item = await Model.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Toggle isActive
        item.isActive = !item.isActive;
        await item.save();

        res.status(200).json({ message: `${model} updated successfully`, isActive: item.isActive });
    } catch (error) {
        res.status(500).json({ message: "Error toggling isActive", error: error.message });
    }
};
