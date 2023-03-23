const Ads = require('../models/Ad.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ads.find().populate('seller');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id).populate('seller');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, content, date, photo, price, location, seller } = req.body;

    if (!title || !content || !date || !photo || !price || !location || !seller) {
      return res.status(400).json({ message: "One or more fields are empty" });
    }

    const ad = new Ads({
      title,
      content,
      date,
      photo,
      price,
      location,
      seller
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
    const removedAd = await Ads.findByIdAndRemove(req.params.id);
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
    const ad = await Ads.findById(req.params.id);
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
        fs.unlinkSync(`./public/${ad.photo}`);
      }
      ad.photo = req.file.path;
    }

    ad.title = req.body.title;
    ad.content = req.body.content;
    ad.date = req.body.date;
    ad.price = req.body.price;
    ad.location = req.body.location;
    ad.seller = req.body.seller;

    await ad.save();

    res.json({ message: 'Ad updated successfully', ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.search = async (req, res) => {
  const searchPhrase = req.params.searchPhrase;
  try {
    const ads = await Ads.find({ title: { $regex: searchPhrase, $options: 'i' } });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
