const express = require("express");
const router = express.Router();
const test = require("../controllers/Kelola_alat");

//TEST
router.get("/alat", test.getAlat);
router.get("/alat/:id", test.getAlatbyid);
router.post("/alat", test.createAlat);
router.put("/alat", test.updateAlat);
router.delete("/alat", test.deleteAlat);

module.exports = router;
