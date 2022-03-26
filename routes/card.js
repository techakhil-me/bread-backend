const express = require('express');
const { addCard, getCard } = require('../controllers/card');
const router = express.Router();

router.post('/addcard', addCard);
router.get('/getcards', getCard);

module.exports = router;
