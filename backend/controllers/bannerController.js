const Banner = require('../models/Banner');
const cloudinary = require('../utils/cloudinary');

exports.createBanner = async (req, res) => {
    try {
        // Verify file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Image file is required'
            });
        }

        // Create banner object
        const banner = new Banner({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.file.path,
            isActive: req.body.isActive === 'true'
        });

        // Save to database
        await banner.save();

        res.status(201).json({
            success: true,
            data: banner
        });

    } catch (error) {
        console.error('Error creating banner:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error creating banner'
        });
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
        
        if (!banner) {
            return res.status(404).json({ 
                success: false,
                message: "Banner not found" 
            });
        }

        // Handle image update if new file provided
        if (req.file) {
            try {
                // Delete old image from Cloudinary if exists
                if (banner.cloudinary_id) {
                    await cloudinary.uploader.destroy(banner.cloudinary_id)
                        .catch(err => console.error('Cloudinary deletion error:', err));
                }

                // Upload new image
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'banners',
                    quality: 'auto:good'
                });

                banner.imageUrl = result.secure_url;
                banner.cloudinary_id = result.public_id;

            } catch (uploadError) {
                console.error('Image upload error:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image",
                    error: uploadError.message
                });
            }
        }

        // Update other fields
        banner.title = title || banner.title;
        banner.description = description || banner.description;
        
        await banner.save();
        
        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            banner
        });

    } catch (error) {
        console.error('Banner update error:', error);
        res.status(500).json({
            success: false,
            message: "Error updating banner",
            error: error.message
        });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ 
                success: false,
                message: "Banner not found" 
            });
        }

        // Delete from Cloudinary only if cloudinary_id exists
        if (banner.cloudinary_id) {
            await cloudinary.uploader.destroy(banner.cloudinary_id)
                .catch(err => console.error('Cloudinary deletion error:', err));
        }

        // Delete from database
        await Banner.findByIdAndDelete(req.params.id);

        res.status(200).json({ 
            success: true,
            message: "Banner deleted successfully" 
        });

    } catch (error) {
        console.error('Banner deletion error:', error);
        res.status(500).json({ 
            success: false,
            message: "Error deleting banner",
            error: error.message 
        });
    }
};

exports.updateBannerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const banner = await Banner.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};