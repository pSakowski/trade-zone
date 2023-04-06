const Ad = require('../models/Ad.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('seller');
    console.log(ads);
    res.status(200).json(ads);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const ads = await Ad.findById(req.params.id).populate('seller');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// create ads endpoint
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, content, date, price, location } = req.body;
    console.log(req.body)

    if (!title || !content || !date || !price || !location) {
      return res.status(400).json({ message: "One or more fields are empty" });
    }

    const fileType = await getImageFileType(req.file);

    if (!['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const ad = new Ad({
      title,
      content,
      date,
      photo: req.file.filename,
      price,
      location,
      seller: req.session.user.id
    });

    await ad.save();

    res.status(201).json({ message: 'Ad created successfully', ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const removedAd = await Ad.findByIdAndRemove(req.params.id);
    if (removedAd) {
      res.json({ message: 'Ad successfully deleted', removedAd });
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // check if a new photo has been uploaded
    if (req.file) {
      const imageFileType = getImageFileType(req.file.originalname);
      if (!imageFileType) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Invalid image file type' });
      }
      // delete previous photo
      if (ad.photo) {
        fs.unlinkSync(`./public/uploads/${ad.photo}`);
      }
      ad.photo = req.file.filename;
    }

    ad.title = req.body.title;
    ad.content = req.body.content;
    ad.date = req.body.date;
    ad.price = req.body.price;
    ad.location = req.body.location;
    ad.seller = req.body.seller ? JSON.parse(req.body.seller) : ad.seller;

    await ad.save();

    const updatedAd = await Ad.findById(req.params.id);

    res.json({ message: 'Ad updated successfully', ad: updatedAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.search = async (req, res) => {
  const searchPhrase = req.params.searchPhrase;
  try {
    const ads = await Ad.find({ title: { $regex: searchPhrase, $options: 'i' } });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};