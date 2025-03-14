const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true }, // Destination name (e.g., Paris, Goa)
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    duration: { type: String, required: true }, // Example: "5 Days 4 Nights"
    tourType: { type: String, required: true }, // Example: "Adventure", "Honeymoon", "Family Trip"
    groupSize: { type: Number, required: true }, // Max people allowed in a group
    tourGuide: { type: String, required: true }, // Tour guide name or details
    packageDescription: { type: String, required: true }, // Detailed package description
    included: [{ type: String, required: true }], // List of included items (array of strings)
    travelPlan: [{
        day: { type: String, required: true }, // Example: "Day 1"
        description: { type: String, required: true } // Example: "Arrival at the airport and transfer to the hotel"
    }],
    locationHref: { type: String, required: true }, // Google Maps or external location link
    images: [{ type: String, required: true, validate: [arrayLimit, 'Images should be between 2 to 5'] }], // Cloudinary image URLs
    isActive: { type: Boolean, default: true } // Control visibility
}, { timestamps: true });

// Custom validation to ensure images array has 2 to 5 images
function arrayLimit(val) {
    return val.length >= 2 && val.length <= 5;
}

module.exports = mongoose.model('Package', PackageSchema);
