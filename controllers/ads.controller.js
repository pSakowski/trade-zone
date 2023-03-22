const Ads = require('../models/Ad.model');

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
    const Ads = await Ads.findById(req.params.id).populate('seller');
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

    const ad = new Ad({
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
    const updatedAd = await Ads.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json({ message: "Ad updated successfully", updatedAd });
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
