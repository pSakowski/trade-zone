const Ads = require('../models/ads.model');

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
    const ad = await Ads.findById(req.params.id).populate('seller');
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  const { title, content, publicationDate, photo, price, location, seller } = req.body;
  const ad = new Ads({
    title,
    content,
    publicationDate,
    photo,
    price,
    location,
    seller,
  });
  try {
    const savedAd = await ad.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const removedAd = await Ads.deleteOne({ _id: req.params.id });
    res.json(removedAd);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedAd = await Ads.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json(updatedAd);
  } catch (err) {
    res.status(500).json({ message: err });
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
