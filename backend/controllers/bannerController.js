const Banner = require('../models/Banner');
const cloudinary = require('../utils/cloudinary');

exports.createBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!req.file) return res.status(400).json({ message: "Banner image is required" });

        const result = await cloudinary.uploader.upload(req.file.path);
        const newBanner = new Banner({
            title,
            description,
            image: result.secure_url,
            cloudinary_id: result.public_id
        });

        await newBanner.save();
        res.status(201).json({ message: "Banner created successfully", newBanner });
    } catch (error) {
        res.status(500).json({ message: "Error creating banner", error: error.message });
    }
};

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving banners", error: error.message });
    }
};

exports.getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving banner", error: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });

        if (req.file) {
            await cloudinary.uploader.destroy(banner.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            banner.image = result.secure_url;
            banner.cloudinary_id = result.public_id;
        }

        banner.title = title || banner.title;
        banner.description = description || banner.description;

        await banner.save();
        res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (error) {
        res.status(500).json({ message: "Error updating banner", error: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });

        await cloudinary.uploader.destroy(banner.cloudinary_id);
        await banner.remove();
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting banner", error: error.message });
    }
};
