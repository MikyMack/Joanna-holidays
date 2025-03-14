const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Category', CategorySchema);
