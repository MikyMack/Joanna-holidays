const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Banner', BannerSchema);
