const express = require("express");
const router = express.Router();
const { addOffer, getOffer, getSavedOffer } = require("../controllers/offer");

router.post("/addOffer", addOffer);
router.get("/getOffer", getOffer);
router.post("/getsavedoffer", getSavedOffer);

module.exports = router;
