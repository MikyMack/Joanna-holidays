const Package = require('../models/Package');
const cloudinary = require('../utils/cloudinary');

exports.createPackage = async (req, res) => {
    try {
        const { title, destination, category, subcategory, duration, tourtype, groupsize, tourGuide, packageDescription, Included, TravelPlan, locationHref } = req.body;

        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ message: "At least 2 images are required" });
        }

        let images = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            images.push(result.secure_url);
        }

        const newPackage = new Package({
            title,
            destination,
            category,
            subcategory,
            duration,
            tourtype,
            groupsize,
            tourGuide,
            packageDescription,
            Included: Included.split(','),
            TravelPlan: JSON.parse(TravelPlan),
            locationHref,
            images
        });

        await newPackage.save();
        res.status(201).json({ message: "Package created successfully", newPackage });
    } catch (error) {
        res.status(500).json({ message: "Error creating package", error: error.message });
    }
};

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().populate('category subcategory');
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving packages", error: error.message });
    }
};

exports.getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id).populate('category subcategory');
        if (!package) return res.status(404).json({ message: "Package not found" });
        res.status(200).json(package);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving package", error: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const { title, destination, category, subcategory, duration, tourtype, groupsize, tourGuide, packageDescription, Included, TravelPlan, locationHref } = req.body;
        const package = await Package.findById(req.params.id);
        if (!package) return res.status(404).json({ message: "Package not found" });

        if (req.files && req.files.length > 0) {
            for (const image of package.images) {
                await cloudinary.uploader.destroy(image);
            }
            let images = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
            package.images = images;
        }

        package.title = title || package.title;
        package.destination = destination || package.destination;
        package.category = category || package.category;
        package.subcategory = subcategory || package.subcategory;
        package.duration = duration || package.duration;
        package.tourtype = tourtype || package.tourtype;
        package.groupsize = groupsize || package.groupsize;
        package.tourGuide = tourGuide || package.tourGuide;
        package.packageDescription = packageDescription || package.packageDescription;
        package.Included = Included ? Included.split(',') : package.Included;
        package.TravelPlan = TravelPlan ? JSON.parse(TravelPlan) : package.TravelPlan;
        package.locationHref = locationHref || package.locationHref;

        await package.save();
        res.status(200).json({ message: "Package updated successfully", package });
    } catch (error) {
        res.status(500).json({ message: "Error updating package", error: error.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) return res.status(404).json({ message: "Package not found" });

        for (const image of package.images) {
            await cloudinary.uploader.destroy(image);
        }
        await package.remove();
        res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting package", error: error.message });
    }
};
