const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.post('/ads', imageUpload.single('photo'), ads.create);
router.delete('/ads/:id', ads.delete);
router.put('/ads/:id', imageUpload.single('photo'), ads.update);
router.get('/ads/search/:searchPhrase', ads.search);

module.exports = router;