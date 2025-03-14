const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);
