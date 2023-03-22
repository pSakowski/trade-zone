const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.post('/ads', ads.create);
router.delete('/ads/:id', ads.delete);
router.put('/ads/:id', ads.update);
router.get('/ads/search/:searchPhrase', ads.search);

module.exports = router;