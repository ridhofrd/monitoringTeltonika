const express = require("express");
const router = express.Router();
const test = require("../controllers/Kelola_alat");
const test1 = require("../controllers/kelolasewa");

//TEST
router.get("/alat", test.getAlat);
router.get("/alat/:id", test.getAlatbyid);
router.post("/alat", test.createAlat);
router.put("/alat", test.updateAlat);
router.delete("/alat", test.deleteAlat);

router.get("/sewa", test1.getSewa);

module.exports = router;
